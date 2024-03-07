import { Inter } from "next/font/google";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
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
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Note {
  id: number;
  title: string;
  text: string;
  status: boolean;
  uuid: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export default function Home({ user }: { user: User }) {
  const supabase = createClient();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from("notes").select("*");

      if (error) {
        console.error(error);
        return;
      }
      setNotes(data);
    };
    fetchNotes();
  }, []);

  return (
    <main className={`p-10 ${inter.className}`}>
      <Head>
        <title>Notes</title>
      </Head>
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Notes
          </h2>
          {user.email && <p>Notes from {user?.email}</p>}
        </div>
        <div className="mt-4 flex gap-2 md:ml-4 md:mt-0">
          <Button variant="secondary" disabled>
            Sign in
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1024px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Add note</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4"></div>
              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                        {note.text.length > 100
                          ? `${note.text.slice(0, 100)}...`
                          : note.text}
                      </p>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle className="text-2xl">{note.title}</DrawerTitle>
                      <DrawerDescription>
                        {note.text}
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <DrawerClose>
                        <Button>Ok</Button>
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
