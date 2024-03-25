import { useEffect, useState } from "react";
import styles from "@/styles/Detail.module.scss";

interface ICountProps {
    type: string;
    onClose: () => void
}

const CountDownModal = ({type, onClose }:ICountProps) => {
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
                <h4 className="heading-4">테스트가 곧 시작됩니다!</h4>
                <b>질문 당 50초의 제한 시간이 있습니다.</b>
                {type === "select" ? 
                    <p className={`${styles.caption} body-1`}>
                        <span>Hint</span>
                        문제에 대한 설명을 들을 수 있습니다.
                    </p> : null
                }
            </div>

            <div className={`${styles.blur}`}></div>
        </section>
    )
}

export default CountDownModal