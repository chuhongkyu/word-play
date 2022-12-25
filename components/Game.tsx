import React, { useEffect, useState } from "react";
import styles from "styles/Home.module.scss";
import { $data } from "utils/word-play";

interface Iproblem {
  question: string;
  answer: string;
  why: string | undefined;
}

export default function Game() {
  const [problem, setProblem] = useState<any>($data);
  const [currentP, setCurrentP] = useState<Iproblem>();
  const [inputs, setInputs] = useState({
    answer: "",
  });

  const { answer } = inputs; // 비구조화 할당을 통해 값 추출

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
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      answer: "",
    });
  };

  const onSave = () => {};

  return (
    <div className={styles.container_game}>
      <div>문제 : {currentP?.question}</div>
      <input
        name="answer"
        placeholder="정답"
        onChange={onChange}
        value={answer}
      />
      <button onClick={onReset}>초기화</button>
      <button onSubmit={onSave}>제출</button>
      <div>
        <b>값: </b>
        {answer}
      </div>
      <div>상태 : </div>
    </div>
  );
}
