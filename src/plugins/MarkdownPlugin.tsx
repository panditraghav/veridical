import React from "react"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { defaultTransformers } from "../markdown/MarkdownTransformers"

export default function MarkdownPlugin() {
    return (
        <MarkdownShortcutPlugin transformers={defaultTransformers} />
    )
}