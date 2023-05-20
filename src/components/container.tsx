import React from "react";

import Navbar from "./navbar";

interface Props {
    children: React.ReactNode
}

const Container: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="container mx-auto px-4 flex-grow">
            { children }
        </main>

        </div>
    )
}

export default Container