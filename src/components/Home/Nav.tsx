import Image from "next/image"
import { useState } from "react";
import PayPopup from "./PayPopup";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
        <div className="nav-bar">
            <div className="group">
                <button className="left" onClick={() => setIsOpen(true)}>
                    <div className="coffee-icon-wrapper">
                        <Image src={"/assets/img/pay-icon.png"} alt="coffee" width={28} height={28} />
                    </div>
                    <p className="body-2 coffee-text">커피 한 잔 후원하기</p>
                </button>
            </div>
        </div>
        <PayPopup open={isOpen} onClick={() => setIsOpen(false)} />
        </>
    )
}

export default Nav