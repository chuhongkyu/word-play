import { useEffect, useState } from "react";
import styles from "@/styles/Detail.module.scss";

interface ICountProps {
    isStart: boolean
    onClose: () => void
}

const CountdownTimer = ({isStart, onClose }:ICountProps) => {
    const [countdown, setCountdown] = useState(50);

    useEffect(() => {
        if (!isStart) return;

        if (countdown === 0) {
            onClose()
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, isStart]);

    return(
        <div className={`${styles.timerBox}`}>
            <p className="body-2">Remaining Time<span>{countdown.toString().padStart(2, '0')}second</span></p>
        </div>
    )
}

export default CountdownTimer