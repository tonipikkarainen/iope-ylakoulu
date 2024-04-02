import Editor from "@/components/editor";
import Head from "next/head";
import { useAuth } from "../tools/auth";
import { Logout } from "@/components/logout";
import { Loading } from "@/components/loading";
import OpenAI from "openai";

export default function Home() {
  const { isAuthenticated, loading, user } = useAuth();
  //const openai = process.env.OPEN_AI_API_KEY;

  if (loading) {
    // Render loading indicator or other content while authentication is being checked
    return <Loading />;
  }

  if (!isAuthenticated) {
    // If not authenticated, the user will be redirected to the home page
    return null; // or loading indicator, login form, etc.
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

        <Editor />
        {user && <Logout />}
      </div>
    </div>
  );
}
