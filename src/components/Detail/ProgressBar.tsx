import { IDetailData } from "@/interface/listDetail";
import styles from "@/styles/Detail.module.scss";
import { useQuiz } from "@/utils/useQuiz";
import { useEffect, useState } from "react";

const ProgressBar = ({data}:IDetailData) => {
    const { state } = useQuiz()
    const { saveData, currentQ } = state
    const [ bars, setBars] = useState<string[]>([])

    useEffect(()=>{
        if(saveData){
            const index = saveData.findIndex(item => item.id === data?._id);
            const records = saveData[index]?.record
            setBars(records)
            // console.log(saveData)
        }
    },[saveData ])

    return(
        <div className={`${styles.progressBar}`}>
            <div className={`${styles.bars}`}>
                {bars?.map((el,i)=>{
                    return(
                        <span key={i + "BAR-KEY"} className={`${styles.bar}`} data-bar={`${el}`}>

                        </span>
                    )
                })}
            </div>
            <p className="body-2">{currentQ + 1}/{bars?.length}</p>
        </div>
    )
}

export default ProgressBar;