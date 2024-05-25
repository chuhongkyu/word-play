import Header from "@/components/Header";
import ListContainer from "@/components/Home/ListContainer";
import Banner from "@/components/Home/Banner";
import { Suspense } from "react";
import { IList } from "@/interface/listType";
import Layout from "@/components/Layout";
import { connectDB } from "@/utils/database";
import Nav from "@/components/Home/Nav";
import { MetaHead } from "@/components/MetaHead";
import Footer from "@/components/Footer";
import Description from "@/components/Description";

export const getStaticProps = async () => {
  try {
    const client = await connectDB;
    const db = client.db('forum');
    const results = await db.collection('test').find({}, { projection: { contents: 0 } }).sort({startDatetime: -1}).toArray();
    const data = JSON.parse(JSON.stringify(results));
    return { props: { data }, revalidate: 3600}

  }catch(error){
    console.log(error)
    throw new Error('API 에러')
  }
}

export default function Home({ data }: { data: IList[]}) {
  return (
    <>
      <MetaHead title="세대 갈등 해결 - 신조어 배우기"/>
      <Layout>
        <Header text="세대 갈등 해결"/>
        <Banner/>
        <Description/>
        <Suspense fallback={<div>Loading...</div>}>
          <ListContainer data={data}/>
          <Nav/>
        </Suspense>
        <Footer/>
      </Layout>
    </>
  );
}
