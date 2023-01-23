import HeadComponent from "components/Head";
import { useEffect } from "react";
import { $data } from "utils/word-play";
import styles from "styles/Home.module.scss";
import Information from "components/Information";
import { useRecoilState } from "recoil";
import { introState } from "utils/atom";
import Game from "components/Game";

export default function Home() {
  const [intro, setIntro] = useRecoilState(introState);

  useEffect(()=>{
    // localStorage의 데이터를 꺼낸다.
    const local_intro = localStorage.getItem('intro');

    // 최초 접속시 localStorage에 데이터가 없을 경우 새로운 배열을 생성한다. 
    if(local_intro){
      setIntro(true)
    }else{
      console.log('없어')
    }
  },[]);

  return (
    <>
      <HeadComponent />
      <div id={styles.main}>{intro ? <Game /> : <Information />}</div>
    </>
  );
}
