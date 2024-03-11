import styles from "@/styles/List.module.scss";

const Banner = () => {
    return(
        <section className={`${styles.banner}`}>
            <div className={`${styles.wrapper}`}>
                <small>SPEAKING | Basic High</small>
                <h3 className="header-3"><span>LV4.</span> 일상 영어 스킬업</h3>
                <p className={`${styles.date}`}>화,목 I PM 8:30 ~ 9:30</p>
                <div className={`${styles.description} body-2`}>
                    6단계 스피킹 단계 중 네 번째 레벨이에요.<br/>
                    다양한 일상 상황에서 긴장 하지 않고 자연스럽게<br/> 
                    소통하도록 연습해요.
                </div>
            </div>
            
        </section>
    )
}

export default Banner