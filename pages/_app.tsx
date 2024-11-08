import "../styles/variable.css";
import "../styles/globals.css";
import "../styles/github-markdown.css";
import "../styles/navbar.css";

import React, { createContext, useState, useEffect } from "react";
import type { AppProps } from "next/app";

const initTheme = "night";

export const GlobalContext = createContext({
  theme: initTheme, // 初始主题
  toggleTheme: () => {}, // 默认的 dispatch 函数
} as {
  theme: "light" | "night";
  toggleTheme: (theme?: "light" | "night") => void;
});

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<"light" | "night">(initTheme);

  useEffect(() => {
    const theme = localStorage.getItem("ZZCYES_BLOG_THEME") as
      | "light"
      | "night";
    setTheme(theme ?? initTheme);
  }, []);

  const toggleTheme = (newTheme?: "light" | "night") => {
    const themeToSet = newTheme || (theme === "light" ? "night" : "light");
    setTheme(themeToSet); // 更新当前主题
    localStorage.setItem("ZZCYES_BLOG_THEME", themeToSet); // 保存到 localStorage
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.className = theme;
  }, [theme]);

  return (
    <GlobalContext.Provider value={{ theme, toggleTheme }}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}

export default MyApp;
