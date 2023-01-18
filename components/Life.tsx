import { useEffect, useState } from "react";
import styles from "styles/Home.module.scss";

export default function Life(life:number) {
 const [state, setstate] = useState<number>(3)

 useEffect(() => {
    setstate(life)
 }, [life])

  return (
    <div className={styles.life_numbers}>
        {state === 1 ? (<div className={styles.life_number}></div>) : null}
        {state === 2 ? (<>
                            <div className={styles.life_number}></div>
                            <div className={styles.life_number}></div>
                        </>) : null}
        {state === 3 ? (<>
                            <div className={styles.life_number}></div>
                            <div className={styles.life_number}></div>
                            <div className={styles.life_number}></div>
                        </>) : null}
    </div>
  )
}