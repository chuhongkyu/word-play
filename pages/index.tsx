import HeadComponent from "components/Head";
import { useEffect, useState } from "react";
import { $data } from "utils/word-play";
import styles from "styles/Home.module.scss";
import Information from "components/Information";

export default function Home() {
  const [data, setData] = useState($data);

  return (
    <>
      <HeadComponent />
      <div id={styles.main}>
        <Information />
      </div>
    </>
  );
}
