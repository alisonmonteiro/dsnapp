import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/utils/supabase/component";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function logIn(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
      return;
    }
    router.push("/");
  }

  return (
    <main>
      <Head>
        <title>Notes - Login</title>
      </Head>
      <form
        onSubmit={logIn}
        className="w-full max-w-screen-sm mx-auto mt-10 md:mt-20 p-4 flex flex-col space-y-5"
      >
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Notes
        </h1>

        <div>
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="email"
            value={email}
            className="mt-1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">Password:</Label>
          <Input
            id="password"
            type="password"
            value={password}
            className="mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Log in</Button>
      </form>
    </main>
  );
}
