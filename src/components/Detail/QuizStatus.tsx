import { IQuiz } from "@/interface/listDetail";
import styles from "@/styles/Detail.module.scss";
import { useQuiz } from "@/utils/useQuiz";
import { useEffect, useState } from "react";

const QuizStatus = ({data}:{data:IQuiz}) => {
    const { state, dispatch } = useQuiz()
    const { saveData, currentQ } = state
    const [ record, setRecord] = useState<string>("success")
    const [ resultBtn, setResultBtn] = useState(false)

    const goResultBtn = ()=>{
        dispatch({ type: 'SET_QUIZ_STATE', payload: "RESULT"})
    }
    
    const goNextQuizBtn = () =>{
        const nextQuestion = currentQ + 1; 
        dispatch({ type: 'SET_CURRENT', payload: nextQuestion });
        dispatch({ type: 'SET_QUIZ_STATE', payload: "START"})
    }

    useEffect(()=>{
        const index = saveData.findIndex(item => item.id === data.id);
        setRecord(saveData[index].record[currentQ])
        
        if(saveData[index].clear){
            setResultBtn(saveData[index].clear)
        }
    },[])

    return(
        <section className={`${styles.quizStatus}`}>
            <div className={`${styles.iconContainer}`}>
                {record === "success" ? (
                <>
                    <img src={'/assets/detail/test-success.png'} alt="success"/>
                    <span className="heading-3"><b>정답</b>이에요!</span>
                </>
                ):(
                <>
                    <img src={'/assets/detail/test-fail.png'} alt="fail"/>
                    <span className="heading-3"><b className={`${styles.redText}`}>오답</b>이에요!</span>
                </>
                )
                }
            </div>
            <div className="btn-container">
                {resultBtn ? 
                    <button className="btn" onClick={goResultBtn}>결과 확인하기</button> :
                    <button className="btn" onClick={goNextQuizBtn}>다음 문제</button>
                }
            </div>
        </section>
    )
}

export default QuizStatus;