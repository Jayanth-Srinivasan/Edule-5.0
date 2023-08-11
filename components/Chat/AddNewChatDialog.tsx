import React, { use, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/backend/firebase';


const AddNewChatDialog = () => {
  const [userName,setUserName] = useState('');
  const [seletedMembers,setSelectedMembers] = useState([]);
  console.log(userName)
  useEffect(() => {
    const timer = setTimeout(async() => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
    }, 3000)
    return () => clearTimeout(timer);
  }, [userName])
  
  return (
    <>
    <Dialog>
          <DialogTrigger className='w-full'>
            <Button className='bg-emerald-500/80 hover:bg-emerald-400'>Add</Button>
          </DialogTrigger>
          <DialogContent className='bg-black border-none'>
            <DialogHeader>
              <DialogTitle>Create New Chat</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="userId">User Id</Label>
                <Input className='text-gray-900' onChange={(e) =>setUserName(e.target.value) } type="text" id="userId" placeholder="@username" />
              </div>
            </div>
            <DialogFooter>
                <Button>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  )
}

export default AddNewChatDialog