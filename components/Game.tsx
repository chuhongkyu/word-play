import React, { useEffect, useState } from "react";
import styles from "styles/Home.module.scss";
import { $data } from "utils/word-play";

interface Iproblem {
  level: string;
  question: string;
  answer: string;
  why: string | undefined;
}

export default function Game() {
  const [problem, setProblem] = useState<any>($data);
  const [currentP, setCurrentP] = useState<Iproblem>();
  const [inputs, setInputs] = useState<string>();

  const [combo, setCombo] = useState<number>(0);
  const [checkCombo, setCheckCombo] = useState(false);

  const makeRandomProblem = () => {
    console.log("문제", problem);
    let randNum = Math.floor(Math.random() * problem.length);
    console.log("랜덤", randNum);
    setCurrentP(problem[randNum]);
  };

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
      setCheckCombo(true)
    }else{
      console.log('실패')
      makeRandomProblem()
      onReset()
      setCheckCombo(false)
      setCombo(0)
    }
  };

  const onHandleSuccess = () =>{
    if(checkCombo){
      setCombo((prev) => prev + 1)
    }else{
      setCombo(0)
    }
    makeRandomProblem()
    onReset()
  }

  return (
    <div className={styles.container_game}>
      <div className={styles.badges}>
        {currentP?.level ? <span>Level {currentP.level}</span> : null}
      </div>
      <div className={styles.problem}>문제 : {currentP?.question}</div>
      <div className={styles.__input}>
        정답 :
        <input
          name="inputs"
          placeholder="입력해주세요"
          onChange={onChange}
          value={inputs}
        />
        <button onClick={onReset}>초기화</button>
        <button onClick={onSave}>제출</button>
      </div>
      <div>
        <b>값: </b>
        {inputs}
      </div>
      <div>상태 : </div>
      <div>COMBO : {combo}</div>
    </div>
  );
}
