'use client'

import useFormattedDate from "@/utils/useFormatteDate"
import Link from "next/link"
import styles from "@/styles/List.module.scss";
import { IList } from "@/interface/listType";

const ListContainer = ({data}:{ data: IList[]}) => {
    return(
        <ul className={`${styles.list}`}>
            {data?.map((el) =>{
                return(
                    <li key={el._id + "KEY"}>
                        <Link href={`/detail/${el._id}`}>
                            <div className={`${styles.listWrapper}`}>
                                <b className={`${styles.subtitle}`}>{el.subtitle}</b>
                                <p className={`${styles.startDatetime}`}>{useFormattedDate(el.startDatetime)}</p>
                            </div>
                            <div className={`${styles.arrowBtn}`}>
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