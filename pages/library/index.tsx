import SidebarLayout from '@/layouts/SidebarLayout'
import React, { useEffect, useState } from 'react'
import Header from './Header';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '@/backend/firebase';
import Link from 'next/link';
import { FileText, ThumbsDown, ThumbsUp } from 'lucide-react';
// import { pdfjs, Document, Page } from 'react-pdf';


// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const Library = () => {
 

  const router = useRouter();
  const [tags,setTags] = useState<any[]>([]);
  const [selectedtag,setSelectedTag] = useState('');
  const [files,setFiles] = useState<any[]>([]);



  // const [numPages, setNumPages] = useState<number>();
  // const [pageNumber, setPageNumber] = useState<number>(1);

  // function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
  //   setNumPages(numPages);
  // }


  useEffect(() => {
    const unsub = onSnapshot(
        query(collection(db, "books")),
        (collectionRef) => {
            let arr:any = [];
            collectionRef.forEach((doc) => {
                arr.push(doc.id);
            });
            setTags(arr);
        }
    );
},[router.isReady]);

useEffect(() => {
  if (!selectedtag){
    console.log("No tags");
  } else{
    const unsub = onSnapshot(
      collection(db,"books",`${selectedtag}`,"materials"),
      (collectionRef) => {
        let arr:any = [];
        collectionRef.forEach((doc) => {
          arr.push({...doc.data(),id:doc.id})
        });
        setFiles(arr);
      })

      return () => unsub();
  }
},[selectedtag])

console.log(files);

  return (
    <SidebarLayout>
        <Header/>
        <div className='p-4 flex justify-center'>
          <ul className='flex flex-wrap gap-1 max-w-3xl justify-center'>
            {
              tags.map((name,idx) => (

              <li key={idx}>
                  <div onClick={()=>setSelectedTag(name)} className='inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 border-gray-900 bg-slate-800 text-slate-300 hover:bg-gray-900 hover:text-white'>
                      <span>🤖</span>
                      <span  className='text-xs font-medium'>{name}</span>
                  </div>
              </li>
              )) 
            }
              
          </ul>
        </div>
        {
          selectedtag?
        <div className='p-6 mx-auto'>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
            {
              files.map((file, idx) => (
                <div  key={idx} className="block max-w-md p-6 bg-slate-800 border border-slate-300 rounded-xl shadow hover:bg-slate-900 ">
                  <Link href={file.file} target='_blank'>
                  <div>
                    <FileText />
                  </div>
                  <div className='h-24'>

                    <h5 className="mb-2 mt-2 capitalize text-2xl font-bold tracking-tight text-slate-300">{file.name}</h5>
                    <p className="font-normal text-gray-500 ">{file.desc}</p>
                  </div>
                  </Link>
                  <div className='flex flex-row mt-4 justify-between'>
                    <div className='flex flex-row'><ThumbsUp />52</div>
                  <div className='flex flex-row'><ThumbsDown/>41</div>
                  </div>
                </div>
              ))
            }   
            {/* <div>
              <Document file="https://web.stanford.edu/group/csp/cs21/csscheatsheet.pdf" onLoadError={console.error}  onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div> */}
          </div>
        </div>
        :
        <div className='h-3/4 flex justify-center items-center'>
          <h1 className='text-xl text-slate-300'>Click on one of the Tags to View the Files</h1>
        </div>
        }
    </SidebarLayout>
  )
}

export default Library