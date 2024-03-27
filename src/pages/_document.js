import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="//unpkg.com/@digabi/mathquill/build/mathquill.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="//unpkg.com/rich-text-editor/dist/rich-text-editor.css"
        />
        <link rel="stylesheet" type="text/css" href="/styles.css" />
        <script
          src="//code.jquery.com/jquery-3.4.1.min.js"
          integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
          crossOrigin="anonymous"
        ></script>
        <script src="//unpkg.com/rich-text-editor/dist/rich-text-editor-bundle.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
