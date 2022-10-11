import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect } from "react"
import { format } from "prettier/standalone"
import { $getSelection, $isRangeSelection } from "lexical"
import { $isCodeHighlightNode, $isCodeNode } from "@lexical/code"
import tsParser from "prettier/parser-typescript"
import babelParser from "prettier/parser-babel"

export default function PrettierPlugin() {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        function prettierCommandListener(ev: KeyboardEvent) {
            if (ev.altKey) ev.preventDefault()
            if (ev.key == "F" && ev.altKey && ev.shiftKey) {
                editor.update(() => {
                    const selection = $getSelection()
                    if (!$isRangeSelection(selection)) return

                    const selectionNode = selection.getNodes()[0]
                    const parentNode = selectionNode.getParent()
                    console.log(selectionNode, parentNode)

                    if ($isCodeNode(parentNode)) {
                        const codeNode = parentNode
                        let textContent = codeNode.getTextContent()
                        console.log(textContent)
                        textContent = format(textContent, {
                            parser: "babel",
                            plugins: [babelParser],
                            
                        })
                        const codeSelection = codeNode.select(0)
                        codeSelection.insertText(textContent)
                        console.log(textContent)
                    }
                })

            }
        }
        document.addEventListener("keydown", prettierCommandListener)

        return () => document.removeEventListener("keydown", prettierCommandListener)
    }, [editor])

    return null;
}