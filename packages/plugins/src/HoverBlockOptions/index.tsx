import { useVeridicalTheme, VeridicalThemeClasses } from "@veridical/utils";
import React, { useEffect, useRef } from "react";
import { useHoverMenuContext } from "..";
import { Offset } from "@veridical/utils";

function setMenuPosition(
    element: HTMLElement | null,
    menu: HTMLElement | null,
    offset?: Offset
) {
    if (!menu) return;
    if (!element) {
        hideMenu(menu);
        return;
    }
    const elementRect = element.getBoundingClientRect();
    const { x: elementX, y: elementY, height } = elementRect;

    menu.style.left = `${elementX + (offset?.left || 0)}px`;
    menu.style.top = `${elementY + (offset?.top || 0) + window.scrollY}px`;
}

function hideMenu(menu: HTMLElement | null) {
    if (!menu) return;
    menu.style.left = "-100px";
    menu.style.top = "-100px";
}

export default function HoverBlockOptions({
    children,
    offset,
}: {
    children?: React.ReactNode;
    offset?: Offset;
}) {
    const { hoveredDOMNode } = useHoverMenuContext();
    const hoverMenuRef = useRef<HTMLDivElement | null>(null);
    const theme = useVeridicalTheme();
    useEffect(() => {
        setMenuPosition(hoveredDOMNode, hoverMenuRef.current, offset);
    }, [hoveredDOMNode]);
    return (
        <div
            className={theme?.hoverBlockOption?.container}
            style={{ position: "absolute" }}
            ref={hoverMenuRef}
        >
            {children}
        </div>
    );
}
