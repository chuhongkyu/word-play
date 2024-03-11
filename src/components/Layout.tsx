import { ReactNode } from "react";


const Layout = ({ children }:{ children : ReactNode})=>{
    return(
        <main className="main">
            {children}
        </main>
    )
}

export default Layout