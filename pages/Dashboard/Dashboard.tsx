import { auth } from '@/backend/firebase';
import SidebarLayout from '@/layouts/SidebarLayout';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import QUOTES from '@/data/quotes';


import React, { useEffect, useState } from 'react'

const Dashboard = () => {


  const [quote,setQuote] = useState('');

  const onSignout = () => {
    signOut(auth)
    .then(() => {
      console.log("Logged out")
        // router.replace("/");
        // setUser(null);
        // localStorage.removeItem("userDb");
      })
      .catch(() => {
        alert("Error logging out");
      });
  };

  const getRandomQuote = () => {
    const min = 1;
    const max = 34;
    const rand = min + Math.random() * (max - min);
    const key = Math.round(rand);
    return key
    
  };

  useEffect(() => {
    const key = getRandomQuote();
    const quote = QUOTES[key];
    console.log(quote.message);
    setQuote(quote.message)
    
  }, []);

  return (
    <SidebarLayout>

<header className="bg-black">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="flex items-center justify-end gap-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <label className="sr-only" htmlFor="search"> Search </label>

          <input
            className="h-10 w-full rounded-full border-none bg-slate-900 pe-10 ps-4 text-sm shadow-sm sm:w-56"
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
        </div>

        <a
          href="#"
          className="block shrink-0 rounded-full bg-slate-900 p-2.5 text-slate-300 shadow-sm hover:text-gray-600"
        >
          <span className="sr-only">Notifications</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </a>
      </div>

      <span
        aria-hidden="true"
        className="block h-6 w-px rounded-full bg-slate-200"
      ></span>

      <div onClick={onSignout} className="block shrink-0">
        <span className="sr-only">Profile</span>
        <Image
          alt="Man"
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-10 w-10 rounded-full object-cover"
          width={100}
          height={100}
        />
      </div>
    </div>

    <div className="mt-8">
      <h1 className="text-2xl font-bold text-slate-200 sm:text-3xl">
        Welcome Back, Barry!
      </h1>

      <p className="mt-1.5 text-sm text-slate-500">
        {quote} 🚀
      </p>
    </div>
  </div>
</header>
    </SidebarLayout>
            
  )
}

export default Dashboard