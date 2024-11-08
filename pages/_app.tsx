import "../styles/variable.css";
import "../styles/globals.css";
import "../styles/github-markdown.css";
import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";

const useLoadFontFace = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Listen for the font loading status
    const checkFonts = async () => {
      await document.fonts.ready; // This ensures all fonts are loaded
      setFontsLoaded(true);
    };

    checkFonts();
  }, []);

  return [fontsLoaded];
};

function MyApp({ Component, pageProps }: AppProps) {
  const [fontsLoaded] = useLoadFontFace();

  if (!fontsLoaded) {
    return <>Loading...</>;
  }
  return <Component {...pageProps} />;
}

export default MyApp;
