import Head from "next/head";
import { LoginButton } from "@/components/loginbutton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseconfig";
import { useRouter } from "next/router";

import { Loading } from "@/components/loading";

export default function Login() {
  const test = "test";
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <Loading />;

  if (user) {
    void router.push(`/`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-black">
      <Head>
        <title>LaskijanAI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap");
        body {
          font-family: "Roboto", sans-serif;
        }
      `}</style>

      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">LaskijanAI</h1>
        <p className="text-lg text-gray-700 mb-6">
          Matikkaeditori | Tehtäviä | Tekoäly-tarkistaja
        </p>

        {!user ? <LoginButton /> : <div>Tähän kaikki kirjat</div>}
      </div>
    </div>
  );
}
