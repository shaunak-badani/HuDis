import React from "react";
import { Typography } from "@mui/material";


const Header = (props) => (
    <div className="max-w-4xl sm:py-7 bg-white min-w-full min-h-20 drop-shadow-xl flex items-center justify-center">
        {/* <img className="h-14 m-10" src={flashback} /> */}
        <Typography variant="h2">HuDis?</Typography>
    </div>
);

export default Header;