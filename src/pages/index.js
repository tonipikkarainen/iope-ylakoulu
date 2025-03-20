import Editor from "@/components/editor";
import Head from "next/head";
import { useAuth } from "../tools/auth";
import { Logout } from "@/components/logout";
import { Loading } from "@/components/loading";
import Navbar from "@/components/navbar";

export default function Home() {
  //const { isAuthenticated, loading, user } = useAuth();
  //const openai = process.env.OPEN_AI_API_KEY;

  /*if (loading) {
    // Render loading indicator or other content while authentication is being checked
    return <Loading />;
  }*/

  /*if (!isAuthenticated) {
    // If not authenticated, the user will be redirected to the home page
    return null; // or loading indicator, login form, etc.
  }*/
  // Kun halutaan sulkea, tähän voidaan kirjoittaa
  /*if (true) {
    return <div>Sivu ei saatavilla juuri nyt </div>;
  }*/

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
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">LaskijanAI</h1>
          <p className="text-lg text-gray-700 mb-6">| Tehtävän muokkaaja |</p>
          <div className="text-sm text-left font-bold text-gray-800 mb-6">
            Tekoäly luo valitsemastasi tehtävästä uuden version toivomasi
            aihepiirin ja vaikeustason mukaan. Voit pyytää neuvoa ja lopulta
            pyytää tekoälyltä ratkaisun. Yritä laskea itse ja pyydä epäselvissä
            tilanteissa opettajalta apua.
          </div>{" "}
          <div className="text-xs text-left font-bold text-gray-800 mb-6">
            Ilmoitathan kaikista sivuston teknisistä ongelmista tekijälle eli
            Toni Pikkaraiselle (toni.t.pikkarainen@jyu.fi)
          </div>
        </div>
      </div>
    </div>
  );
}
