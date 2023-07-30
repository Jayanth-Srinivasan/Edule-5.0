import React from 'react';

export interface LayoutProps  { 
  children: React.ReactNode
}

const AuthLayout = ({children}: LayoutProps) => {
  return (
    <section className="w-full h-screen flex ">
            <div className="w-1/3 bg-slate-900/80 md:flex flex-col items-center justify-center gap-20 p-16 text-center h-full hidden">
              <h1 className="font-mont uppercase font-bold text-3xl">Edule</h1>
                <h1 className='text-mont tracking-widest'>LEARN . COLLAB . ACHIEVE</h1>
            </div>
            <main className="md:w-2/3 w-full h-full flex flex-col space-y-4 justify-center items-center">
                {children}
            </main>
        </section>
  )
}

export default AuthLayout