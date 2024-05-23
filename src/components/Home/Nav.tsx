import Image from "next/image"

const Nav = () => {
    return(
        <div className="nav-bar">
            <div className="group">
                <div className="left">
                    <div className="coffee-icon-wrapper">
                        <a className="coffee-icon" href="https://toss.me/서울신입생/4500" target="_blank">
                            <span className="toss-icon">
                                <Image width={50} height={15.5} src={"/assets/img/toss.png"} alt="toss"/>
                            </span>
                        </a>
                    </div>
                    <p className="body-2 coffee-text">커피 한 잔 후원하기</p>
                </div>
            </div>
        </div>
    )
}

export default Nav