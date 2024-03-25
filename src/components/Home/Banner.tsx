import Image from "next/image"

const Banner = () => {
    return(
        <section className="banner">
            <div className="wrapper">
                <small>신조어 맞추기 게임</small>
                <h3 className="header-3">세대 갈등을 극복해보자</h3>
                <div className="description body-2">
                    이 프로그램은 사용자에게 현대 인터넷 용어나 신조어를 소개하고, 그 의미를 맞추도록 요청합니다.<br/> 
                    이를 통해 노년 세대가 현대 젊은 세대의 언어와 문화를 이해하는 데 도움을 줍니다.
                </div>
            </div>
        </section>
    )
}

export default Banner