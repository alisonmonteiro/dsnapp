import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function ErrorPage() {
  return (
    <main className={`p-4 md:p-10 w-screen h-screen ${inter.className}`}>
      <Head>
        <title>Notes - Error</title>
      </Head>
      <div className="flex items-center justify-center h-full w-full">
        <p>Sorry, something went wrong</p>
      </div>
    </main>
  );
}
