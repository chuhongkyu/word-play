import React, { useState } from "react";
import styles from "styles/Home.module.scss";

export default function Game($data: any) {
  const [value, setValue] = useState();
  const [inputs, setInputs] = useState({
    answer: "",
  });

  const { answer } = inputs; // 비구조화 할당을 통해 값 추출

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
