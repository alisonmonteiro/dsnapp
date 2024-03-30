import { Inter } from "next/font/google";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Head from "next/head";
import { createClient as createServerClient } from "@/lib/utils/supabase/server";
import { createClient } from "@/lib/utils/supabase/component";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNotes } from "@/lib/hooks/use-notes";
import { CreateNote } from "@/components/create-note";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ user }: { user: User }) {
  const supabase = createClient();
  const router = useRouter();
  const notes = useNotes();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const isUserAuthenticated = user?.id && user?.aud;

  return (
    <main className={`p-4 md:p-10 w-screen h-screen ${inter.className}`}>
      <Head>
        <title>Notes</title>
      </Head>
      <div className="md:flex items-center justify-between w-full">
        <div className="flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Notes
          </h1>
          {user.email && <p>Notes from {user?.email}</p>}
        </div>
        <div className="mt-4 flex gap-2 md:ml-4 md:mt-0">
          <Dialog open={isAddModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddModalOpen(true)}>Add</Button>
            </DialogTrigger>
            <CreateNote onSubmit={() => setIsAddModalOpen(false)} />
          </Dialog>

          {isUserAuthenticated ? (
            <Button variant="secondary" onClick={() => {
              supabase.auth.signOut();
              router.push("/login");
            }}>
              Sign out
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="secondary">Sign in</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="w-full py-4">
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {notes.map((note) => (
              <li key={note.id} className="py-5">
                <Drawer>
                  <DrawerTrigger>
                    <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                      <h3 className="text-base text-left font-semibold hover:underline focus:outline-none text-gray-800">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {note.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-left text-gray-600">
                        {note.text.length > 100
                          ? `${note.text.slice(0, 100)}...`
                          : note.text}
                      </p>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle className="text-2xl text-left">{note.title}</DrawerTitle>
                      <DrawerDescription className="text-base text-left">
                        {note.text}
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <DrawerClose className="text-left">
                        <Button variant="secondary">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerClient(context);
  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: data.user,
    },
  };
}
