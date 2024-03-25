import { IDetailData } from "@/interface/listDetail";
import { GetStaticProps } from "next";
import QuizContainer from "@/components/Detail/QuizContainer";
import Layout from "@/components/Layout";
import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export const getStaticPaths = async () => {
    try{
        const client = await connectDB;
        const db = client.db('forum');
        const posts = await db.collection('test').find({}).toArray();
    
        const paths = posts.map((post) => ({
        params: { idx: post._id.toString() },
        }));
    
        return { paths, fallback: true };
    }catch(error){
        console.error(error);
        return {
            paths: [],
            fallback: false,
        };
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    try {
        const client = await connectDB;
        const db = client.db('forum');

        if (!params || typeof params.idx !== 'string') {
            return { notFound: true };
        }

        const data = await db.collection('test').findOne({
            _id: new ObjectId(params.idx)
        });

        if (!data) {
            return { notFound: true };
        }

        return { props: { data: JSON.parse(JSON.stringify(data)) } };

    } catch (error) {
        console.error(error);
        return { notFound: true };
    }
}

export default function Detail({ data }:IDetailData){
    // console.log(data)
    return(
        <Layout>
            <QuizContainer data={data}/>
        </Layout>
    )
}