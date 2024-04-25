import { ReactNode } from "react";
import { Noto_Sans_KR, Roboto } from 'next/font/google'
 
const notoSansKr = Noto_Sans_KR({
    weight: ['400', '500', '700'],
    style: ['normal'],
    subsets: ["latin"],
    display: 'swap',
})

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "400", "700"],
    variable: "--roboto",
});

export const cls = (...classnames: string[]) => {
    return classnames.join(" ");
};

const Layout = ({ children }:{ children : ReactNode})=>{
    return(
        <main className={cls(notoSansKr.className, roboto.variable)}>
            {children}
        </main>
    )
}

export default Layout