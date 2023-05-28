import React from "react";

export default function ProgressiveImg(src){
    const url = src.src +'/full.jpg';
    return (
        <div className="imageopen">
            <img className="showimage" alt="keykey" src={url}>
            </img>
        </div>
    );
};
