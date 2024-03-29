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
            text: "That's too bad.\nYou'll be able to do better next time.",
            color :"#00D6C9",
        },
        tryCount: 1
    });

    useEffect(()=>{
        const index = state.saveData.findIndex(item => item.id === data?._id);
        const records = state.saveData[index]?.record
        const failCount = records?.filter(item => item === "fail").length;
        const successCount = records?.filter(item => item === "success").length;
        const tryCount = state.saveData[index]?.try
        let resultState
        if(failCount  === 0){
            resultState = {
                type: "Perfect",
                text: "완벽해요!",
                color : "#0DB6FF",
            }
        }else if(failCount  <= 2){
            resultState = {
                type: "Good",
                text: "최고 입니다!",
                color :"#00D6C9",
            }
        }
        else{
            resultState = {
                type: "fail",
                text: "아쉽네요.😂\n다음에 더 잘해봅시다!",
                color :"#FF5F5F",
            }
        }

        setStamp({
            records: records,
            success: successCount,
            total: records?.length,
            resultState: resultState,
            tryCount: tryCount
        });

    }, [state.saveData, data?._id]); 

    const onHandleReTry = () => {
        dispatch({ 
            type: 'RESET_QUIZ', 
            payload: { 
                id: data._id, 
            }
        })
        dispatch({ type: 'SET_CURRENT', payload: 0})
        dispatch({ type: "SET_SAVE_DATA"});
        dispatch({ type: 'SET_QUIZ_STATE', payload: "START" });
    } 

    // const randomNumber = (n:number) => {
    //     return Math.floor(Math.random() * n)
    // }

    return(
        <section className={styles['result-container']}>
            <div className={styles['result-wrapper']}>
                <div className={`${styles['result-text']} heading-6`}>
                    {stamp?.resultState.text}
                </div>
                <div className={`${styles['result-sheet']}`}>
                    {stamp?.records?.map((el, i)=>{
                        return(
                            <Stamp key={i + "StampKEY"} color={stamp?.resultState?.color} state={el}/>
                        )
                    })}
                </div>
                <div className={`${styles['result-scroe']}`} style={{color: stamp?.resultState.color}}>
                    {stamp?.success === stamp?.total ? 
                    <p>만점</p>:
                    <p>{stamp?.success}/{stamp?.total}</p>
                    }
                </div>
                {stamp?.tryCount > 1 && <div className={styles['result-try-count']} style={{color: stamp?.resultState.color}}>{stamp?.tryCount}번째 시도</div> }
            </div>
            <div className={`${styles['detail-btn']} btn-container`}>
                <div className={styles['detail-btn-group']}>
                    {stamp?.resultState.type === "Perfect" ? 
                    <>
                        <Link href={"/"} className="btn">확인</Link>
                    </>:
                    <>
                        <button className="btn white" onClick={onHandleReTry}>다시 하기</button>
                        <Link href={"/"} className="btn">확인</Link>
                    </>
                    }
                </div>
            </div>
            
        </section>
    )
}

export default QuizResult;