import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isNodeSelection, COMMAND_PRIORITY_EDITOR, COMMAND_PRIORITY_HIGH, createCommand, DRAGEND_COMMAND, DRAGOVER_COMMAND, DRAGSTART_COMMAND, DROP_COMMAND } from "lexical";
import React, { useEffect } from "react";
import { $createImageNode, $isImageNode, ImageNode } from "../nodes/ImageNode";
import { mergeRegister } from "@lexical/utils"

function getImageNode(): ImageNode | null {
    const selection = $getSelection()
    if ($isNodeSelection(selection)) {
        const imageNode = selection.getNodes()[0]
        if ($isImageNode(imageNode)) {
            return imageNode
        }
    }
    return null
}

interface DragData {
    src: string  ;
    altText: string;
    key: string;
}

function onDragStart(evt: DragEvent) {
    const imageNode = getImageNode()
    if (imageNode) {
        const dataTransfer = evt.dataTransfer
        const data = {
            src: imageNode.getSrc(),
            caption: imageNode.getCaption(),
            showCaption: imageNode.getShowCaption(),
            altText: imageNode.getAltText(),
            key: imageNode.getKey()
        }
        dataTransfer?.setData("application/drag-image-editor", JSON.stringify(data))
        console.log(dataTransfer?.getData("application/drag-image-editor"))
        return true
    }
    return false
}

function onDrop(evt: DragEvent) {
    evt.preventDefault()
    const dataTransfer = evt.dataTransfer
    if(!dataTransfer){
        return false
    }
    const imgData = JSON.parse(dataTransfer.getData("application/drag-image-editor")) as DragData
    const img = $createImageNode({
        key: imgData.key,
        altText: imgData.altText,
        src: imgData.src,
    })
    console.log(img)
    console.log(dataTransfer.getData("application/drag-image-editor"))
    // Change later
    return false
}

const CREATE_DROPPABLE_COMMAND = createCommand<DragEvent>()

export default function ImagePlugin() {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                CREATE_DROPPABLE_COMMAND,
                (payload) => {
                    // Work on it later
                    return false
                },
                COMMAND_PRIORITY_EDITOR
            ),
            editor.registerCommand(
                DRAGSTART_COMMAND,
                onDragStart,
                COMMAND_PRIORITY_HIGH
            ),
            editor.registerCommand(
                DRAGOVER_COMMAND,
                (payload) => {
                    payload.preventDefault()
                    editor.dispatchCommand(CREATE_DROPPABLE_COMMAND, payload)
                    return true
                },
                COMMAND_PRIORITY_HIGH
            ),
            editor.registerCommand(
                DROP_COMMAND,
                onDrop,
                COMMAND_PRIORITY_HIGH
            ),
        )
    })

    return null
}