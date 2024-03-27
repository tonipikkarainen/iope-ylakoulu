import Editor from "@/components/editor";
import Head from "next/head";

export default function Home() {
  const test = "test";
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-black">
      <Head>
        <title>iOpe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap");
        body {
          font-family: "Roboto", sans-serif;
        }
      `}</style>

      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">iOpe</h1>
        <p className="text-lg text-gray-700 mb-6">
          Matikkaeditori | Tehtäviä | Tekoäly-tarkistaja
        </p>

        <button className="bg-pink-500 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline hover:bg-pink-600 hover:text-gray-100">
          Kirjaudu
        </button>
        <Editor />
      </div>
    </div>
  );
}
