import styles from "@/styles/List.module.scss";

const Banner = () => {
    return(
        <section className={`${styles.banner}`}>
            <div className={`${styles.wrapper}`}>
                <small>SPEAKING | Basic High</small>
                <h3 className="header-3"><span>LV3.</span> Daily Korean Skills</h3>
                <p className={`${styles.date}`}>AM 8:30 ~ PM 9:30</p>
                <div className={`${styles.description} body-2`}>
                    It's the fourth level out of the four speaking steps.<br/>
                    You don't get nervous in various daily situations and naturally Let's practice communicating.
                </div>
            </div>
            
        </section>
    )
}

export default Banner