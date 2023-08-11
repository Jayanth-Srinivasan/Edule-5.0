import React, { useState } from 'react';
import { FolderPlus } from 'lucide-react';
import { useRouter } from 'next/router';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from 'lucide-react';



const Header = () => {

  const router = useRouter();

  return (
    <header className='h-32  grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8'>
        <div className="lg:col-span-2 flex justify-center items-center">
        <div className='w-full p-4 mx-auto '>
    <div className="relative flex items-center w-full h-12 rounded-xl focus-within:shadow-lg bg-gray-800 overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        className="peer h-full w-full outline-none text-sm text-slate-300 pr-2 bg-gray-800"
        type="text"
        id="search"
        placeholder="Search..." /> 
    </div>
</div>
        </div>
        <div className="rounded-xl flex justify-center items-center transform hover:scale-105 transition duration-500">
          <div onClick={() => router.push("/library/upload")} className='flex flex-row bg-gray-800 px-5 py-3 rounded-xl'>
            <div className='text-md font-medium'>Upload files</div>
            <div className='ml-2'><FolderPlus/></div>
          </div>
        </div>
        </header>
  )
}

export default Header