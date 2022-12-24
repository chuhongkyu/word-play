import HeadComponent from "components/Head";
import { useState } from "react";
import { $data } from "utils/word-play";
import styles from "styles/Home.module.scss";

export default function Home() {
  const [data, setData] = useState($data);
  return (
    <>
      <HeadComponent />
      <div id={styles.main}>
        <h1>어서오세요. 환영합니다.</h1>
      </div>
    </>
  );
}
