import { useVeridicalTheme, Offset ,  useHoverMenuContext } from "@veridical/utils";
import React, { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function setMenuPosition(
    element: HTMLElement | null,
    menu: HTMLElement | null,
    offset?: Offset,
    animationClassName?: string
) {
    if (!menu) return;
    if (!element) {
        hideMenu(menu);
        return;
    }
    const elementRect = element.getBoundingClientRect();
    const { x: elementX, y: elementY } = elementRect;

    menu.style.left = `${elementX + (offset?.left || 0)}px`;
    menu.style.top = `${elementY + (offset?.top || 0) + window.scrollY}px`;
    menu.classList.add(`${animationClassName || "hoverMenuAnimation$$"}`);
}

function hideMenu(menu: HTMLElement | null, animationClassName?: string) {
    if (!menu) return;
    menu.style.left = "-100px";
    menu.style.top = "-100px";
    menu.classList.remove(`${animationClassName || "hoverMenuAnimation$$"}`);
}

export default function HoverBlockOptions({
    children,
    offset,
}: {
    children?: React.ReactNode;
    offset?: Offset;
}) {
    const { hoveredDOMNode } = useHoverMenuContext();
    const [editor] = useLexicalComposerContext();
    const hoverMenuRef = useRef<HTMLDivElement | null>(null);
    const theme = useVeridicalTheme();
    useEffect(() => {
        setMenuPosition(
            hoveredDOMNode,
            hoverMenuRef.current,
            offset,
            theme?.hoverMenu?.animation
        );
        if (!hoveredDOMNode)
            hideMenu(hoverMenuRef.current, theme?.hoverMenu?.animation);
    }, [hoveredDOMNode]);

    useEffect(() => {
        return editor.registerUpdateListener(({ dirtyElements }) => {
            if (dirtyElements.get("root")) {
                hideMenu(hoverMenuRef.current, theme?.hoverMenu?.animation);
            }
        });
    }, [editor]);

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
