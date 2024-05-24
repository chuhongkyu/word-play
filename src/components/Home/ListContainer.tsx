'use client'

import useFormattedDate from "@/utils/useFormatteDate"
import Link from "next/link"
import { IList } from "@/interface/listType";
import { useQuiz } from "@/utils/useQuiz";
import { Fragment, useEffect } from "react";
import { AdsList } from "@/components/Ads/AdsList";
import ArrowBtn from "@/components/icon/ArrowBtn";

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
            {data?.map((el, index) =>{
                return(
                    <Fragment key={index + "LIST-KEY"}>
                        {/* {(index + 1) % 2 === 0 && <AdsList/>} */}
                        <li className="li" key={el._id + "KEY"}>
                            <Link href={`/detail/${el._id}`}>
                                <div className="list-wrapper">
                                    <h5 className="subtitle">{el.subtitle}</h5>
                                    <span className="keywords">
                                        키워드 : {el?.keywords?.map((word, i) => <p key={i+"word"}>{word}
                                        {i + 1 !== el?.keywords?.length && ',' }
                                        </p>)}
                                    </span>
                                    <span className="date-time">{useFormattedDate(el.startDatetime)} {el?.testType === "list" ? <b className="mark">list</b> : <b className="mark">select</b>}</span>
                                </div>
                                {saveData[makeContent(el._id)]?.record.length > 0 &&
                                <div className="list-status-bar">
                                    {saveData[makeContent(el._id)]?.record.filter((el)=> el == "success").length} / {saveData[makeContent(el._id)]?.record.length}
                                </div> }
                                <ArrowBtn/>
                            </Link>
                        </li>
                    </Fragment>
                )
            })}
            
        </ul>
    )
}

export default ListContainer