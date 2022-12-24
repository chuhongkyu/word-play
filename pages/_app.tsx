import "styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const resizeHandler = () => {
      document.documentElement.style.setProperty(
        "--vw",
        window.innerHeight * 0.01 + "px"
      );
      document.documentElement.style.setProperty(
        "--vh",
        window.innerHeight * 0.01 + "px"
      );
      document.documentElement.style.setProperty(
        "--app-height",
        window.innerHeight + "px"
      );
    };
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
  }, []);
  return (
    <AnimatePresence>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </AnimatePresence>
  );
}
