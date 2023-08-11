import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import AddNewChatDialog from '@/components/Chat/AddNewChatDialog';


interface ChatData {
    name: string,
    photo: string,
}[];

const CHATDATA: ChatData[] = [
    {
        name:"Jayanth Srinivasan",
        photo:"https://lh3.googleusercontent.com/a/AAcHTtcEsCKd7KvlhRd75O05_oLNEc-VGn7BIQOySNLkxARcL2U=s96-c",
    },
    {
        name:"Niranjanee Mohan",
        photo:"https://lh3.googleusercontent.com/a/AATXAJzOtl_R4E_y4pR8R4m2yYRdNUhutPQhbShQkbIn=s96-c",
    },
    {
        name:"Nandhana C",
        photo:"https://lh3.googleusercontent.com/a/ALm5wu15w0Xkqq-9NakAPpQOLNxYFhATGn7BZAMLn0CE=s96-c",
    },
]

const ChatSidebar = () => {
  return (
    <div className="flex flex-col py-8 w-64 flex-shrink-0">
        {/* <div className="relative">
          <label className="sr-only" htmlFor="search"> Search </label>

          <input
            className="h-10 w-full rounded-full border bg-slate-900 pe-10 ps-4 text-sm shadow-sm sm:w-56"
            id="search"
            type="search"
            placeholder="Search ..."
          />

          <button
            type="button"
            className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div> */}
        <AddNewChatDialog/>
        <div className="flex flex-col mt-8 h-2/3 overflow-y-scroll">
        {
            CHATDATA.map(({name, photo},idx) => (
            <div className="mt-4 flex items-center p-4 gap-2  rounded-xl border-2 border-slate-500 hover:bg-slate-600/30" key={idx}>
                <Avatar>
                    <AvatarImage src={photo} />
                    <AvatarFallback>ED</AvatarFallback>
                </Avatar>
                <h1>{name}</h1>
            </div>
            ))
        }
        </div>
      </div>
  )
}

export default ChatSidebar