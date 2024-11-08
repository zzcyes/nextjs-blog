import type { NextPage } from "next";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import BlogHeader from "../../../components/BlogHeader";
import BlogBrief from "../../../components/BlogBrief";
import BlogArticleTitle from "../../../components/BlogArticleTitle";
import styles from "./[slug].module.css";

import moment from "moment";
// @ts-ignore
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import remarkGfm from "remark-gfm"; // markdown 对表格/删除线/脚注等的支持
// @ts-ignore
import MarkNav from "markdown-navbar"; // markdown 目录
import { formatDate, getCoffe } from "../../../utils/common";
import OmsViewMarkdown from "../../../components/OmsViewMarkdown";
import { GlobalContext } from "../../../pages/_app";
import { useContext } from "react";

interface PostTemplateProps {
  content?: string;
  data?: any;
}

const PostTemplate: NextPage = ({ content, data }: PostTemplateProps) => {
  const frontmatter = data;
  const { query } = useRouter();
  const words = Number(query.words);
  const birthtimeMs = Number(query.birthtimeMs);
  const { num: reading, coffe } = getCoffe(words);
  const date =
    frontmatter.date ??
    moment(formatDate(birthtimeMs)).format("YYYY年MM月DD日 HH:mm:ss");
  const markdownContent: string = content || "";

  const { theme, toggleTheme } = useContext(GlobalContext); // 获取当前主题状态
  const isThemeLight = theme === "light";

  return (
    <>
      <Head>
        <title>{frontmatter.title} | 钟子晨的博客</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.homePageContainer}>
        <div className={styles.leftSide}>
          <div className={styles.leftSideContent}>
            {markdownContent && (
              <MarkNav
                className={styles.tocList}
                // className="toc-list"
                source={markdownContent}
                ordered={true}
              />
            )}
          </div>
        </div>

        <div className={styles.homePage}>
          <main className={styles.main}>
            <BlogHeader
              isThemeLight={isThemeLight}
              onChange={toggleTheme}
              onClick={() => {
                Router.push({ pathname: `/blogs` });
              }}
            />
            <BlogArticleTitle
              title={frontmatter.title}
              reading={reading}
              coffe={coffe}
              date={date}
            />
            <div className={`markdown-body ${styles.markdownContent}`}>
              {markdownContent && (
                <OmsViewMarkdown
                  textContent={markdownContent}
                  darkMode={!isThemeLight}
                ></OmsViewMarkdown>
                // <ReactMarkdown remarkPlugins={[remarkGfm]}>
                //   {markdownContent}
                // </ReactMarkdown>
              )}
            </div>

            <div className={styles.discussions}>
              使用
              <a
                href="https://github.com/zzcyes/zzcyes-blog/discussions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discussions
              </a>
              讨论 <span className={styles.dot}> • </span>在
              <a
                href="https://github.com/zzcyes/zzcyes-blog"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              上编辑
              {/* <span className={styles.dot}> • </span> 复制{" "}
              <a
                href="mailto:zhongzichen1997@163.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                文章链接{" "}
              </a>
              分享 */}
            </div>
            <BlogBrief />
          </main>
        </div>
        <div className={styles.rightSide}></div>
      </div>
    </>
  );
};

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query;
  const content: any = await import(`../../../content/${slug}.md`);
  // Parse .md data through `matter`
  const data = matter(content.default);
  // Pass data to our component props
  return { ...data };
  return { slug };
};

export default PostTemplate;
