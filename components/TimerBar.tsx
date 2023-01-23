import styles from "styles/Components.module.scss";
import {motion} from "framer-motion"
import { useEffect, useState } from "react";

interface ITime {
  reset: boolean;
  time: number;
}

export default function TimerBar({reset,time}:ITime) {
  const [t, setT] = useState(time)

  useEffect(() => {
    setT(time)
  }, [time])

  return (
    <motion.div className={styles.life_timer}>
      <motion.span 
        initial={{x:0 , width: "100%"}}
        animate={reset ? {width: "100%" } : {width: t + "%" }}
        className={styles.bar}></motion.span>
    </motion.div>
  )
}

TimerBar.defaultProps = {
  reset: false,
  time: 100
}