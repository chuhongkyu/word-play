'use client'

import { IList } from "@/interface/listType";
import { useQuiz } from "@/utils/useQuiz";
import { useEffect, useState } from "react";
import List from "./List";

const ListContainer = ({data}:{ data: IList[]}) => {
    const { state, dispatch } = useQuiz()
    const { saveData } = state
    const [selectedCategory, setSelectedCategory] = useState("new-word");
    const [filteredData, setFilteredData] = useState<IList[]>([]);

    useEffect(() => {
        dispatch({ type: 'LOAD_SAVE_DATA' });
    }, [dispatch]);

    useEffect(()=>{
        if(data){
            setFilteredData(data.filter(item => item.category === selectedCategory));
        }
    },[data, selectedCategory])


    return(
        <>
        <ul className="category-list body-1">
            <li className={`category ${selectedCategory === "new-word" ? "active" : ""}`} 
                onClick={() => setSelectedCategory("new-word")}
            >
                신조어
            </li>
            <li className={`category ${selectedCategory === "old-word" ? "active" : ""}`} 
                onClick={() => setSelectedCategory("old-word")}
            >
                속담
            </li>
        </ul>
        <ul className="list">
            {filteredData?.map((el) =>{
                return(
                    <List 
                        key={el._id+ "KEY"} 
                        id={el?._id} 
                        subtitle={el?.subtitle} 
                        keywords={el?.keywords} 
                        startDatetime={el?.startDatetime} 
                        testType={el?.testType}
                        saveData={saveData}
                    />
                )
            })}
        </ul>
        </>
    )
}

export default ListContainer