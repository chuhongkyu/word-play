import { IDetailData } from "@/interface/listDetail";
import styles from "@/styles/Detail.module.scss";
import { useQuiz } from "@/utils/useQuiz";
import { useEffect, useState } from "react";
import Stamp from "./Stamp";
import Link from "next/link";

interface IType {
    records: string[]; 
    success: number;
    total: number;
    resultState: {
        type: string
        text: string
        color: string;
        img: string[];
    } 
    tryCount: number;
}


const QuizResult = ({data}:IDetailData) => {
    const { state, dispatch } = useQuiz()
    const [stamp, setStamp] = useState<IType>({ 
        records: [''], 
        success: 0, total: 0, 
        resultState: {
            type: "Good",
            text: "좋아요. 멋진 점수에요!",
            color :"#00D6C9",
            img : ["/assets/detail/result/testresult-good1.png"]
        },
        tryCount: 1
    });

    const [random, setRandom] = useState<number>(0)

    useEffect(()=>{
        const index = state.saveData.findIndex(item => item.id === data?.id);
        const records = state.saveData[index]?.record
        const failCount = records?.filter(item => item === "fail").length;
        const successCount = records?.filter(item => item === "success").length;
        const tryCount = state.saveData[index]?.try
        let resultState
        if(failCount  === 0){
            resultState = {
                type: "Perfect",
                text: "완벽. 모두 맞혔어요!",
                color : "#0DB6FF",
                img : [
                    "/assets/detail/result/testresult-perfect1.png",
                    "/assets/detail/result/testresult-perfect2.png",
                    "/assets/detail/result/testresult-perfect3.png",
                ]
            }
        }else if(failCount  <= 2){
            resultState = {
                type: "Good",
                text: "좋아요. 멋진 점수에요!",
                color :"#00D6C9",
                img : [
                    "/assets/detail/result/testresult-good1.png",
                    "/assets/detail/result/testresult-good2.png",
                    "/assets/detail/result/testresult-good3.png"
                ]
            }
        }
        else{
            resultState = {
                type: "Good",
                text: "아쉬워요.\n다음에는 더 잘할 수 있을 거예요!",
                color :"#FF5F5F",
                img: ["/assets/detail/result/testresult-fail.png"]
            }
        }

        setStamp({
            records: records,
            success: successCount,
            total: records?.length,
            resultState: resultState,
            tryCount: tryCount
        });

    }, [state.saveData, data?.id]); 

    const onHandleReTry = () => {
        dispatch({ 
            type: 'RESET_QUIZ', 
            payload: { 
                id: data.id, 
            }
        })
        dispatch({ type: 'SET_CURRENT', payload: 0})
        dispatch({ type: "SET_SAVE_DATA"});
        dispatch({ type: 'SET_QUIZ_STATE', payload: "START" });
    } 

    const randomNumber = (n:number) => {
        return Math.floor(Math.random() * n)
    }

    useEffect(()=>{
        const n = stamp?.resultState.img.length
        setRandom(randomNumber(n))
    },[stamp])

    return(
        <section className={styles.resultContainer}>
            <div className={styles.resultWrapper}>
                <img src={stamp?.resultState.img[random]} alt="state"/>
                <div className={`${styles.resultText} heading-6`}>
                    {stamp?.resultState.text}
                </div>
                <div className={`${styles.resultSheet}`}>
                    {stamp?.records?.map((el, i)=>{
                        return(
                            <Stamp key={i + "StampKEY"} color={stamp?.resultState?.color} state={el}/>
                        )
                    })}
                </div>
                <div className={`${styles.resultScroe}`} style={{color: stamp?.resultState.color}}>
                    {stamp?.success === stamp?.total ? 
                    <p>만점</p>:
                    <p>{stamp?.success}/{stamp?.total}</p>
                    }
                </div>
                {stamp?.tryCount > 1 && <div className={styles.resultTryCount} style={{color: stamp?.resultState.color}}>{stamp?.tryCount}번째 시도</div> }
            </div>
            <div className={`${styles.detailBtn} btn-container`}>
                <div className={styles.detailBtnGroup}>
                    {stamp?.resultState.type === "Perfect" ? 
                    <>
                        <Link href={"/"} className="btn">확인</Link>
                    </>:
                    <>
                        <button className="btn white" onClick={onHandleReTry}>다시 풀어보기</button>
                        <Link href={"/"} className="btn">확인</Link>
                    </>
                    }
                </div>
            </div>
            
        </section>
    )
}

export default QuizResult;