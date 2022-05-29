import React, { useState, useEffect } from "react";

const useBlogTheme = (defaultTheme: string = "night") => {
  let localTheme: string = "";

  if (typeof window !== "undefined") {
    localTheme = window.localStorage.getItem("ZZCYES_BLOG_THEME") || "";
  }

  const [theme, setTheme] = useState<string>(localTheme || defaultTheme);

  const toggleTheme = () => {
    if (typeof window !== "undefined") {
      setTheme((prev) => (prev === "light" ? "night" : "light"));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ZZCYES_BLOG_THEME", theme);
    }
  }, [theme]);

  return {
    theme,
    toggleTheme,
  };
};

export default useBlogTheme;
