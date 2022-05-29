import styles from "./BlogList.module.css";
import moment from "moment";

export interface IBlog {
  slug: string;
  title: string;
  date: string;
  atimeMs: number;
  mtimeMs: number;
  ctimeMs: number;
  birthtimeMs: number;
  reading?: number;
  words: number;
}

export interface IBlogListProps {
  blogs: IBlog[];
  onClick: (pauload: IBlog) => void;
}

const formatDate = (time: number) => {
  return new Date(time + 28800000)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
};

const getCreateTime = (birthtimeMs: number) => {
  return moment(formatDate(birthtimeMs)).format("YYYY年MM月DD日 HH:mm:ss");
};

const BlogList = ({ blogs, onClick }: IBlogListProps) => {
  return (
    <div className={styles.mainArticleTitle}>
      <ul className={styles.articleList}>
        {blogs?.map((item: IBlog) => {
          return (
            <li
              className={styles.articleItem}
              key={item.slug}
              onClick={() => {
                onClick && onClick(item);
              }}
            >
              <span className={styles.articleTitle}>{item.title}</span>
              <time className={styles.articleTime}>
                {item.date ? item.date : getCreateTime(item.birthtimeMs)}
              </time>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BlogList;
