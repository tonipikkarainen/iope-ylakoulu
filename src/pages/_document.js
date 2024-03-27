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
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="//cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" />
      </body>
    </Html>
  );
}
