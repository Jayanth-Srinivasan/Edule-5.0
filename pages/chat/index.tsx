import SidebarLayout from '@/layouts/SidebarLayout'
import React from 'react'
import ChatSidebar from './ChatSidebar'
import ChatRoom from './ChatRoom'

const Chat = () => {
  return (
    <SidebarLayout>
      
<div className="flex h-screen antialiased text-slate-300 ">
    <div className="flex flex-row h-full w-full overflow-x-hidden ">
      <ChatSidebar/>
      <ChatRoom/>
    </div>
  </div>
    </SidebarLayout>
  )
}

export default Chat