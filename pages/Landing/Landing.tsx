import React from 'react';
import Image from "next/image";
import Header from './Header'
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';
import FAQs from './FAQs';
import Head from 'next/head';

function Landing() {
  return (
    <>
    <Head>
				<title>Edule</title>
		</Head>
    <Header />
    <Hero/>
    <Features/>
    <FAQs/>     
    <Footer/>
    </>
  )
}

export default Landing