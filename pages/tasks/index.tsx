import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import SidebarLayout from "@/layouts/SidebarLayout";
import { ArrowUpRightFromCircle, ListFilter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GradientPicker } from "@/components/PickerExample";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/backend/firebase";
import { useRouter } from "next/router";

interface PriorityList {
  title: string;
  color: string;
  value: string;
}
[];
interface PomorodoList {
  title: string;
  value: string;
}
[];
const PRIORITYLIST: PriorityList[] = [
  {
    title: "Highest Priority (A+)",
    color: "text-red-500",
    value: "A+",
  },
  {
    title: "High Priority (A)",
    color: "text-orange-500",
    value: "A",
  },
  {
    title: "Medium Priority (B)",
    color: "text-amber-500",
    value: "B",
  },
  {
    title: "Low Priority (C)",
    color: "text-lime-500",
    value: "C",
  },
  {
    title: "No Priority (D)",
    color: "text-green-500",
    value: "D",
  },
];
const POMORODOLIST: PomorodoList[] = [
  {
    title: "🍅",
    value: "1",
  },
  {
    title: "🍅🍅",
    value: "2",
  },
  {
    title: "🍅🍅🍅",
    value: "3",
  },
  {
    title: "🍅🍅🍅🍅",
    value: "4",
  },
  {
    title: "🍅🍅🍅🍅🍅",
    value: "5",
  },
];
const Task = () => {
  const [user, setUser] = useState(
    typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [tasks, setTasks] = useState<any[]>([]);
  const [date, setDate] = useState<Date>();
  const [background, setBackground] = useState("");
  const [priority, setPriority] = useState("");
  const [pomorodo, setPomodormo] = useState("");
  const [values, setValues] = useState({
    title: "",
    desc: "",
  });

  const router = useRouter();
  console.log(user);

  const handleChange =
    (prop: string) => (event: { target: { value: any } }) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleAddTask = async () => {
    console.log(
      values.title,
      values.desc,
      date,
      priority,
      background,
      pomorodo
    );
    await setDoc(
      doc(db, `users/${user.username}/tasks/${values.title}`),
      {
        title: values.title,
        desc: values.desc,
        deadline: date,
        priority: priority,
        color: background,
        pomorodo: pomorodo,
        status: "todo",
        createdAt: serverTimestamp(),
      },
      { merge: true }
    )
      .then(async () => {
        console.log("task added");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users", `${user.username}`, "tasks"),
      (collectionRef) => {
        let arr: any = [];
        collectionRef.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id });
        });
        setTasks(arr);
      }
    );

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  return (
    <SidebarLayout>
      <div className="h-screen">
        <Dialog>
          <DialogTrigger asChild>
            <div className="h-20 flex justify-end p-4">
              <Button className="py-2 px-4 bg-slate-200 text-gray-800 rounded-lg">
                Add Task
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg bg-black border-none">
            <DialogHeader className="flex items-center">
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a New Task !</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  onChange={handleChange("title")}
                  type="text"
                  id="title"
                  className="rounded-lg  bg-black text-slate-300 col-span-3"
                  placeholder="Task Title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desc" className="text-right">
                  Descrition
                </Label>
                <Textarea
                  onChange={handleChange("desc")}
                  id="desc"
                  className="rounded-lg  bg-black text-slate-300 col-span-3"
                  placeholder="Description of the task"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Deadline
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select onValueChange={(e) => setPriority(e)}>
                  <SelectTrigger className=" bg-black rounded-lg text-slate-300 col-span-3">
                    <SelectValue placeholder="Pick a Tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="bg-black  ">
                      <SelectLabel>Priority</SelectLabel>
                      {PRIORITYLIST.map(({ title, color, value }, idx) => (
                        <SelectItem
                          className={`${color}`}
                          key={idx}
                          value={value}
                        >
                          {title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Color Picker
                </Label>
                <GradientPicker
                  className="col-span-3 w-full"
                  background={background}
                  setBackground={setBackground}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Pomodoro
                </Label>
                <Select onValueChange={(e) => setPomodormo(e)}>
                  <SelectTrigger className=" bg-black rounded-lg text-slate-300 col-span-3">
                    <SelectValue placeholder="Pick the Tomatoes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="bg-black  ">
                      <SelectLabel>Pomorodo</SelectLabel>
                      {POMORODOLIST.map(({ title, value }, idx) => (
                        <SelectItem key={idx} value={value}>
                          {title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTask} variant={"outline"} type="submit">
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="h-3/4 p-2">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 h-full">
            <div className="rounded-lg bg-slate-900/80 p-4">
              <div className="flex flex-row justify-between">
                <h2 className="font-semibold text-xl">ToDo 🚀</h2>
                <ListFilter className="h-6 w-6 mt-1" />
              </div>
              <Separator className="my-4 bg-white" />
              <ScrollArea className="h-[550px]">
                {tasks.map((task, idx) =>
                  task.status == "todo" ? (
                    <div
                      key={idx}
                      onClick={() => router.push(`/tasks/${task.title}`)}
                      className={`rounded-xl bg-[${task.color}]  bg-amber-400/80 my-4 text-black p-4 cursor-pointer`}
                    >
                      <div className="flex flex-row justify-between">
                        <span className="text-md font-normal">
                          {task.deadline?.toDate().toString().slice(4, 10)}
                        </span>
                        <ArrowUpRightFromCircle />
                      </div>
                      <div className="my-4">
                        <h2 className="font-semibold text-2xl font-mono">
                          {task.title}
                        </h2>
                      </div>
                      <div className="">
                        <Badge
                          className={`${
                            task.priority === "A+"
                              ? "bg-red-500"
                              : task.priority === "A"
                              ? "bg-orange-500"
                              : task.priority === "B"
                              ? "bg-amber-500"
                              : task.priority === "C"
                              ? "bg-lime-500"
                              : "bg-green-500"
                          } font-bold mx-1`}
                        >
                          {task.priority}
                        </Badge>
                        <Badge className="bg-slate-100 mx-1">
                          {"🍅".repeat(parseInt(task.pomorodo))}
                        </Badge>
                        {/* <Badge className='mx-1 bg-sky-950 text-white'>Anything</Badge> */}
                      </div>
                    </div>
                  ) : null
                )}
                {/* <div className=' rounded-xl bg-sky-400/90 my-4 text-black p-4'>
                  <div className='flex flex-row justify-between'>
                    <span className='text-md font-normal'>Today</span>
                    <ArrowUpRightFromCircle />
                  </div>
                  <div className='my-4'>
                    <h2 className='font-semibold text-2xl font-mono'>I Have To Gili Jili Blili blah blah blah</h2>
                  </div>
                  <div className=''>
                    <Badge className='mx-1 bg-green-600/80'>C</Badge>
                    <Badge className='bg-slate-100 mx-1'>🍅🍅</Badge>
                    <Badge className='mx-1 bg-sky-950 text-white'>Everything</Badge>
                  </div>
                </div> */}
              </ScrollArea>
            </div>
            <div className="rounded-lg bg-slate-900/80 p-4">
              <div className="flex flex-row justify-between">
                <h2 className="font-semibold text-xl">Active 📝</h2>
                <ListFilter className="h-6 w-6 mt-1" />
              </div>
              <Separator className="my-4 bg-white" />
              <ScrollArea className="h-[550px]">
                {tasks.map((task, idx) =>
                  task.status == "active" ? (
                    <div
                      key={idx}
                      onClick={() => router.push(`/tasks/${task.title}`)}
                      className={`rounded-xl bg-sky-400/90 bg-[${task.color}] my-4 text-black p-4`}
                    >
                      <div className="flex flex-row justify-between">
                        <span className="text-md font-normal">
                          {task.deadline?.toDate().toString().slice(4, 10)}
                        </span>
                        <ArrowUpRightFromCircle />
                      </div>
                      <div className="my-4">
                        <h2 className="font-semibold text-2xl font-mono">
                          {task.title}
                        </h2>
                      </div>
                      <div className="">
                        <Badge
                          className={`${
                            task.priority === "A+"
                              ? "bg-red-500"
                              : task.priority === "A"
                              ? "bg-orange-500"
                              : task.priority === "B"
                              ? "bg-amber-500"
                              : task.priority === "C"
                              ? "bg-lime-500"
                              : "bg-green-500"
                          } font-bold mx-1`}
                        >
                          {task.priority}
                        </Badge>
                        <Badge className="bg-slate-100 mx-1">
                          {"🍅".repeat(parseInt(task.pomorodo))}
                        </Badge>
                        <Badge className="mx-1 bg-sky-950 text-white">
                          Anything
                        </Badge>
                      </div>
                    </div>
                  ) : null
                )}
              </ScrollArea>
            </div>
            <div className="rounded-lg bg-slate-900/80 p-4">
              <div className="flex flex-row justify-between">
                <h2 className="font-semibold text-xl">Done ✅</h2>
                <ListFilter className="h-6 w-6 mt-1" />
              </div>
              <Separator className="my-4 bg-white" />
              <ScrollArea className="h-[550px]">
                {tasks.map((task, idx) =>
                  task.status == "done" ? (
                    <div
                      key={idx}
                      onClick={() => router.push(`/tasks/${task.title}`)}
                      className={`rounded-xl bg-lime-400/90 bg-[${task.color}] my-4 text-black p-4`}
                    >
                      <div className="flex flex-row justify-between">
                        <span className="text-md font-normal">
                          {task.deadline?.toDate().toString().slice(4, 10)}
                        </span>
                        <ArrowUpRightFromCircle />
                      </div>
                      <div className="my-4">
                        <h2 className="font-semibold text-2xl font-mono">
                          {task.title}
                        </h2>
                      </div>
                      <div className="">
                        <Badge
                          className={`${
                            task.priority === "A+"
                              ? "bg-red-500"
                              : task.priority === "A"
                              ? "bg-orange-500"
                              : task.priority === "B"
                              ? "bg-amber-500"
                              : task.priority === "C"
                              ? "bg-lime-500"
                              : "bg-green-500"
                          } font-bold mx-1`}
                        >
                          {task.priority}
                        </Badge>
                        <Badge className="bg-slate-100 mx-1">
                          {"🍅".repeat(parseInt(task.pomorodo))}
                        </Badge>
                        <Badge className="mx-1 bg-sky-950 text-white">
                          Anything
                        </Badge>
                      </div>
                    </div>
                  ) : null
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <Button onClick={() => router.push("/pomodoro")} variant={"outline"}>
            Pomodoro
          </Button>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Task;

{
  /* <div>Tasks</div>
      <pre>
        1. Todo list
        2. 3 stages Todo,InProgress,Completed
        3. Deadlines
        4. Thakali
        5. Serverity (A,B,C,D,E)
      </pre> */
}
