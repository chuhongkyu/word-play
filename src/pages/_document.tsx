import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta name="google-site-verification" content="mtYE_cYSNMHVF7KJPjly8GIJXgXfrbCG67BzEi3OY3c" />
        <meta name="naver-site-verification" content="dc8ef477fbdf278131748aa9fdf60b79da27dbd3" />
        <Script 
          id="adsbygoogle-init"
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1979490362657562" 
          crossOrigin="anonymous"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
