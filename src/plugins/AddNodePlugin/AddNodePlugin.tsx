import React, { useEffect, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isParagraphNode, $isRangeSelection, LexicalEditor } from "lexical"

interface AddNodeBtnProps {
    editor: LexicalEditor
}

function AddNodeBtn({ editor }: AddNodeBtnProps) {
    const buttonRef = useRef()

    return (
        <button
            ref={buttonRef}
        >
            +
        </button>
    )
}

export default function AddNodePlugin() {
    const [editor] = useLexicalComposerContext()
    const [showBtn, setShowBtn] = useState(false)

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                    const anchor = selection.anchor
                    const anchorNode = anchor.getNode()
                    const textContent = anchorNode.getTextContent()

                    if ($isParagraphNode(anchorNode) &&
                        textContent === "") {
                        setShowBtn(true)
                    } else {
                        setShowBtn(false)
                    }
                }
            })
        })
    })

    if (!showBtn) return null

    return (
        <AddNodeBtn
            editor={editor}
        />
    )
}