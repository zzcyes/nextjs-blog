// import Image from "next/image";
import styles from "./BlogBrief.module.css";
import Image from "./Image";

const BlogBrief = () => {
  return (
    <div className={styles.briefWrap}>
      <div>
        <Image
          className={styles.avatars}
          src="/avatars.jpg"
          alt="avatars icon"
          width={60}
          height={60}
        />
      </div>

      <div className={styles.brief}>
        <div>
          Personal blog by{" "}
          <a
            href="https://www.zzcyes.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zhong Zichen
          </a>
          .
        </div>
        {/* <div>I explain with words and code.</div> */}
        <div>Talk is cheap. Show me the code.</div>
      </div>
    </div>
  );
};

export default BlogBrief;
