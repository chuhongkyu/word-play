import { IDetailData } from "@/interface/listDetail";
import { IList } from "@/interface/listType";
import { GetStaticProps } from "next";
import QuizContainer from "@/components/Detail/QuizContainer";
import Layout from "@/components/Layout";

export const getStaticPaths = async () => {
    try{
        const response = await fetch('https://qualson-test.vercel.app/api/test/list');
        if (!response.ok) {
            throw new Error('API Error');
        }
        const list = await response.json();
        const paths = list.data.map((el:IList)=> ({
            params: { idx : el.id.toString()}
        }))

        return { paths, fallback: true }
    }catch(error){
        console.error(error);
        return {
            paths: [],
            fallback: false,
        };
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const { params } = context;
        const response = await fetch(`https://qualson-test.vercel.app/api/test/${params?.idx}`);
        if (!response.ok) {
            throw new Error('API Error');
        }
        const result = await response.json();
        const data = result.data
        return { props : { data }}

    }catch(error) {
        console.error(error);
        return {
            notFound: true,
        }
    }
}

export default function Detail({ data }:IDetailData){

    return(
        <Layout>
            <QuizContainer data={data}/>
        </Layout>
    )
}