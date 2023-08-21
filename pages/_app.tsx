import '@/styles/globals.css';
import "@/styles/prosemirror.css";
import type { AppProps } from 'next/app'
import { Toaster } from "@/components/ui/toaster"
import Providers from '@/util/Providers';

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <Toaster />
      <Providers>

        <Component {...pageProps} />
      </Providers>
    </>
  )
}
