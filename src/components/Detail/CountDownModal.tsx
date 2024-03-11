import { useEffect, useState } from "react";
import styles from "@/styles/Detail.module.scss";

interface ICountProps {
    onClose: () => void
}

const CountDownModal = ({ onClose }:ICountProps) => {
    const [countdown, setCountdown] = useState(3);

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
                <h4 className="heading-4">곧 테스트가 시작됩니다!</h4>
                <b>
                    총 99문제가 출제됩니다.<br/>
                    1문제 당 45초의 시간 제한이 있습니다.
                </b>
                <p className={`${styles.caption} body-1`}>
                    <span>Hint</span>
                    정답 문장을 들어볼 수 있어요
                </p>
            </div>

            <div className={`${styles.blur}`}></div>
        </section>
    )
}

export default CountDownModal