import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createPagesBrowserClient } from '@supabase/ssr'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'


function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
export default MyApp