import React from "react";

import Navbar from "./navbar";

interface Props {
    children: React.ReactNode
}

const Container: React.FC<Props> = ({ children }) => {
    return (
        <>
        <Navbar />

        <div className="container mx-auto px-4 pt-6 h-screen ">
            { children }
        </div>

        </>
    )
}

export default Container