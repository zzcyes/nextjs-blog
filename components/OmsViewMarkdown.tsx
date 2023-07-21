import React from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  coyWithoutShadows,
  darcula,
  atomDark,
  atomLight,
  oneDark,
  oneLight,
  // @ts-ignore
} from "react-syntax-highlighter/dist/cjs/styles/prism";

// darcula webstorm
// vscDarkPlus vscode暗色主题

type tProps = {
  textContent: string;
  darkMode?: boolean; // markdown文本
};

const them = {
  dark: atomDark,
  light: atomLight,
};
// const them = {
//   dark: vscDarkPlus,
//   light: coyWithoutShadows,
// };

const OmsViewMarkdown = (props: tProps) => {
  const { textContent, darkMode } = props;
  if (typeof darkMode === "undefined") {
    them.light = atomLight;
  }
  if (typeof darkMode === "boolean") {
    them.light = atomLight;
  }
  return (
    <ReactMarkdown
      components={{
        // @ts-ignore
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              showLineNumbers={true}
              style={darkMode ? them.dark : them.light}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {textContent}
    </ReactMarkdown>
  );
};

export default OmsViewMarkdown;
