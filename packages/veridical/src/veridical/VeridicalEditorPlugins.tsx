import React, { useEffect, useState } from 'react';
import {
    MarkdownPlugin,
    CodeActionMenuLeft,
    CodeActionMenuRight,
    PrettierPlugin,
    HighlightMenuPlugin,
    HoverMenuPlugin,
    AddNodeShortcutPlugin,
    ImageDialogPlugin,
    ImagePlugin,
    HoverBlockOptions,
    AutoLinkPlugin,
    AddLinkDialogPlugin,
    OpenLinkPlugin,
    AddNodeDialogPlugin,
    ImageActionMenuRight,
} from '../plugins';

import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import {
    AddNodeButton,
    DraggableNodeButton,
    CopyCodeButton,
    CodeLanguageSelectionMenu,
    EditImageButton,
} from '../components';

export default function VeridicalEditorPlugins(): JSX.Element {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    useEffect(() => {
        setContainer(document.body);
    }, []);

    return (
        <>
            <AutoFocusPlugin />
            <AutoLinkPlugin />
            <LinkPlugin />
            <PrettierPlugin />
            <HistoryPlugin />
            <TabIndentationPlugin />
            {container && (
                <>
                    <HighlightMenuPlugin container={container} />
                    <AddLinkDialogPlugin container={container} />
                    <HoverMenuPlugin
                        offset={{ left: -50, top: 4 }}
                        container={container}
                    >
                        <HoverBlockOptions
                            container={container}
                            offset={{ left: -50, top: 4 }}
                        >
                            <AddNodeButton />
                            <DraggableNodeButton container={container} />
                        </HoverBlockOptions>
                        <CodeActionMenuLeft container={container}>
                            <CodeLanguageSelectionMenu container={container} />
                        </CodeActionMenuLeft>
                        <CodeActionMenuRight container={container}>
                            <CopyCodeButton />
                        </CodeActionMenuRight>
                        <ImageActionMenuRight container={container}>
                            <EditImageButton />
                        </ImageActionMenuRight>
                    </HoverMenuPlugin>
                    <AddNodeDialogPlugin container={container} />
                    <ImageDialogPlugin container={container} />
                </>
            )}
            <AddNodeShortcutPlugin />
            <MarkdownPlugin />
            <ImagePlugin />
            <OpenLinkPlugin />
        </>
    );
}
