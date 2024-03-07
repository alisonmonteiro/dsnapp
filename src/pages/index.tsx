import { Inter } from "next/font/google";
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
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const notes = [
  {
    id: 1,
    title: "Office closed on July 2nd",
    preview:
      "Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.",
  },
  {
    id: 2,
    title: "New password policy",
    preview:
      "Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.",
  },
  {
    id: 3,
    title: "Office closed on July 2nd",
    preview:
      "Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.",
  },
];

export default function Home() {
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
        <div className="mt-6 flow-root border border-red-500">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {notes.map((note) => (
              <li key={note.id} className="py-5">
                <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                  <h3 className="text-base font-semibold text-gray-800">
                    <a href="#" className="hover:underline focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {note.title}
                    </a>
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                    {note.preview}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
