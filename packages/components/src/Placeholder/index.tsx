import React from "react"

export function Placeholder({ text }: { text: string }) {
    return (
        <div className="DefaultEditorTheme__Placeholder">{text}</div>
    )
}