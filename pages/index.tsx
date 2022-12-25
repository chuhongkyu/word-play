import HeadComponent from "components/Head";
import { useEffect, useState } from "react";
import { $data } from "utils/word-play";
import styles from "styles/Home.module.scss";
import Information from "components/Information";
import { useRecoilState } from "recoil";
import { introState } from "utils/atom";
import Game from "components/Game";

export default function Home() {
  const [intro, setIntro] = useRecoilState(introState);

  return (
    <>
      <HeadComponent />
      <div id={styles.main}>{intro ? <Game /> : <Information />}</div>
    </>
  );
}
