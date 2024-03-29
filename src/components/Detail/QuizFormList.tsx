import styles from "@/styles/Detail.module.scss";
import { Dispatch, SetStateAction } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Input {
    value: string;
    key: string;
}
  
interface IProps {
    userInput: Input[];
    options: string[];
    onHandleRadio: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuizFormList = ({userInput, options, onHandleRadio}:IProps) => {
    return(
        <div className={styles['quiz-form']}>
            <div className={styles['quizanswer-sheet']}>
                <div className={styles['dummy-line']}>
                    <div/>
                </div>
                <div className={styles['word-container']}>
                    <span className={styles['word-answer']}>정답 :</span>
                    {userInput.map((item)=> {
                        return(
                            <span id={item.key} className={styles['word-text']}>{item.value}</span>
                        )
                    })}
                </div>
            </div>
            <div className={styles['options-sheet']} data-type="list">
                {options.map((word, i)=>{
                    return(
                        <span key={word + i + "Option-KEY"} className={styles['option-btn']}>
                            <input
                                type="radio"
                                id={word + i + ""}
                                name="answer"
                                value={word}
                                checked={userInput.some(item => item?.key === word + i)}
                                onChange={onHandleRadio}
                            />
                            <label htmlFor={word + i + ""}>{i + 1}. {word}</label>
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default QuizFormList