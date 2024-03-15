import { ReactNode } from "react";
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
    weight: ['400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})


const Layout = ({ children }:{ children : ReactNode})=>{
    return(
        <main className={roboto.className}>
            {children}
        </main>
    )
}

export default Layout