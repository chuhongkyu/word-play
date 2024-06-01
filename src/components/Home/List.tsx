import Link from "next/link";
import ArrowBtn from "../icon/ArrowBtn";
import useFormattedDate from "@/utils/useFormatteDate"
import { ISaveData } from "@/interface/actionAndStateTypes";

interface IProps{
    id:string;
    subtitle:string;
    keywords?:string[];
    startDatetime:string;
    testType:string;
    saveData: ISaveData[];
}

export default function List({ id, subtitle, keywords, startDatetime, testType, saveData }:IProps){

    const makeContent = (id:string) => {
        const index = saveData.findIndex(item => item.id === id);
        return index
    }

    return(
        <li className="li">
            <Link href={`/detail/${id}`}>
                <div className="list-wrapper">
                    <h5 className="subtitle">{subtitle}</h5>
                    <span className="keywords">
                        <b>키워드</b>: {keywords?.map((word, i) => <p key={i+"word"}>{word}
                        {i + 1 !== keywords?.length && ',' }
                        </p>)}
                    </span>
                    <span className="date-time">{useFormattedDate(startDatetime)} {testType === "list" ? <b className="mark">list</b> : <b className="mark">select</b>}</span>
                </div>
                {saveData[makeContent(id)]?.record.length > 0 &&
                <div className="list-status-bar">
                    {saveData[makeContent(id)]?.record.filter((el)=> el == "success").length} / {saveData[makeContent(id)]?.record.length}
                </div> }
                <ArrowBtn/>
            </Link>
        </li>
    )
}