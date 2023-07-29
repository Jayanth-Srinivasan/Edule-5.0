import Particles from '@/components/Particles'
import React from 'react'

function Hero() {
  return (
    <section className=" text-white">
      <Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={200}
			/>
  <div
    className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[calc(100vh-80px)] lg:items-center lg:justify-center"
  >
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl text-mont"
      >
        Revolutionizing the Learning

        <span className="sm:block"> Experience with AI </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-pop text-slate-300">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
        tenetur fuga ducimus numquam ea!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
      <a
        className="group relative inline-flex items-center overflow-hidden rounded-full bg-slate-900/80 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
        href="/download"
      >
        <span className="absolute -end-full transition-all group-hover:end-4">
          <svg
            className="h-5 w-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>

        <span className="text-pop text-transparent  bg-clip-text bg-gradient-to-r from-emerald-400  to-cyan-400 text-md lg:text-lg font-bold transition-all group-hover:me-4">
          Get Started
        </span>
      </a>


        {/* <a
          className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/about"
        >
          Learn More
        </a> */}
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero