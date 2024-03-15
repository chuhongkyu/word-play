import Header from "@/components/Header";
import Layout from "@/components/Layout";
import CheckUser from "./CheckUser";
import AdminFrom from "./AdminForm";

const AdminPage = () => {
    return(
        <Layout>
            <Header text="Admin"/>
            <CheckUser/>
            <AdminFrom/>
        </Layout>
    )
}

export default AdminPage;