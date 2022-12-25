import { useEffect, useRef, useState } from "react";
import styles from "styles/Home.module.scss";
import { useRecoilState } from "recoil";
import { introState } from "utils/atom";

const tutorial = [
  "어서오세요. 환영합니다.",
  "여기는 말장난 놀이터 입니다.",
  "시작해 봅시다.",
];

let copyArr: [] = [];

export default function Information() {
  const [end, setEnd] = useRecoilState(introState);

  const [order, orderText] = useState<string[]>([]);
  const [text, setText] = useState<any>();
  const [check, setCheck] = useState<boolean>(false);
  const [blink, setBlink] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);

  const orderNumber = () => {
    if (number > tutorial.length - 1) return setEnd(!end);
    orderText(tutorial[number].split(""));
  };

  const makeText = (newArr: any) => {
    if (newArr.length > 0) {
      copyArr += newArr.shift();
      setText(copyArr);
      setTimeout(() => makeText(newArr), 70);
    } else {
      copyArr = [];
      setCheck(!check);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setText([]);
      setNumber((prev) => prev + 1);
      orderNumber();
    }, 1000);

    return () => clearTimeout(timer);
  }, [check]);

  useEffect(() => {
    const showBlink = setTimeout(() => setBlink(!blink), 600);
    return () => clearTimeout(showBlink);
  }, [blink]);

  useEffect(() => {
    makeText(order);
  }, [order]);

  return (
    <>
      {end ? null : (
        <div className={styles.container_texts}>
          <h1 className={styles.text}>
            {text}
            {blink ? "|" : null}
          </h1>
        </div>
      )}
    </>
  );
}
