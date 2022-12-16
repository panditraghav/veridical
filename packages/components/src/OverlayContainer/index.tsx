import React from "react";
export default function OverlayContainer({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div
            data-type={"overlay"}
        >
            {children}
        </div>
    );
}
