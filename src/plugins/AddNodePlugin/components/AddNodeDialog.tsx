import "../../../style/addNodeDialog.css"
import React, { useEffect, useState } from "react"
import {
    $getSelection,
    $isParagraphNode,
    $isRangeSelection,
    COMMAND_PRIORITY_EDITOR,
    LexicalEditor,
} from "lexical";
import {
    NodeTransformer,
    TRANSFORM_NODE_COMMAND,
    NodeTransformerOption
} from "../../../nodes/NodeTransformers"

interface AddNodeDialogProps {
    onClose: () => void;
    editor: LexicalEditor;
    nodeTransformerOptions: NodeTransformerOption[];
}

export default function AddNodeDialog({ onClose, editor, nodeTransformerOptions }: AddNodeDialogProps) {
    const [searchText, setSearchText] = useState("")
    const [orderedTransformerOptions, setOrderedTransformerOptions] = useState(nodeTransformerOptions)
    const [selectedOption, setSelectedOption] = useState(nodeTransformerOptions[0])

    useEffect(() => {
        const keyPressListener = (ev: KeyboardEvent) => {
            let selectedOptionIndex = orderedTransformerOptions.findIndex((option) => {
                return option.name === selectedOption.name
            })

            switch (ev.key) {
                case "Escape":
                    onClose()
                    break

                case "Enter":
                    editor.dispatchCommand(TRANSFORM_NODE_COMMAND, selectedOption.transformer)
                    ev.preventDefault()
                    break

                case "ArrowDown":
                    if (selectedOptionIndex + 1 < orderedTransformerOptions.length && selectedOptionIndex !== -1) {
                        setSelectedOption(orderedTransformerOptions[selectedOptionIndex + 1])
                    }
                    break

                case "ArrowUp":
                    if (selectedOptionIndex - 1 >= 0 && selectedOptionIndex !== -1) {
                        setSelectedOption(orderedTransformerOptions[selectedOptionIndex - 1])
                    }
                    break

            }
        }
        document.addEventListener("keydown", keyPressListener)
        return () => document.removeEventListener("keydown", keyPressListener)
    }, [selectedOption])

    useEffect(() => {
        let searchedTerm = orderedTransformerOptions.filter((option) => {
            const name = option.name.toLowerCase()
            const st = searchText.toLowerCase()
            const shortName = option.shortName.toLowerCase()
            return name.includes(st) || shortName.includes(st)
        })
        let optionSet = new Set([...searchedTerm, ...orderedTransformerOptions])
        let orderedOptions = new Array(...optionSet)

        setOrderedTransformerOptions(orderedOptions)
        setSelectedOption(orderedOptions[0])

    }, [searchText])

    useEffect(() => {
        return editor.registerCommand(TRANSFORM_NODE_COMMAND, (payload: NodeTransformer): boolean => {
            editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                    const anchorNode = selection.anchor.getNode()
                    if ($isParagraphNode(anchorNode)) {
                        payload(anchorNode)
                        onClose()
                        return true
                    }
                }
            })
            return false
        }, COMMAND_PRIORITY_EDITOR)
    })

    return (
        <div className="addNodeDialog-backdrop">
            <div className="addNodeDialog">
                <div>
                    <input
                        className="nodeSearch"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        autoFocus
                        type="text"
                        placeholder="Search.."
                    />
                </div>
                <div>
                    {orderedTransformerOptions.map((option) => {
                        return (
                            <div
                                key={option.name}
                                className="nodeOption"
                                onClick={() => editor.dispatchCommand(TRANSFORM_NODE_COMMAND, option.transformer)}
                                style={{ backgroundColor: selectedOption.name === option.name ? "rgba(0, 0, 0, 0.069)" : "" }}
                            >
                                <img
                                    className="nodeOptionImage"
                                    src={option.image}
                                    alt={option.shortName}
                                />
                                <div className="nodeOptionText">
                                    <div className="nodeOptionName">
                                        {option.name}
                                    </div>
                                    <div className="nodeOptionDescription">
                                        {option.description}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}