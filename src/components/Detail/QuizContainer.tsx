import { IDetailData } from "@/interface/listDetail";
import QuizMain from "./QuizMain";
import QuizResult from "./QuizResult";
import QuizStatus from "./QuizStatus";
import { useQuiz } from "@/utils/useQuiz";
import { useEffect } from "react";
import Header from "../Header";
import ProgressBar from "./ProgressBar";


const QuizContainer = ({data}:IDetailData) => {
    const { state, dispatch } = useQuiz()
    const { saveData, quizState } = state

    useEffect(() => {
        if (data?._id) {
            dispatch({ type: 'LOAD_SAVE_DATA' });
            dispatch({ 
                type: 'ADD_DATA', 
                payload: { 
                    id: data._id, 
                    contentLength: data.content.length
                }
            })
        }
        return () => {
            dispatch({ type: 'SET_QUIZ_STATE', payload: "READY" });
        }
    }, [data, dispatch]);

    useEffect(()=> {
        if(saveData){
            const index = saveData.findIndex(item => item.id === data?._id);
            if(saveData[index]?.clear) dispatch({ type: 'SET_QUIZ_STATE', payload: "RESULT"})
        }
    },[saveData])

    function renderQuizComponents() {
        switch (quizState) {
          case "STATUS":
            return <QuizStatus data={data}/>;
          case "RESULT":
            return <QuizResult data={data}/>;
          default:
            return <QuizMain quizzes={data}/>;
        }
    }

    return(
        <>
            <Header text={quizState === "RESULT" ? "TEST RESULT" :"TEST"}/>
            {quizState !== "RESULT" && <ProgressBar data={data}/>}
            {renderQuizComponents()}
        </>
    )
}

export default QuizContainer