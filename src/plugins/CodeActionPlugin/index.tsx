import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState, useRef } from "react";
import { $isCodeHighlightNode, $isCodeNode, CodeNode } from "@lexical/code";
import {
    $getNearestNodeFromDOMNode,
    $getNodeByKey,
    $getSelection,
    $isRangeSelection,
} from "lexical";
import { createPortal } from "react-dom";
import { StackOwnerState } from "@mui/system/Stack";
import LanguageSelectionMenu from "./LanguageSelectionMenu/index";

interface Position {
    top: number;
    left: number;
}

function getPositionFromHTMLElement(element: HTMLElement): Position {
    const { top, left } = element.getBoundingClientRect();
    return {
        top,
        left,
    };
}

function isMenuElement(element: HTMLElement | null, id: string): boolean {
    if (!element) return false;
    if (element.id === id) return true;

    let _element: HTMLElement | null = element;
    while (_element) {
        if (_element.id === id) return true;
        _element = _element.parentElement;
    }

    return false;
}

function isRequiredElement(
    element: HTMLElement | null,
    className?: string,
    id?: string
) {
    if (!element) return false;

    if (className) return element.classList.contains(className);
    else if (id) return element.id === id;
    else return false;
}

export function CodeActionMenu() {
    const [editor, { getTheme }] = useLexicalComposerContext();
    const [codeNodeKeys, setCodeNodeKeys] = useState(new Set<string>());
    const [codeNode, setCodeNode] = useState<CodeNode | null>(null);
    const [shouldListenToMouseEvent, setShouldListenToMouseEvent] =
        useState(false);
    const [shouldShowMenu, setShouldShowMenu] = useState(false);
    const [position, setPosition] = useState<Position>({
        top: 0,
        left: 0,
    });
    const divRef = useRef<HTMLDivElement | null>(null);

    function handleMouseEvent(ev: MouseEvent) {
        const theme = getTheme();
        const codeElementClassName = theme?.code || "";
        const targetElement = ev.target as HTMLElement;
        const parentElement = targetElement.parentElement;

        if (isRequiredElement(targetElement, codeElementClassName)) {
            setPosition(getPositionFromHTMLElement(targetElement));
        } else if (isRequiredElement(parentElement, codeElementClassName)) {
            if (parentElement)
                setPosition(getPositionFromHTMLElement(parentElement));
        }

        if (
            isRequiredElement(targetElement, codeElementClassName) ||
            isRequiredElement(parentElement, codeElementClassName)
        ) {
            setShouldShowMenu(true);

            editor.update(() => {
                const nearestNode = $getNearestNodeFromDOMNode(targetElement);
                if ($isCodeNode(nearestNode)) {
                    setCodeNode(nearestNode);
                } else if ($isCodeHighlightNode(nearestNode)) {
                    const codeNode = nearestNode.getParent();
                    if ($isCodeNode(codeNode)) setCodeNode(codeNode);
                }
            });
        } else if (isMenuElement(targetElement, "CodeMenu")) {
            setShouldShowMenu(true);
        } else {
            setShouldShowMenu(false);
        }
    }

    function addCodeNodeKey(key: string) {
        setCodeNodeKeys((currentKeys) => {
            currentKeys.add(key);
            return currentKeys;
        });
    }

    function removeCodeNodeKey(key: string) {
        setCodeNodeKeys((currentKeys) => {
            currentKeys.delete(key);
            return currentKeys;
        });
    }

    useEffect(() => {
        if (!shouldListenToMouseEvent) return;

        document.addEventListener("mousemove", handleMouseEvent);
        return () => {
            document.removeEventListener("mousemove", handleMouseEvent);
        };
    }, [shouldListenToMouseEvent]);

    useEffect(() => {
        return editor.registerMutationListener(CodeNode, (nodes, payload) => {
            for (const [key, mutations] of nodes) {
                switch (mutations) {
                    case "created":
                        addCodeNodeKey(key);
                        setShouldListenToMouseEvent(codeNodeKeys.size > 0);
                        break;
                    case "destroyed":
                        removeCodeNodeKey(key);
                        setShouldListenToMouseEvent(codeNodeKeys.size > 0);
                        break;
                    default:
                        break;
                }
            }
        });
    }, [editor]);

    return (
        <>
            {shouldShowMenu && (
                <div
                    id="CodeMenu"
                    ref={divRef}
                    style={{
                        position: "absolute",
                        top: position.top,
                        transition: "all",
                        left: position.left,
                    }}
                >
                    <LanguageSelectionMenu codeNode={codeNode} />
                </div>
            )}
        </>
    );
}

export default function CodeActionPlugin() {
    return createPortal(<CodeActionMenu />, document.body);
}
