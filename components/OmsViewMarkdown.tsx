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
import remarkGfm from "remark-gfm"; // markdown 对表格/删除线/脚注等的支持
import Mermaid from './Mermaid';

// darcula webstorm
// vscDarkPlus vscode暗色主题

type tProps = {
  textContent: string;
  darkMode?: boolean; // markdown文本
};

const them = {
  dark: atomDark,
  light: atomDark,
};
// const them = {
//   dark: vscDarkPlus,
//   light: coyWithoutShadows,
// };

const OmsViewMarkdown = (props: tProps) => {
  const { textContent, darkMode } = props;
  // if (typeof darkMode === "undefined") {
  //   them.light = atomLight;
  // }
  // if (typeof darkMode === "boolean") {
  //   them.light = atomLight;
  // }
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // @ts-ignore
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeContent = String(children).replace(/\n$/, '');
          if (!inline && match) {
            const language = match[1];
            if (language === 'mermaid') {
              return <Mermaid chart={codeContent} />;
            } else {
              return (
                <SyntaxHighlighter
                  showLineNumbers
                  style={darkMode ? them.dark : them.light}
                  language={language}
                  PreTag="div"
                  {...props}
                >
                  {codeContent}
                </SyntaxHighlighter>
              );
            }
          } else {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        },
      }}
    >
      {textContent}
    </ReactMarkdown>
  );
};

export default OmsViewMarkdown;
