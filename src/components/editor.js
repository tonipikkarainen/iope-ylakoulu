import Head from "next/head";

export default function Editor() {
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
          <h1>ChatGPT -tarkistaja </h1>
          <h2>Demo-versio</h2>
          <div
            className="answer rich-text-editor"
            id="answer1"
            placeholder="Kirjoita kaava...ei toimi"
          ></div>
        </section>
      </div>
      <script src="/mathjax-config.js"></script>
      <script
        src="//cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
        id="MathJax-script"
      ></script>
      <script src="/math-code.js"></script>
    </>
  );
}
