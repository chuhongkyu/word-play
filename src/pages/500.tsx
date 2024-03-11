import Layout from "@/components/Layout";
import Link from "next/link";

export default function Custom500() {
    return (
        <Layout>
            <div className="errorContainer">
                <p className="heading-6">죄송합니다.</p>
                <h1 className="body-2">500 - 서버 사이드 에러</h1>
                <Link className="btn" href={"/"}> 돌아가기 </Link>
            </div>
        </Layout>
    )
}