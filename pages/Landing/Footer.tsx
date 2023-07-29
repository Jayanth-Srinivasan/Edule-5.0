import Link from 'next/link';
import React from 'react'

function Footer() {


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
    <footer className="bg-black">
  <div
    className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24"
  >
    <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
      <div
        className="inline-block rounded-full bg-emerald-500 p-2 text-white shadow transition hover:bg-teal-600 sm:p-3 lg:p-4"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <span className="sr-only">Back to top</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <div className="lg:flex lg:items-end lg:justify-between">
      <div>
        <div className="flex justify-center text-emerald-500 lg:justify-start">
          <h1 className=" font-mont uppercase font-bold text-2xl">Edule</h1>
        </div>

        <p
          className="mx-auto mt-6 max-w-md text-center leading-relaxed text-slate-500 lg:text-left"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          consequuntur amet culpa cum itaque neque.
        </p>
      </div>

      <ul
        className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
      >
        {
          NAVLINKS.map(({title,link},idx) => (
        <li
        key={idx}
        >
          <Link 
          className="text-slate-500 transition hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 font-normal" 
          href={link}>
            {title}
          </Link>
        </li>
        ))}
      </ul>
    </div>

    <p className='mt-8 text-center text-sm text-slate-500 lg:text-left'>Designed and Developed with &#10084; by Batch 10. </p> 
    <p className="lg:-mt-2 mt-2 text-center text-sm text-slate-500 lg:text-right">
      Copyright &copy; 2023. All rights reserved. 
    </p>
  </div>
</footer>
  )
}

export default Footer