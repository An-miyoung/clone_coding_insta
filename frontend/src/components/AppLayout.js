import React from "react";

export default function AppLayout({children}) {

    return (
        <>
            <div className="header">
                Header
            </div>
            {children}
            <div className="footer">
                footer
            </div>
        </>
    )
}