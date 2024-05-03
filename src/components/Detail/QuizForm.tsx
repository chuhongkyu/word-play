import styles from "@/styles/Detail.module.scss";
import { Dispatch, SetStateAction } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { ReactSVG } from "react-svg"
interface Input {
    value: string;
    key: string;
}
  
interface IProps {
    userInput: Input[];
    setUserInput: Dispatch<SetStateAction<Input[]>>;
    options: string[];
    onHandleCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuizForm = ({userInput, setUserInput, options, onHandleCheckBox}:IProps) => {
    const onDragEnd = (result:DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }
    
        if (source.index === destination.index) {
            return;
        }
    
        const reorder = (list:Input[], startIndex: number, endIndex:number) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
    
            return result;
        };
    
        const items = reorder(userInput, source.index, destination.index);
    
        setUserInput(items);
    }

    const onReset = () => {
        setUserInput([]);
    }
    
    return(
        <div className={styles['quiz-form']}>
            <div className={styles['quizanswer-sheet']}>
                <div className={styles['dummy-line']}>
                    <div>정답 칸</div>
                    <div/>
                    <div/>
                    <div></div>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className={styles['word-container']}>
                            {userInput.map((el, i) => (
                            <Draggable key={el.key + i + "AnswerKey"} draggableId={el.key + i + "AnswerKey"} index={i}>
                                {(provided) => (
                                <span ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={styles['word-btn']}>
                                    {el.value}
                                </span>
                                )}
                            </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div className={styles['options-sheet']}>
                {options.map((word, i)=>{
                    return(
                        <span key={word + i + "Option-KEY"} className={styles['option-btn']}>
                            <input
                                type="checkbox"
                                id={word + i + ""}
                                name={word}
                                value={word}
                                checked={userInput.some(item => item?.key === word + i)}
                                onChange={onHandleCheckBox}
                            />
                            <label htmlFor={word + i + ""}>{word}</label>
                        </span>
                    )
                })}
                <ReactSVG onClick={onReset} className={styles["reset-btn"]} src={"/assets/icon/reset.svg"}/>
            </div>
        </div>
    )
}

export default QuizForm