import React, { useEffect, useReducer, useState } from "react";
import styles from "styles/Home.module.scss";
import {motion} from "framer-motion"
import { $data } from "utils/word-play";
import Life from "components/Life";
import TimerBar from "components/TimerBar"
import { useRecoilState } from "recoil";

interface Iproblem {
  level: string;
  question: string;
  answer: string;
  why: string | undefined;
}

export default function Game() {
  const [problem, setProblem] = useState<any>($data);
  const [game, setGame] = useState({
    game: true,
    score : 0,
    combo : 0,
    gameState : 'GAME_NORMAL',
  })

  const [currentP, setCurrentP] = useState<Iproblem>();
  const [inputs, setInputs] = useState<string>();
  //목숨
  const [life, setLife] = useState<number>(3);
  //클리어
  const [clear,setClear] = useState(false);
  //모션
  const [error, setError] = useState<boolean>(false);
  const [comboAni, setComboAni] = useState(false);
  const [successAni, setSuccessAni] = useState(false);
  //타이머
  const [timerBar, setTimerBar] = useState(100);
  
  useEffect(() => {
    const timer = setTimeout(()=>{ setTimerBar(prev => prev - 1)}, 200)
    if(timerBar <= 0){
      dispatch({ type: 'FAIL' });
      setTimerBar(105)
    }
  }, [timerBar])

  const makeRandomProblem = () => {
    let randNum = Math.floor(Math.random() * problem.length);
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
    setClear(false)
  };

  const onHandleSuccess = () =>{
    if(game.combo != 0){
      setGame((prevState) => ({...prevState,  
        score : game.score + 1,
        combo : game.combo + 1,
      }))
      setComboAni(true)
      setTimeout(()=> setComboAni(false), 2100)
    }else{
      setGame((prevState) => ({...prevState,  
        score : game.score + (game.combo * 2),
        combo : game.combo + 1,
      }))
    }
    setSuccessAni(true)
    setTimeout(()=> onHandleAni(), 1500)
    
    function onHandleAni(){
      setSuccessAni(false)
      makeRandomProblem()
      onReset()
    }
  }

  const [score, dispatch] = useReducer(reducer, 0);

  function reducer (score:number, action:{type: string;}) {
    switch (action.type) {
      case 'SUCCESS':
        console.log('정답')
        onHandleSuccess()
        return score

      case 'ERROR':
        setError(true)
        return score

      case 'FAIL':
        if(life < 1){
          makeRandomProblem()
          onReset()
          setGame((prevState) => ({...prevState,  
            score : 0,
            combo : 0,
            gameState : 'GAME_NORMAL',
          }))
          setLife(3)
        }else{
          setLife(prev => prev - 1 )
        }
        return score
      default:
        return score
    }
  }

  const onSave = () => {
    if(inputs == currentP?.answer){
      dispatch({ type: 'SUCCESS' });
    }else if(inputs == null|| inputs == ""){
      dispatch({ type: 'ERROR' });
    }else{
      dispatch({ type: 'FAIL' });
    }
  };

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
        {currentP?.level ? <span className={styles.level}>Level&nbsp;&nbsp;{currentP.level}</span> : null}
      </div>
      <motion.div initial={{y:0}} animate={{y:[20,0], opacity:[0, 1]}} className={styles.problem}>문제 : {currentP?.question}</motion.div>
      <div className={styles.hint}>
        Hint :
        <div className={styles.hint_hidden}>{currentP?.answer}</div>
        <div className={styles.hint_length}>{currentP?.answer.length} 글자</div>
      </div>
      <Life lifes={life}></Life>
      {/* <div>
        <b>값: </b>
        {inputs}
      </div> */}
      {/* <div>상태 : </div> */}
      <motion.div
        initial={{opacity:0}}
        animate={comboAni ? {opacity:[0, 1, ], y: [ 50, 0,]} : {opacity: 0, y: 0}}
        transition={{type: "spring", duration: 0.5}}
        className={styles.combo}><b>{game.combo}</b>COMBO
      </motion.div>
      <div className={styles.container_score}>
        <motion.b initial={{y:0}} animate={{y:[-5, 0]}}>{game.score}</motion.b><p>점</p>
      </div>
      <TimerBar time={timerBar}></TimerBar>
      <motion.div 
        className={styles.__input}
        animate={successAni ?{backgroundColor:"#C3EE41"} : {}}
        transition={{duration:0.5}}>
        정답 :
        {successAni ? <div className={styles.__answer}>{currentP?.answer}</div> : 
        <motion.input
          name="inputs"
          placeholder="입력해주세요"
          onChange={onChange}
          onKeyUp={()=>{setClear(true)}}
          value={inputs}
          animate={error ? {border : "1px solid red"}: {}}
        />}
        {clear ? <button className={styles.reset} onClick={onReset}></button> : null}
        <button className={styles.submit} onClick={onSave}>제출</button>    
      </motion.div>
    </motion.div>
  );
}
