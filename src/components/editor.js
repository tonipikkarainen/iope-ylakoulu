import Head from "next/head";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Spinner from "./spinner";
import MathText from "./MathText";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useAuth } from "../tools/auth";

export default function Editor({ data }) {
  //const { isAuthenticated, user } = useAuth();

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [msg, setMsg] = useState("");
  const [apiTehtava, setApiTehtava] = useState("");
  const [apiRatkaisu, setApiRatkaisu] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const id = data
    ? data.id
    : "Mitkä ovat funktion $f\\left(x\\right)=x^2-4$ nollakohdat?";
  const kysymys = data
    ? data.kysymys
    : "Mitkä ovat funktion $f\\left(x\\right)=x^2-4$ nollakohdat?";

  useEffect(() => {
    // Create script elements

    const mathjaxConfigScript = document.createElement("script");
    mathjaxConfigScript.src = "/mathjax-config.js";
    mathjaxConfigScript.async = true;

    const mathCodeScript = document.createElement("script");
    mathCodeScript.src = "/math-code.js";
    console.log("here in useeffect");

    // Append script elements to the document body
    document.body.appendChild(mathjaxConfigScript);
    //document.body.appendChild(mathjaxScript);
    document.body.appendChild(mathCodeScript);

    // Clean up function to remove the script elements when component unmounts
    return () => {
      document.body.removeChild(mathjaxConfigScript);
      //document.body.removeChild(mathjaxScript);
      document.body.removeChild(mathCodeScript);
    };
  }, []);

  const handleClick = () => {
    setApiTehtava("");
    const element = document.getElementById("answer1");

    let result = ""; //element.textContent;

    element.childNodes.forEach((node) => {
      // If the node is a text node, append its text content
      if (node.nodeType === Node.TEXT_NODE) {
        result += node.textContent.trim() + " "; // Trim text content and add a space
        console.log(node.nodeName);
      }
      // If the node is an img element, append its alt property
      else if (node.nodeName.toLowerCase() === "img") {
        console.log(node.nodeName);
        result += node.alt.trim() + " "; // Trim alt property and add a space
      } else if (node.nodeName.toLowerCase() === "div") {
        result += handleDivNode(node, result);
      }
    });

    // Do something with the element
    // latex ei tule vielä
    console.log("ChatGPT:lle: " + result);
    setMsg(result);
    console.log("viesti: " + msg);
    return result;
  };

  const handleDivNode = (element) => {
    console.log("handledivissa");
    let result = "";
    element.childNodes.forEach((node) => {
      // If the node is a text node, append its text content
      if (node.nodeType === Node.TEXT_NODE) {
        result += node.textContent.trim() + " "; // Trim text content and add a space
      }
      // If the node is an img element, append its alt property
      else if (node.nodeName.toLowerCase() === "img") {
        console.log(node.nodeName);
        result += node.alt.trim() + " "; // Trim alt property and add a space
      }
    });
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //const message = handleClick();
    setApiTehtava("");
    setApiRatkaisu("");
    //setMsg(result);
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kysymys: kysymys,
          msg: selectedOption,
        }),
      });
      const data1 = await response.json();
      if (response.status !== 200) {
        throw (
          data1.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      // Tässä tallennus tietokantaan data ja message ja kysymys ja käyttäjä!
      // Add a new document with a generated id.

      setApiTehtava(data1.tehtava);
      setApiRatkaisu(data1.ratkaisu);

      //console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log(e);
      setApiTehtava({
        tehtava: "Something is going wrong, Please try again.",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <div>
        <div>{"Tehtävä: "}</div>
        <MathText text={kysymys} />
        <form className="text-black" onSubmit={handleSubmit}>
          <div>
            <label>
              <input
                type="radio"
                value="jalkapallo"
                checked={selectedOption === "jalkapallo"}
                onChange={handleOptionChange}
              />
              Jalkapallo
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="jääkiekko"
                checked={selectedOption === "jääkiekko"}
                onChange={handleOptionChange}
              />
              Jääkiekko
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="uinti"
                checked={selectedOption === "uinti"}
                onChange={handleOptionChange}
              />
              Uinti
            </label>
          </div>
        </form>
        <Button
          type="submit"
          onClick={handleSubmit}
          text="Tilaa uusi tehtävä"
        />
        <div>{"Viesti tekoälylle:lle: " + msg}</div>
        {loading && <Spinner />}
        Tehtävä:
        <MathText text={apiTehtava} />
        <Button
          type="submit"
          onClick={() => setShowSolution(!showSolution)}
          text="Ratkaisu"
        />
        {showSolution && <MathText text={apiRatkaisu} />}
      </div>
    </>
  );
}
