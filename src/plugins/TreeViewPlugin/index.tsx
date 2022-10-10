import React from "react"
import { TreeView } from "@lexical/react/LexicalTreeView"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

export default function TreeViewPlugin() {
    const [editor] = useLexicalComposerContext()
    return <TreeView
        editor={editor}
        timeTravelButtonClassName=""
        timeTravelPanelButtonClassName=""
        timeTravelPanelClassName=""
        timeTravelPanelSliderClassName=""
        viewClassName=""
    />
}