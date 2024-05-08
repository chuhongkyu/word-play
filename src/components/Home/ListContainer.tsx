'use client'

import useFormattedDate from "@/utils/useFormatteDate"
import Link from "next/link"
import { IList } from "@/interface/listType";
import { useQuiz } from "@/utils/useQuiz";
import { useEffect } from "react";
import BarStatus from "./BarStatus";

const ListContainer = ({data}:{ data: IList[]}) => {
    const { state, dispatch } = useQuiz()
    const { saveData } = state

    useEffect(() => {
        dispatch({ type: 'LOAD_SAVE_DATA' });
    }, [data]);

    const makeContent = (id:string) => {
        const index = saveData.findIndex(item => item.id === id);
        return index
    }

    return(
        <ul className="list">
            {data?.map((el) =>{
                return(
                    <li key={el._id + "KEY"}>
                        <Link href={`/detail/${el._id}`}>
                            <div className="list-wrapper">
                                <span className="subtitle">{el.subtitle}</span>
                                <span className="date-time">{useFormattedDate(el.startDatetime)} {el?.testType === "list" ? <b className="mark">list</b> : <b className="mark">select</b>}</span>
                            </div>
                            {saveData[makeContent(el._id)]?.record.length > 0 &&
                            <div className="list-status-bar">
                                {saveData[makeContent(el._id)]?.record.map((score,i)=>{
                                    return(
                                        <BarStatus  key={i + el._id + ""} state={score}/>
                                    )
                                })}
                            </div> }
                            <div className="arrow-btn">
                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 11.7071C-0.0976311 11.3166 -0.0976312 10.6834 0.292893 10.2929L4.58579 6L0.292893 1.70711C-0.0976316 1.31658 -0.0976316 0.683417 0.292893 0.292893C0.683417 -0.0976315 1.31658 -0.0976315 1.70711 0.292893L6.70711 5.29289C7.09763 5.68342 7.09763 6.31658 6.70711 6.70711L1.70711 11.7071C1.31658 12.0976 0.683418 12.0976 0.292893 11.7071Z" fill="#45494E"/>
                                </svg>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default ListContainer