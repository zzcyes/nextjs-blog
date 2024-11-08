import "../styles/variable.css";
import "../styles/globals.css";
import "../styles/github-markdown.css";
import "../styles/navbar.css";

import React from "react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
