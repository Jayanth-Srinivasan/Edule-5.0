import SidebarLayout from '@/layouts/SidebarLayout'
import React, { useEffect, useState } from 'react'
import { FileUp, PlusCircle } from 'lucide-react';
import { db, storage } from '../../../backend/firebase';
import { ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {  collection, doc,  getDocs, onSnapshot, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const Upload = () => {
  const [fileUrl, setfileUrl] = useState('');
  const [fileName,setFileName] = useState('');
  const [progresspercent, setProgresspercent] = useState(0);
  const [value, setValue] = useState("");
  const [fileUpload,setFileUpload] = useState(false);
  const [shareCode,setShareCode] = useState('');
  const [selectedTag,setSelectedTag] = useState('');
  const [tags,setTags] = useState<any[]>([]);
  const [newTag,setNewTag] = useState('');
  const [values, setValues] = useState({
    name: '',
    desc: '',
});


const router = useRouter();
const handleChange = (prop: string) => (event: { target: { value: any; }; }) => {
    setValues({ ...values, [prop]: event.target.value });
};


const addTags = async  () => {
  const collectionRef = collection(db,"books");
  const q  = await getDocs(collectionRef);
  const ids = q.docs.map((doc) => doc.id);
  if (ids.includes(newTag)){
    alert("Its already there");
  } else {
    await setDoc(
      doc(db,"books",newTag),
      {
        name: newTag,
        createdAt: serverTimestamp()
      },
      {merge: true}
    ).then(async () => {
      console.log("tag added");
    }).catch((error) => alert(error.message));
  }
}
  const changeHandler=(e:any)=>{
    if (e.target.files.length > 0) {
     let filename = e.target.files[0].name;
      console.log(filename);
      setFileName(filename);
    }
  }


  const handleSubmit = (e:any) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          setfileUrl(downloadURL)
          console.log(downloadURL)
          await setDoc(
            doc(db,`books/${selectedTag}/materials/${values.name}`), //REFINE THE CODE GEN THE RANDOM NO FOR DOCS
            {
              name: values.name,
              file: downloadURL,
              desc: values.desc,
              createdAt: serverTimestamp()
            },
            {merge: true}
          ).then(async () => {
            console.log("real");
            router.push('/library')
          }).catch((error) => alert(error.message));
        });
      }
      );
      // 
    }

    const handleCancel = () => {
      router.push('/library')
    }

    useEffect(() => {
      const unsub = onSnapshot(
          query(collection(db, "books")),
          (collectionRef) => {
              let arr:any = [];
              collectionRef.forEach((doc) => {
                  arr.push(doc.id);
              });
              setTags(arr)
          }
      );
  },[router.isReady]);
  return (
    <SidebarLayout>
        <div className="flex items-center justify-center h-full w-full mx-auto sm:max-w-xl">

        <div className="flex flex-col items-center w-full h-5/6 my-20 bg-gray-800 sm:w-3/4 sm:rounded-xl sm:shadow-xl ">
            <div className="mt-8 mb-8 text-center">
                <h2 className="text-2xl font-semibold mb-2">Upload the File</h2>
                <p className="text-xs text-gray-500">File should be of format .pdf, .docx, .xlsx or .txt</p>
            </div>
            <form onSubmit={handleSubmit}  className=" relative w-4/5 h-64 max-w-xs mb-10 bg-slate-900 rounded-xl shadow-inner">
                <Input type="file" id="file-upload" className='hidden' onChange={changeHandler}  />
                <Label htmlFor="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
                  {
                    !fileName ?
                    <>
                    <p className="z-10 text-sm font-light text-center text-slate-300">Drag & Drop your files here</p>
                    <div><FileUp/></div>
                    </>
                    :
                    <p>{fileName}</p>
                  }
                </Label>
                <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
                  {/* <Label htmlFor='fileName' className=''>File Name</Label> */}
                  <Input onChange={handleChange('name')} type='text' id='fileName' className='rounded-lg border-none bg-slate-900 text-slate-300' placeholder='File Name'/>
                </div>
                <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
                  {/* <Label className=''>Description</Label> */}
                  <Textarea onChange={handleChange('desc')}  id='fileName' className='rounded-lg border-none bg-slate-900 text-slate-300' placeholder='Description of the file'/>
                </div>
                <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
                <div className="grid grid-cols-4 items-center gap-4">
                  
                  <Select onValueChange={(e) => setSelectedTag(e)} >
                    <SelectTrigger className="border-none bg-slate-900 rounded-lg text-slate-300 col-span-3">
                      <SelectValue placeholder="Pick a Tag" />
                    </SelectTrigger>
                    <SelectContent className='border-none'>
                      <SelectGroup className='bg-slate-900 border-none '>
                        <SelectLabel>Tags</SelectLabel>
                        {
                          tags.map((name,idx) => (
                            <SelectItem key={idx} value={name}>{name}</SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button><PlusCircle/></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-black">
                      <DialogHeader>
                        <DialogTitle>Add Tag</DialogTitle>
                        <DialogDescription>
                          Whoo ! Create a new tag 
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Tag Name
                          </Label>
                          <Input onChange={(e) => setNewTag(e.target.value)} id="name" placeholder="Enter Tag Name" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogTrigger>
                          <Button onClick={addTags} type="submit" className='bg-slate-300 text-gray-950'>Add Tag</Button>
                        </DialogTrigger>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                </div>
                
                
                <div className='flex flex-col justify-center items-center mt-4 mb-5'>
                  {
                    !fileUrl ?
                <button type='submit' className='px-4 py-2 bg-slate-100 text-gray-900 rounded-xl  hover:bg-gray-400 transform transition-all duration-300 hover:scale-110'>
                  Upload
                  </button>
                  :
                  <>
                  {
                  progresspercent < 100 ?
                  <button disabled className='px-4 py-2 bg-slate-100 text-gray-900 rounded-xl '>
                    Uploading {progresspercent}%
                  </button>
                  :
                  <button disabled className='px-4 py-2 bg-slate-100 text-gray-900 rounded-xl '>Uploaded</button>
                  }
                  </>
                  }
                  <div className='mt-2 m-1'>
                  <button onClick={handleCancel} className='font-light text-xs text-slate-300' >Cancel</button>
                  </div>
                </div>
            </form>
        </div>
    </div>
    </SidebarLayout>
  )
}

export default Upload