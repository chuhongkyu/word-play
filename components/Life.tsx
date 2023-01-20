import { useEffect, use } from "react";
import styles from "styles/Home.module.scss";

type Ilife = {
  lifes?: number
}

export default function Life({lifes}:Ilife) {
  return (
    <div className={styles.life_numbers}>
        { lifes === 1 ? (<div className={styles.life_number}></div>) : null}
        { lifes === 2 ? (<>
                            <div className={styles.life_number}></div>
                            <div className={styles.life_number}></div>
                        </>) : null}
        { lifes === 3 ? (<>
                            <div className={styles.life_number}></div>
                            <div className={styles.life_number}></div>
                            <div className={styles.life_number}></div>
                        </>) : null}
    </div>
  )
}

Life.defaultProps = {
  lifes: 3
}