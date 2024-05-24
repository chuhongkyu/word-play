import Image from "next/image"

const Banner = () => {
    return(
        <section className="banner">
            <div className="wrapper">
                <small>신조어 맞추기 게임</small>
                <h3 className="header-3">세대 갈등을 극복해보자</h3>
                <div className="description body-2">
                    mz세대를 이해하기 위한 신조어 퀴즈!<br/>
                    전통을 자랑하는 우리 나라의 지혜로운 속담 퀴즈!
                    <br/>퀴즈를 맞추면서 세대간의 언어를 이해해봅시다!
                </div>
            </div>
        </section>
    )
}

export default Banner