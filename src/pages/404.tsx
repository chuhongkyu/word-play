import Header from "@/components/Header"
import Layout from "@/components/Layout"
import Link from "next/link"

export default function Custom404() {
    return (
        <Layout>
            <Header text="에러 404"/>
            <div className="errorContainer">
                <p className="heading-6">죄송합니다.</p>
                <h1 className="body-2">404 - Page Not Found</h1>
                <Link className="btn" href={"/"}> 돌아가기 </Link>
            </div>
        </Layout>
    )
}