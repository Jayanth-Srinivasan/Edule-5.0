import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import SidebarLayout from '@/layouts/SidebarLayout'
import { ArrowUpRightFromCircle, ListFilter } from 'lucide-react'
import React from 'react'

const Task = () => {
  return (
    <SidebarLayout>
      <div className='h-screen'>
        <div className='h-20 flex justify-end p-4'>
          <button className='py-2 px-4 bg-slate-200 text-gray-800 rounded-lg'>Add Task</button>
        </div>
        <div className='h-3/4 p-2'>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 h-full">
            <div className="rounded-lg bg-slate-900/80 p-4">
              <div className='flex flex-row justify-between'>
                <h2 className='font-semibold text-xl'>ToDo 🚀</h2>
                <ListFilter className="h-6 w-6 mt-1"/>
              </div>
              <Separator className="my-4 bg-white" />
              <ScrollArea className='h-96'>
                <div className=' rounded-xl bg-amber-400/90 my-4 text-black p-4'>
                  <div className='flex flex-row justify-between'>
                    <span className='text-md font-normal'>13 Aug</span>
                    <ArrowUpRightFromCircle />
                  </div>
                  <div className='my-4'>
                    <h2 className='font-semibold text-2xl font-mono'>I Have To Do This! blah blah blah</h2>
                  </div>
                  <div className=''>
                    <Badge className='bg-red-600/80 mx-1'>A+</Badge>
                    <Badge className='bg-slate-100 mx-1'>🍅🍅🍅</Badge>
                    <Badge className='mx-1 bg-sky-950 text-white'>Anything</Badge>
                  </div>
                </div>
                <div className=' rounded-xl bg-sky-400/90 my-4 text-black p-4'>
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
                </div>
              </ScrollArea>
            </div>
            <div className="rounded-lg bg-slate-900/80 p-4">
            <div className='flex flex-row justify-between'>
                <h2 className='font-semibold text-xl'>Active 📝</h2>
                <ListFilter className="h-6 w-6 mt-1"/>
              </div>
                <Separator className="my-4 bg-white" />
                <ScrollArea className='h-96'>
                
                <div className=' rounded-xl bg-sky-400/90 my-4 text-black p-4'>
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
                </div>
              </ScrollArea>
            </div>
            <div className="rounded-lg bg-slate-900/80 p-4">
            <div className='flex flex-row justify-between'>
                <h2 className='font-semibold text-xl'>Done ✅</h2>
                <ListFilter className="h-6 w-6 mt-1"/>
              </div>
                <Separator className="my-4 bg-white" />
                <ScrollArea className='h-96'>
                <div className=' rounded-xl bg-amber-400/90 my-4 text-black p-4'>
                  <div className='flex flex-row justify-between'>
                    <span className='text-md font-normal'>13 Aug</span>
                    <ArrowUpRightFromCircle />
                  </div>
                  <div className='my-4'>
                    <h2 className='font-semibold text-2xl font-mono'>I Have To Do This! blah blah blah</h2>
                  </div>
                  <div className=''>
                    <Badge className='bg-red-600/80 mx-1'>A+</Badge>
                    <Badge className='bg-slate-100 mx-1'>🍅🍅🍅</Badge>
                    <Badge className='mx-1 bg-sky-950 text-white'>Anything</Badge>
                  </div>
                </div>
                
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

    </SidebarLayout>
  )
}

export default Task







{/* <div>Tasks</div>
      <pre>
        1. Todo list
        2. 3 stages Todo,InProgress,Completed
        3. Deadlines
        4. Thakali
        5. Serverity (A,B,C,D,E)
      </pre> */}