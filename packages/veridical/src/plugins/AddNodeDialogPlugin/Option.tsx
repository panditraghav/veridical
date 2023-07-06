import React, { useRef, useCallback, useEffect } from 'react';
import { NodeOption } from './DefaultNodeOptions';
import { LexicalNode, LexicalEditor } from 'lexical';
import { useVeridicalTheme } from '../../utils';

export default function Option({
    option,
    selectedNode,
    isSelected,
    editor,
    onClose,
}: {
    option: NodeOption;
    selectedNode: LexicalNode | null | undefined;
    isSelected: boolean;
    editor: LexicalEditor;
    onClose: () => void;
}) {
    const theme = useVeridicalTheme()?.addNodeDialog?.nodeOption;
    const optionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isSelected) return;
        optionRef.current?.scrollIntoView();
    }, [isSelected]);

    const create = useCallback(() => {
        editor.update(() => {
            if (!selectedNode) return;
            option.nodeCreator(selectedNode);
            onClose();
        });
    }, [editor, selectedNode, option, onClose]);

    return (
        <div
            ref={optionRef}
            className={`${theme?.container} ${
                isSelected ? theme?.selected : ''
            }`}
            onClick={create}
        >
            <div className={theme?.icon}>{option.icon}</div>
            <div className={theme?.text?.container}>
                <div className={theme?.text?.container}>
                    <div className={theme?.text?.name}>{option.name}</div>
                    <div className={theme?.text?.description}>
                        {option.description}
                    </div>
                </div>
            </div>
        </div>
    );
}
