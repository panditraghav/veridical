import React from "react"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { defaultTransformers } from "./MarkdownTransformers"

export default function MarkdownPlugin() {
    return (
        <MarkdownShortcutPlugin transformers={defaultTransformers} />
    )
}