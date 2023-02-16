import React from 'react';
import {
    InitialEditorStateType,
    LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { EditorThemeClasses, Klass, LexicalEditor, LexicalNode } from 'lexical';
import { VeridicalThemeProvider } from '@veridical/utils';

export default function VeridicalComposer({
    initialConfig,
    children,
}: {
    initialConfig: Readonly<{
        namespace: string;
        nodes?: readonly Klass<LexicalNode>[] | undefined;
        onError: (error: Error, editor: LexicalEditor) => void;
        editable?: boolean | undefined;
        theme?: EditorThemeClasses | undefined;
        editorState?: InitialEditorStateType | undefined;
    }>;
    children?: React.ReactNode;
}) {
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <VeridicalThemeProvider theme={initialConfig.theme}>
                {children}
            </VeridicalThemeProvider>
        </LexicalComposer>
    );
}
