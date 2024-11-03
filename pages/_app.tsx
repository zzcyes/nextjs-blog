import "../styles/variable.css";
import "../styles/globals.css";
import "../styles/github-markdown.css";
import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";

const useLoadFontFace = ({
  urls,
}: {
  urls: Array<{
    url: string;
    fontFamily: string;
  }>;
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      const fontPromises = urls.map(({ url, fontFamily }) => {
        const font = new FontFace(fontFamily, `url(${url})`);
        return font.load().then(() => {
          document.fonts.add(font);
        });
      });
      await Promise.all(fontPromises);
      setFontsLoaded(true);
    };
    loadFonts();
  }, [urls]);

  return {
    fontsLoaded,
  };
};

function MyApp({ Component, pageProps }: AppProps) {
  const { fontsLoaded } = useLoadFontFace({
    urls: [
      {
        fontFamily: "CuteAlphabet",
        url: "/font-split/CuteAlphabet.woff2",
      },
      {
        fontFamily: "PuHuiTi",
        url: "/font-split/Alibaba-PuHuiTi-Regular.ttf",
      },
      {
        fontFamily: "Handdrawn",
        url: "/font-split/Handdrawn.ttf",
      },
    ],
  });
  if (!fontsLoaded) {
    return <>Loading...</>;
  }
  return <Component {...pageProps} />;
}

export default MyApp;
