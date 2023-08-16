import { db } from '@/backend/firebase';
import { Badge } from '@/components/ui/badge';
import SidebarLayout from '@/layouts/SidebarLayout'
import { collection, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { ChevronLeftCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'



const TaskInfo = () => {
  const [user, setUser] = useState(typeof window !== "undefined" && JSON.parse(localStorage.getItem('user') || '{}'));
  const [taskDetails,setTaskDetails] = useState<{[key: string]: any}>({});({});
  const router = useRouter()
  // console.log(taskDetails.deadline.toDate())
  // @ts-ignore
  const day1: Date =  (taskDetails.deadline)?.toDate()
  const day2: Date = new Date();
  const daysLeft = Math.round((day1?.getTime()-day2?.getTime())/(1000*3600*24))+1

  const handleStatusChange = async(prop: string) => {
    const docRef = doc(db,`users/${user.username}/tasks/${router.query.TaskName}`)
    if (prop === 'active'){
       await updateDoc(docRef,{
          status: 'active'
       })
    } else {
      await updateDoc(docRef,{
        status: 'done'
     })
    }
    
};
  // @ts-ignore
  useEffect(() => {
    if(router.isReady){
        const unsub = onSnapshot(
            query(collection(db, "users",`${user.username}`,"tasks"), where("title","==", router.query.TaskName)),
            (collectionRef) => {
                collectionRef.forEach((doc) => {
                    setTaskDetails({ ...doc.data(), id: doc.id });
                });
            }
            );
    }
}, [router.isReady, router.query.TaskName, user.username])
  return (
    <SidebarLayout>
        <div className='h-screen'>
          <div className='h-32 bg-amber-400/80 rounded-xl py-6 px-4 flex justify-between'>
            <h2 className='text-3xl text-black font-semibold mt-8 font-mono'>{taskDetails.title}</h2>
          </div>
          <div className='h-full'>
            <div className='h-12 mt-2 flex items-center justify-between px-4'>
              <div onClick={() => router.push('/tasks')} className='flex items-center gap-2 cursor-pointer'><ChevronLeftCircle className='h-7 w-7' />Back to Tasks</div>
              <div className='flex gap-12 items-center'>
                <span className='font-semibold font-mono'>{daysLeft} Days Left</span>
                {
                taskDetails.status === 'todo'?
                <button onClick={() => handleStatusChange('active')} className='py-2 px-4 bg-slate-200 text-black rounded-lg'>Start Now</button>
                :
                <button onClick={() => handleStatusChange('done')} className={`py-2 px-4 ${taskDetails.status === 'done' ? 'bg-red-600': 'bg-green-600'}  text-black font-medium rounded-lg`} disabled={taskDetails.status === 'done' ? true: false}>{taskDetails.status === 'active' ? 'Completed' : 'Done'}</button>
                }
              </div>
            </div>
            <div className='mt-4 grid grid-cols-1 grid-rows-3 gap-4 px-4'>
              <div className="grid grid-cols-4 px-8">
                  <div className='max-w-xs text-slate-300 text-lg font-medium'>Description</div>
                  <div className='w-full col-span-3 text-lg font-mono font-normal'>{taskDetails.desc}</div>
              </div>
              <div className="grid grid-cols-4 px-8">
                  <div className='max-w-xs text-slate-300 text-lg font-medium'>Priority</div>
                  <div className={`w-full col-span-3 ${taskDetails.priority === 'A+' ? 'text-red-500' : taskDetails.priority==='A' ? 'text-orange-500' : taskDetails.priority ==='B'? 'text-amber-500':taskDetails.priority === 'C' ? 'text-lime-500' : 'text-green-500'} text-lg font-mono font-normal`}>{taskDetails.priority === 'A+' ? 'Highest Priority (A+)' : taskDetails.priority==='A' ? 'High Priority (A)' : taskDetails.priority ==='B'? 'Medium Priority (B)':taskDetails.priority === 'C' ? 'Low Priority (C)' : 'No Priority (D)'}</div>
              </div>
              <div className="grid grid-cols-4 px-8">
                  <div className='max-w-xs text-slate-300 text-lg font-medium'>Pomodoro</div>
                  <div className='w-full col-span-3 text-lg font-mono font-normal'>{"🍅".repeat(parseInt(taskDetails.pomorodo))}</div>
              </div>
            </div>
            <div className='h-full mt-8 flex justify-center items-center'>
              <div className='w-5/6 h-full border-slate-50/40 rounded-xl border'>
                Editor
              </div>
            </div>
          </div>
        </div>
    </SidebarLayout>
  )
}

export default TaskInfo