import styles from "./BlogFooter.module.css";
import Image from "next/image";
// import Image from "./Image";
import Email from "./../public/email.png";

const BlogFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.icon}>
        <a
          href="mailto:zhongzichen1997@163.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={Email} alt="avatars icon" width={30} height={30} />
        </a>
      </div>
      <a
        className={styles.link}
        href="https://www.cnblogs.com/zzcyeah/"
        target="_blank"
        rel="noopener noreferrer"
      >
        cnblogs
      </a>{" "}
      •{" "}
      <a
        className={styles.link}
        href="https://github.com/zzcyes"
        target="_blank"
        rel="noopener noreferrer"
      >
        github{" "}
      </a>{" "}
      •{" "}
      <a
        className={styles.link}
        href="mailto:zhongzichen1997@163.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        yuque
      </a>
    </footer>
  );
};

export default BlogFooter;
