import React from "react"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { defaultTransformers } from "./markdownTransformers"

export default function MarkdownPlugin() {
    return (
        <MarkdownShortcutPlugin transformers={defaultTransformers} />
    )
}