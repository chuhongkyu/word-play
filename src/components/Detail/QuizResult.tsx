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
                text: "Perfect.\nEverything was right!",
                color : "#0DB6FF",
            }
        }else if(failCount  <= 2){
            resultState = {
                type: "Good",
                text: "Good!",
                color :"#00D6C9",
            }
        }
        else{
            resultState = {
                type: "fail",
                text: "That's too bad.\nYou'll be able to do better next time.",
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
        <section className={styles.resultContainer}>
            <div className={styles.resultWrapper}>
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
                {stamp?.tryCount > 1 && <div className={styles.resultTryCount} style={{color: stamp?.resultState.color}}>{stamp?.tryCount} Try</div> }
            </div>
            <div className={`${styles.detailBtn} btn-container`}>
                <div className={styles.detailBtnGroup}>
                    {stamp?.resultState.type === "Perfect" ? 
                    <>
                        <Link href={"/"} className="btn">OK</Link>
                    </>:
                    <>
                        <button className="btn white" onClick={onHandleReTry}>Try Again</button>
                        <Link href={"/"} className="btn">OK</Link>
                    </>
                    }
                </div>
            </div>
            
        </section>
    )
}

export default QuizResult;