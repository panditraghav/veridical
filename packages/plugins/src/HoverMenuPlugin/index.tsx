import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

import {
    $getNearestNodeFromDOMNode,
    LexicalEditor,
    LexicalNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
    getHoveredDOMNode,
    Offset,
    useMouse,
    useVeridicalTheme,
    VeridicalThemeClasses,
} from "@veridical/utils";
import { useHoverMenuContext, hoverMenuContext } from "./hoverMenuContext";

function hideMenu(
    menu: HTMLElement | null,
    style: VeridicalThemeClasses["hoverMenu"]
) {
    if (!menu) return;

    menu.style.display = "none";
    menu.classList.remove(style?.animation || "");
}

function showMenu(
    menu: HTMLElement | null,
    style: VeridicalThemeClasses["hoverMenu"]
) {
    if (!menu) return;

    menu.style.display = "block";
    menu.classList.add(style?.animation || "");
}

function useHoverMenuPlugin(
    editor: LexicalEditor,
    children?: React.ReactNode,
    offset?: Offset
) {
    const hoverMenuRef = useRef<HTMLDivElement | null>(null);
    const theme = useVeridicalTheme();
    const [hoveredDOMNode, setHoveredDOMNode] = useState<HTMLElement | null>(
        null
    );
    const [hoveredLexicalNode, setHoveredLexicalNode] =
        useState<LexicalNode | null>(null);

    useMouse((ev) => {
        const domNode = getHoveredDOMNode(ev, editor, offset);
        setHoveredDOMNode(domNode);
        showMenu(hoverMenuRef.current, theme?.hoverMenu);
        editor.update(() => {
            if (!domNode) return;
            const lexicalNode = $getNearestNodeFromDOMNode(domNode);
            setHoveredLexicalNode(lexicalNode);
        });
    });

    useEffect(() => {
        return editor.registerUpdateListener(({ dirtyElements }) => {
            if (dirtyElements.get("root"))
                hideMenu(hoverMenuRef.current, theme?.hoverMenu);
        });
    });

    useEffect(() => {
        if (!hoveredDOMNode) {
            hideMenu(hoverMenuRef.current, theme?.hoverMenu);
        }
    }, [hoveredDOMNode]);

    return createPortal(
        <hoverMenuContext.Provider
            value={{ hoveredDOMNode, hoveredLexicalNode }}
        >
            <div ref={hoverMenuRef}>{children}</div>
        </hoverMenuContext.Provider>,
        document.body
    );
}

export function HoverMenuPlugin({
    children,
    offset,
}: {
    children?: React.ReactNode;
    offset?: Offset;
}) {
    const [editor] = useLexicalComposerContext();
    return useHoverMenuPlugin(editor, children, offset);
}

export { useHoverMenuContext, hoverMenuContext };
