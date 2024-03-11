import Link from "next/link"
import { useRouter } from "next/router"

const Header = ({text}:{text:string}) => {
    const route = useRouter()
    return(
        <header className="header">
            <div className="headerGroup">
                <h5 className="heading-6">{text}</h5>
                {route.pathname.includes('detail') &&
                    <Link className="x-btn" href={'/'}>
                        <span>
                            <img src="/assets/icon/x-btn.png" alt="x-btn"/>
                        </span>
                    </Link>
                }
            </div>
        </header>
    )
}

export default Header