import styles from "./BlogArticleTitle.module.css";

export interface IBlogActicleTitle {
  title: string;
  date?: string;
  reading?: string | number;
  coffee?: string;
}

const BlogArticleTitle = ({
  title,
  date,
  reading,
  coffee,
}: IBlogActicleTitle) => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.brief}>
        {date ?? "?"} <span className={styles.dot}>•</span>{" "}
        {coffee ? coffee : "☕️"} &nbsp;
        {reading ?? 6} min read
      </div>
    </div>
  );
};

export default BlogArticleTitle;
