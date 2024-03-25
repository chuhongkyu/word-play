import { IQuiz } from "@/interface/listDetail";
import styles from "@/styles/Detail.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import CountdownTimer from "./CountDownTimer";
import CountDownModal from "./CountDownModal";
import SoundBtn from "./SoundBtn";
import { useQuiz } from "@/utils/useQuiz";
// import QuizForm from "./QuizForm";
import dynamic from "next/dynamic";
import QuizFormList from "./QuizFormList";

const QuizForm = dynamic(() => import("./QuizForm"));

const QuizMain = ({quizzes}:{quizzes: IQuiz})=> {
    const { state, dispatch } = useQuiz()
    const { currentQ, quizState, saveData } = state
    const [ btnState, setBtnState] = useState(true);

    const [isModal, setModal] = useState(true);

    const handleModalClose = ()=>{
        setModal(false)
        dispatch({ type: 'SET_QUIZ_STATE', payload: "START" });
    }

    const [ options, setOptions] = useState<string[]>([]);
    const [ isAnswer, setAnswer] = useState<string[]>([]);

    // useEffect(()=>{
    //     console.log(isAnswer)
    // },[isAnswer])

    const [userInput, setUserInput] = useState<{value: string, key: string}[]>([]);

    const onHandleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked, id: key } = e.target;

        if (checked) {
            if (!userInput.some(item => item.key === key)) {
                setUserInput(userInput.concat([{ value, key }]));
            }
        } else {
            console.log(key, value)
            //필터를 통해서 제거
            setUserInput(userInput.filter(item => item.key !== key));
        }
    };

    const onHandleRadio = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, id: key } = e.target;
        setUserInput([{ value, key }]);
    };

    const shuffleWord = (array:string[]) => {
        return array.sort(() => Math.random() - 0.5);
    }

    useEffect(()=>{
        if(quizzes){
            const answer = quizzes.content[currentQ]?.words ?? [];
            const wrong = quizzes.content[currentQ]?.distractors ?? [];

            const all = [...answer, ...wrong]
            setOptions(shuffleWord(all))
            setAnswer(answer)
        }
    },[quizzes, currentQ])

    useEffect(()=>{
        if(quizState === "START" || "READY"){
            dispatch({
                type: 'CHECK_CURRENT_DATA', 
                payload: { id: quizzes?._id }
            })
        }
        
    },[quizState, quizzes])

    useEffect(()=>{
        const index = saveData.findIndex(item => item.id === quizzes?._id);
        if(index !== -1){
            dispatch({ type: 'SET_CURRENT', payload: saveData[index].endQ });
        }
    },[saveData, quizzes])

    useEffect(()=>{
        if(userInput.length > 0){
            setBtnState(false)
        }else{
            setBtnState(true)
        }
    },[userInput])

    const checkAnswers = () => {
        const userInputValues = userInput.map(input => input.value);
        const allAnswersMatch = isAnswer.every(answer => userInputValues.includes(answer));
      
        if (userInputValues.length !== isAnswer.length || !allAnswersMatch) {
        //   console.log("땡");
          return false;
        }
      
        // console.log("정답");
        return true;
    };

    const onHandleSubmit = ()=>{
        onHandleData()
    }

    const timeOverClose = () => onHandleData()

    const onHandleData = () => {
        const check = checkAnswers();
        if(check){
            dispatch({
                type: "SUCCESS_QUIZ", 
                payload: { 
                    id: quizzes._id, 
                    contentLength: quizzes.content.length 
                }
            });
        }else{
            dispatch({ 
                type: "FAIL_QUIZ", 
                payload: { 
                    id: quizzes._id, 
                    contentLength: quizzes.content.length 
                }
            });
        }
        
        dispatch({ type: "SET_SAVE_DATA"});
        dispatch({ type: 'SET_QUIZ_STATE', payload: "STATUS" });
    }

    return(
        <>
            {isModal && quizState === "READY"  ? <CountDownModal type={quizzes?.testType} onClose={handleModalClose}/> : null}
            <section className={styles.quizContainer}>
                <h5 className={`${styles.title} heading-4`}>{quizzes?.content[currentQ]?.answerKr}</h5>
                {quizzes?.testType === "list" ? 
                <QuizFormList
                    userInput={userInput}
                    options={options} 
                    onHandleRadio={onHandleRadio} />
                :
                <QuizForm
                    userInput={userInput}
                    setUserInput={setUserInput} 
                    options={options} 
                    onHandleCheckBox={onHandleCheckBox} />
                }
                {quizzes?.testType === "select" ? <SoundBtn url={quizzes?.content[currentQ]?.tts}/> : null}
                <div className={`${styles.quizInterface}`}>
                    <div className={`${styles.group}`}>
                        <CountdownTimer isStart={quizState === "START" ? true : false} onClose={timeOverClose }/>
                        <button className="btn" disabled={btnState} onClick={onHandleSubmit}>제출하기</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default QuizMain