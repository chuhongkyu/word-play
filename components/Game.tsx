import React, { useEffect, useState } from "react";
import styles from "styles/Home.module.scss";
import {motion} from "framer-motion"
import { $data } from "utils/word-play";
import { useRecoilState } from "recoil";
import { scoreNumberState } from "utils/atom";

interface Iproblem {
  level: string;
  question: string;
  answer: string;
  why: string | undefined;
}

export default function Game() {
  const [score, setScore] = useRecoilState(scoreNumberState)
  const [problem, setProblem] = useState<any>($data);
  const [currentP, setCurrentP] = useState<Iproblem>();
  const [inputs, setInputs] = useState<string>();

  const [error, setError] = useState<boolean>(false);

  const [combo, setCombo] = useState<number>(1);
  const [checkCombo, setCheckCombo] = useState(false);
  const [comboAni, setComboAni] = useState(false);

  const makeRandomProblem = () => {
    let randNum = Math.floor(Math.random() * problem.length);
    setCurrentP(problem[randNum]);
  };

  const onHandleScore = () =>{
    if(checkCombo){
      setScore((prev)=> prev + (combo * 2))
    }else{
      setScore((prev)=> prev + 1)
    }
  }

  useEffect(() => {
    setProblem($data);
    makeRandomProblem();
  }, [$data]);

  useEffect(() => {
    makeRandomProblem();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(e.target.value);
  };

  const onReset = () => {
    setInputs('');
  };

  const onSave = () => {
    if(inputs == currentP?.answer){
      console.log('정답')
      onHandleSuccess()
      onHandleScore()
      setCheckCombo(true)
    }else if(inputs == null|| inputs == ""){
      setError(true)
    }
    else{
      console.log('실패')
      makeRandomProblem()
      onReset()
      setCheckCombo(false)
      setCombo(1)
    }
  };

  const onHandleSuccess = () =>{
    if(checkCombo){
      setCombo((prev) => prev + 1)
      setComboAni(true)
      setTimeout(()=> setComboAni(false), 2100)
    }else{
      setCombo(1)
    }
    makeRandomProblem()
    onReset()
  }

  useEffect(()=>{
    console.log("정답:",currentP?.answer)
  },[currentP])

  useEffect(()=>{
    const timer = setTimeout(()=> setError(false), 2000)
    return ()=> clearTimeout(timer)
  },[error])

  return (
    <motion.div animate={{y:[20,0], opacity:[0,1]}} className={styles.container_game}>
      <div className={styles.badges}>
        {currentP?.level ? <span className={styles.level}>Level {currentP.level}</span> : null}
      </div>
      <div className={styles.problem}>문제 : {currentP?.question}</div>
      <div className={styles.hint}>
        힌트 :
        <div className={styles.hint_hidden}>{currentP?.answer}</div>
        <div className={styles.hint_length}>{currentP?.answer.length} 글자</div>
      </div>
      <div className={styles.__input}>
        정답 :
        <motion.input
          name="inputs"
          placeholder="입력해주세요"
          onChange={onChange}
          value={inputs}
          animate={error ? {border : "1px solid red"}: {}}
        />
        <div className={styles.btns}>
          <button className={styles.reset} onClick={onReset}>초기화</button>
          <button className={styles.submit} onClick={onSave}>제출</button>
        </div>
      </div>
      <div>
        <b>값: </b>
        {inputs}
      </div>
      <div>상태 : </div>
      <motion.div
        initial={{opacity:0}}
        animate={comboAni ? {opacity:[0,1,0], scale:[0,1.2,0]}: {opacity: 0, scale: 1}}
        transition={{type:"spring", duration: 1.5}}
        className={styles.combo}>COMBO<b>{combo}</b>
      </motion.div>
      <div>점수 : {score}</div>
    </motion.div>
  );
}
