import Head from "next/head";
import { useEffect } from "react";

export default function Editor() {
  useEffect(() => {
    const initializeMathJax = () => {
      // Render MathJax
      window.MathJax.typeset();
    };

    // Create script elements
    const mathjaxConfigScript = document.createElement("script");
    mathjaxConfigScript.src = "/mathjax-config.js";

    const mathjaxScript = document.createElement("script");
    mathjaxScript.src = "//cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
    mathjaxScript.id = "MathJax-script";

    const mathCodeScript = document.createElement("script");
    mathCodeScript.src = "/math-code.js";
    console.log("here in useeffect");

    // Append script elements to the document body
    document.body.appendChild(mathjaxConfigScript);
    document.body.appendChild(mathjaxScript);
    document.body.appendChild(mathCodeScript);

    mathjaxScript.onload = initializeMathJax;

    // Clean up function to remove the script elements when component unmounts
    return () => {
      document.body.removeChild(mathjaxConfigScript);
      document.body.removeChild(mathjaxScript);
      document.body.removeChild(mathCodeScript);
    };
  }, []);
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
        <script
          src="//code.jquery.com/jquery-3.4.1.min.js"
          integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
          crossOrigin="anonymous"
        ></script>
        <script src="//unpkg.com/rich-text-editor/dist/rich-text-editor-bundle.js"></script>
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
      </div>
    </>
  );
}
