import React from 'react';
import {
    InitialEditorStateType,
    LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { EditorThemeClasses, Klass, LexicalEditor, LexicalNode } from 'lexical';
import { VeridicalThemeClasses, VeridicalThemeProvider } from '../utils';

export default function VeridicalComposer({
    initialConfig,
    children,
}: {
    initialConfig: Readonly<{
        namespace: string;
        nodes?: readonly Klass<LexicalNode>[];
        onError: (error: Error, editor: LexicalEditor) => void;
        editable?: boolean | undefined;
        theme?: EditorThemeClasses;
        editorState?: InitialEditorStateType;
        veridicalTheme?: VeridicalThemeClasses;
    }>;
    children?: React.ReactNode;
}) {
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <VeridicalThemeProvider theme={initialConfig.veridicalTheme}>
                {children}
            </VeridicalThemeProvider>
        </LexicalComposer>
    );
}
