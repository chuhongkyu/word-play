import { useEffect, useState } from "react";
import styles from "@/styles/Detail.module.scss";

interface ICountProps {
    onClose: () => void
}

const CountDownModal = ({ onClose }:ICountProps) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (countdown === 0) {
            onClose();
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, onClose]);

    return(
        <section className={`${styles.modalContainer}`}>
            <div className={`${styles.modal}`}>
                <div className={`${styles.timer}`}>
                    <p>{countdown}</p>
                    <span></span>
                </div>
                <h4 className="heading-4">The test will begin soon!</h4>
                <b>There is a time limit of 50 seconds per question.</b>
                <p className={`${styles.caption} body-1`}>
                    <span>Hint</span>
                    You can hear the answer sentence
                </p>
            </div>

            <div className={`${styles.blur}`}></div>
        </section>
    )
}

export default CountDownModal