"use client"

import { AnimatePresence, motion } from "motion/react";

function PayPopup({open, onClick}:{open: boolean, onClick: () => void}) {

    return (
        <AnimatePresence mode="wait">
            {open && (
                <motion.div className="pay-popup">
                    <motion.div 
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="pay-popup-content">
                        <div className="pay-popup-content-header">
                            <h1 className="heading-6">커피 한 잔 후원하기</h1>
                            <button className="close-button" onClick={onClick}>x</button>
                        </div>
                        <div className="pay-popup-content-body">
                            <div className="pay-popup-content-body-item">
                                <img src={"/assets/img/kakao-pay.jpeg"} alt="kakao"/>
                            </div>
                            <div className="pay-popup-content-body-item">
                                <img src={"/assets/img/naver-pay.jpg"} alt="naver"/>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PayPopup