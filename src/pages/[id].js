import Editor from "@/components/editor";
import Head from "next/head";
import { useAuth } from "../tools/auth";
import { Logout } from "@/components/logout";
import { Loading } from "@/components/loading";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";

export default function Home() {
  const { isAuthenticated, loading, user } = useAuth();
  //const openai = process.env.OPEN_AI_API_KEY;
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const docRef = doc(db, "kysymykset", id);

        try {
          const doc = await getDoc(docRef);
          if (doc.exists) {
            setData({ ...doc.data(), id: id });
            console.log("tääl");
            console.log("tässssss" + doc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    // Render loading indicator or other content while authentication is being checked
    return <Loading />;
  }

  if (!isAuthenticated) {
    // If not authenticated, the user will be redirected to the home page
    return null; // or loading indicator, login form, etc.
  }

  return (
    <div className="min-h-screen flex">
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

      <Navbar />

      <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-black w-full flex justify-center p-4">
        <div className="max-w-lg w-full p-8 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">LaskijanAI</h1>
          <p className="text-lg text-gray-700 mb-6">
            Matikkaeditori | Tehtäviä | Tekoäly-tarkistaja
          </p>
          <div className="text-left">
            <Editor data={data} />
          </div>
          {user && <Logout />}
        </div>
      </div>
    </div>
  );
}
