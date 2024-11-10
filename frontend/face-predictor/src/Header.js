import React from "react";
import HuDis from "./images/HuDis_Full.png";


const Header = (props) => (
    <div className="max-w-4xl sm:py-7 bg-white min-w-full min-h-20 drop-shadow-xl flex items-center justify-center">
        <img className="h-14" src={HuDis} alt="HuDis logo"/>
    </div>
);

export default Header;