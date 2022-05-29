import styles from "./BlogArticleTitle.module.css";

export interface IBlogActicleTitle {
  title: string;
  date?: string;
  reading?: string | number;
  coffe?: string;
}

const BlogArticleTitle = ({
  title,
  date,
  reading,
  coffe,
}: IBlogActicleTitle) => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.title}>{title}</div>
      <p className={styles.brief}>
        {date ?? "?"} <span className={styles.dot}>•</span>{" "}
        {coffe ? coffe : "☕️"}
        {reading ?? 6} min read
      </p>
    </div>
  );
};

export default BlogArticleTitle;
