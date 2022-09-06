import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isParagraphNode, $isRangeSelection, LexicalEditor } from "lexical"
import AddNodeDialog from "./AddNodeDialog"

interface AddNodeBtnProps {
    boundingClientRect: DOMRect | null;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function useDialog(dialog: JSX.Element): [isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    dialog: any
] {
    const [isOpen, setIsOpen] = useState(false)

    if (!isOpen) return [isOpen, setIsOpen, null]

    return [isOpen, setIsOpen, dialog]
}

function AddNodeBtn({ boundingClientRect, onClick }: AddNodeBtnProps) {
    const buttonRef = useRef<HTMLButtonElement>()

    useEffect(() => {
        if (buttonRef && buttonRef.current && boundingClientRect) {
            buttonRef.current.style.top = `${boundingClientRect.y}px`
            buttonRef.current.style.left = `${boundingClientRect.x - 30}px`
        }
    }, [buttonRef, boundingClientRect])

    return (
        <>
            <button
                //@ts-ignore
                ref={buttonRef}
                style={{ position: "absolute" }}
                onClick={onClick}
            >
                +
            </button>
        </>
    )
}

export default function AddNodePlugin() {
    const [editor] = useLexicalComposerContext()
    const [addNodeBtn, setAddNodeBtn] = useState<{
        showBtn: boolean;
        boundingClientRect: DOMRect | null;
    }>({
        showBtn: false,
        boundingClientRect: null
    })
    const [isOpen, setIsOpen, dialog] = useDialog(
        <AddNodeDialog
            onClose={() => setIsOpen(false)}
            editor={editor}
        />
    )

    const updatePlugin = useCallback(() => {
        const selection = $getSelection()
        const nativeSelection = window.getSelection()
        const nativeAnchorNode = nativeSelection?.anchorNode as HTMLParagraphElement


        if ($isRangeSelection(selection)) {
            const anchor = selection.anchor
            const anchorNode = anchor.getNode()
            const textContent = anchorNode.getTextContent()

            if (($isParagraphNode(anchorNode) ||
                $isParagraphNode(anchorNode.getParent())) &&
                textContent === "") {

                if (nativeAnchorNode.getBoundingClientRect) {
                    let boundingClientRect = nativeAnchorNode.getBoundingClientRect()
                    setAddNodeBtn({ showBtn: true, boundingClientRect })
                }

            } else {
                setAddNodeBtn({ showBtn: false, boundingClientRect: null })
            }
        }

    }, [editor])

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                updatePlugin()
            })
        })
    })

    useEffect(() => {
        const keyPressListener = (ev: KeyboardEvent) => {
            if (ev.key === "k" && ev.ctrlKey) {
                ev.preventDefault()
                setIsOpen(true)
            }
        }
        document.addEventListener("keydown", keyPressListener)
        return () => document.removeEventListener("keydown", keyPressListener)
    }, [])

    if (!addNodeBtn.showBtn) return null

    return ReactDOM.createPortal((
        <>
            <AddNodeBtn
                boundingClientRect={addNodeBtn.boundingClientRect}
                onClick={() => setIsOpen(!isOpen)}
            />
            {dialog}
        </>
    ), document.body)
}