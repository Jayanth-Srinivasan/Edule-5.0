import Link from 'next/link';
import React from 'react';

function Header() {

    interface NavLinks {
        title: string,
        link: string,
    }[];

    const NAVLINKS: NavLinks[] = [
        {
            title:"About",
            link:"#",
        },
        {
            title:"Features",
            link:"/#features",
        },
        {
            title:"FAQs",
            link:"/#faqs",
        },
        {
            title:"Contact",
            link:"#",
        },
    ] 
  return (
    <header className=" bg-opacity-5 text-white shadow-lg">
  <div className=" py-6 px-12 container mx-auto flex items-center justify-center  h-20">
    <a href="" className="flex items-center justify-center">
      <span className="ml-4 font-mont uppercase font-bold text-2xl">Edule</span>
    </a>
    <nav className="contents font-semibold ">
      <ul className="mx-auto md:flex items-center text-slate-300 text-mont hidden">
        {
          NAVLINKS.map(({title,link}) => (

        <li className="p-5 xl:p-8 active hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400">
          <Link 
            href={link}>
            <span>{title}</span>
          </Link>
        </li>
          ))
        }
      </ul>
    </nav>
    <button className="bg-slate-900/80 rounded-full font-bold px-8 py-2 md:flex flex-row  hidden">
      <span className='text-mont text-transparent  bg-clip-text bg-gradient-to-r from-emerald-400  to-cyan-400'>Get Started</span>
    </button>
  </div>
  
</header>
  )
}

export default Header