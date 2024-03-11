import { QuizProvider } from "@/components/QuizProvider";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QuizProvider>
      <Component {...pageProps} />
    </QuizProvider>
  )
}
