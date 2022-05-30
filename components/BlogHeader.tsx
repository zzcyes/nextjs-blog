import Image from "next/image";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import styles from "./BlogHeader.module.css";
// import Image from "./Image";
import OrangeEye from "./../public/orange-eye.png";
import Light from "./../public/light.png";
import Night from "./../public/ngiht.png";

interface BlogHeaderProps {
  isThemeLight: boolean;
  onChange: () => void;
  onClick: () => void;
}

const BlogHeader = ({ isThemeLight, onChange, onClick }: BlogHeaderProps) => {
  return (
    <div className={styles.blogHeader}>
      <div
        className={styles.blogTitle}
        onClick={() => {
          onClick && onClick();
        }}
      >
        我不是橙子
        <Image src={OrangeEye} alt="orange icon" width={50} height={50} />啊
      </div>
      <Toggle
        checked={isThemeLight}
        icons={{
          checked: (
            <Image src={Light} alt="light icon" width={17} height={17} />
          ),
          unchecked: (
            <Image src={Night} alt="ngiht icon" width={20} height={20} />
          ),
        }}
        onChange={() => {
          onChange && onChange();
        }}
      />
    </div>
  );
};

export default BlogHeader;
