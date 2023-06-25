import React from "react";
import Desktop from "./desktop";
import Mobile from "./mobile";

export default function ChildDetailAnime({isMobile,...props}: any){
    if(isMobile){
        return <Mobile {...props} />
    }
    return <Desktop {...props} />
}