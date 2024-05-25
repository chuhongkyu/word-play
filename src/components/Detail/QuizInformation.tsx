import { IDetailData } from "@/interface/listDetail";
import { useQuiz } from "@/utils/useQuiz";
import styles from "@/styles/Detail.module.scss";
import Image from "next/image";

export default function QuizInformation({data}:IDetailData){
    const { dispatch } = useQuiz()
    const onStart = () => {
        dispatch({ type: 'SET_QUIZ_STATE', payload: "READY" });
    }

    return(
        <section className={styles["quiz-information"]}>
            <h5 className={`${styles.title} heading-4`}>퀴즈 설명</h5>
            <div className={styles.content}>
                <small className={`${styles.caption} body-2`}>퀴즈 타입 
                {data?.testType === "list" && <b className={styles.mark}> list</b>}
                {data?.testType === "select" && <b className={styles.mark}> select</b>}
                </small>
                <article className={styles.article}>
                    {data?.testType === "list" &&
                    <span className={styles["content-img"]}>
                        <Image placeholder="empty" priority fill sizes="(max-width: 768px) 100%, 100%" src={"/assets/detail/howToPlay_list.jpg"} alt="howToPlay"/>
                    </span>}
                    {data?.testType === "select" &&
                    <span className={styles["content-img"]}>
                        <Image placeholder="empty" priority fill sizes="(max-width: 768px) 100%, 100%" src={"/assets/detail/howToPlay_select.jpg"} alt="howToPlay"/>
                    </span>}
                    {data?.testType === "list" &&
                    <ul className={styles.order}>
                        <li className="border-2">1. 정답 단어를 클릭한다.</li>
                        <li className="border-2">2. 남은시간 주의</li>
                        <li className="border-2">3. 정답 제출하기</li>
                    </ul>
                    }
                    {data?.testType === "select" &&
                    <ul className={styles.order}>
                        <li className="border-2">1. 정답 단어를 클릭한다.<br/><p>(한번 더 클릭시 정답에서 제외)</p></li>
                        <li className="border-2">2. 정답 단어 위치를 드래그로 바꿀 수 있다.</li>
                        <li className="border-2">3. 문제 힌트를 소리로 들을 수 있다.</li>
                        <li className="border-2">4. 남은시간 주의</li>
                        <li className="border-2">5. 정답 제출하기</li>
                    </ul>
                    }
                </article>
            </div>
            <div className="btn-container">
                <button className="btn" onClick={onStart}>시작</button>
            </div>
        </section>
    )
}