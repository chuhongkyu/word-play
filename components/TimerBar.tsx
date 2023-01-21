import styles from "styles/Components.module.scss";
import {motion} from "framer-motion"

interface ITime {
  reset: string;
  time: number;
}

export default function TimerBar({reset,time}:ITime) {
  return (
    <motion.div className={styles.life_timer}>
      <motion.span 
        initial={{x:0}}
        animate={{width: time + "%" }}
        className={styles.bar}></motion.span>
    </motion.div>
  )
}

TimerBar.defaultProps = {
  reset: 'RESET',
  time: 100
}