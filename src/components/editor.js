import Head from "next/head";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Spinner from "./spinner";
import MathText from "./MathText";

export default function Editor() {
  const [msg, setMsg] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const kysymys = "Mitkä ovat funktion $f\\left(x\\right)=x^2-4$ nollakohdat?";

  useEffect(() => {
    // Create script elements
    const mathjaxConfigScript = document.createElement("script");
    mathjaxConfigScript.src = "/mathjax-config.js";
    mathjaxConfigScript.async = true;

    /* const mathjaxScript = document.createElement("script");
    mathjaxScript.src = "//cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
    mathjaxScript.id = "MathJax-script"; */

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
    setApiResponse("");
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
    const message = handleClick();
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kysymys: kysymys,
          msg: message,
        }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setApiResponse(data.result);
    } catch (e) {
      console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
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
        <section>
          <h2>Demo-versio</h2>
          <div
            className="answer rich-text-editor"
            id="answer1"
            placeholder="Kirjoita kaava...ei toimi"
          ></div>
        </section>
        <div>{"Tehtävä: "}</div>
        <MathText text={kysymys} />
        <Button onClick={handleSubmit} text="Lähetä ChatGPT:lle" />
        <div>{"Viesti ChatGPT:lle: " + msg}</div>
        <div>{"Vastaus / palaute:"}</div>
        {loading && <Spinner />}
        <MathText text={apiResponse} />
      </div>
    </>
  );
}
