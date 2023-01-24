import React from "react";
export default function OverlayContainer({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div
            data-type={"overlay"}
            style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            {children}
        </div>
    );
}
