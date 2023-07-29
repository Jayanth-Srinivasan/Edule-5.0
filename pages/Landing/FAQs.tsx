import React from 'react'

function FAQs() {

    const FAQS = [
        {
            question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.?',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
        },
        {
            question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.?',
            answer: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
        },
        {
            question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.?',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
        },
        {
            question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.?',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
        },
        {
            question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.?',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
        },
        {
            question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.?',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.',
        },
    ];
  return (
    <section className='flex w-full scroll-mt-24 -z-50' id='faqs'>
			<div className='mx-auto max-w-[1440px] px-3 py-16 md:px-5 lg:px-[5vw] lg:py-[148px]'>
				<div className='flex flex-col items-stretch justify-start text-center'>
					<div className='w-full justify-center p-2 md:p-4'>
						<h2 className='mb-12 text-[32px] font-medium md:text-[34px] lg:text-[40px]'>
							Frequently Asked Questions
						</h2>
					</div>
                        
				</div>
            <div className="flow-root max-w-2xl">
  <div className="-my-8 divide-y divide-gray-800">
    {FAQS.map((faq, idx) => (

    <details className="group py-8 [&_summary::-webkit-details-marker]:hidden" 
    key={idx}>
      <summary
        className="flex cursor-pointer items-center justify-between text-white">
        <h2 className="text-lg font-medium text-slate-200 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:bg-clip-text hover:text-transparent">
            {faq.question}
        </h2>

        <span className="relative h-5 w-5 shrink-0">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>


          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>

        </span>
      </summary>

      <p className="mt-4 leading-relaxed text-slate-300/70">
        {faq.answer}
      </p>
    </details>
    ))}
  </div>
</div>
</div>
</section>
  )
}

export default FAQs

