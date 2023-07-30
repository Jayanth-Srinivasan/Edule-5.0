import React from 'react'
import SidebarLayout from '@/layouts/SidebarLayout';
import Header from './Header';

const Dashboard = () => {
  return (
    <SidebarLayout>
      <Header/>
      {/* Section 1 */}
      <div className=" mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-64 rounded-xl bg-slate-900 lg:col-span-2 flex justify-center items-center">
          Somthinhg Here
        </div>
        <div className="h-64 rounded-xl bg-slate-900 flex justify-center items-center">
          ToDo
        </div>
    </div>

    {/* Section 2 */}

    <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
      <div className="h-64 rounded-xl bg-slate-900 flex justify-center items-center">
        Feed
      </div>
      <div className="h-64 rounded-xl bg-slate-900 flex justify-center items-center">
        Notifications
      </div>
    </div>
    </SidebarLayout>
            
  )
}

export default Dashboard