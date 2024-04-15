'use client'
import React from "react";


interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
    children
}) =>{
    return(
        <div className="max-w-[2520px] mx-auto xl:px-10 md:px-5 sm:px-1 px-2">{children}</div>
    );
}
export default Container