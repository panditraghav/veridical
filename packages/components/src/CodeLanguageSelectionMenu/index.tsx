import { ExpandMoreIcon } from '@veridical/components';
import React, { useEffect, useState, useRef } from 'react';
import { useVeridicalTheme, useHoverMenuContext  } from '@veridical/utils';
import { $isCodeNode } from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LanguageSelectionMenu from './LanguageSelectionMenu';
import type { Language } from './LanguageSelectionMenu';

const DefaultLanguages: Language[] = [
    {
        name: 'JavaScript',
        value: 'javascript',
    },
    {
        name: 'C',
        value: 'c',
    },
    {
        name: 'HTML',
        value: 'html',
    },
    {
        name: 'CSS',
        value: 'css',
    },
    {
        name: 'Markdown',
        value: 'markdown',
    },
    {
        name: 'Python',
        value: 'python',
    },
    {
        name: 'Rust',
        value: 'rust',
    },
    {
        name: 'SQL',
        value: 'sql',
    },
    {
        name: 'Swift',
        value: 'swift',
    },
    {
        name: 'TypeScript',
        value: 'javascript',
    },
    {
        name: 'XML',
        value: 'xml',
    },
    {
        name: 'Plain-text',
        value: 'plaintext',
    },
];

export default function CodeLanguageSelectionMenu({
    languages = DefaultLanguages,
}: {
    languages?: Language[];
}) {
    const theme = useVeridicalTheme();
    const [editor] = useLexicalComposerContext();
    const [lang, setLang] = useState<Language>({
        name: 'JavaScript',
        value: 'javascript',
    });
    const [isOpen, setIsOpen] = useState(false);
    const { hoveredDOMNode, hoveredLexicalNode } = useHoverMenuContext();
    const buttonRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        editor.getEditorState().read(() => {
            if ($isCodeNode(hoveredLexicalNode)) {
                const currentLang = hoveredLexicalNode.getLanguage();
                if (!currentLang) return;
                const newLang = languages.find((lang) => {
                    return lang.value === currentLang;
                });
                if (newLang) {
                    setLang(newLang);
                }
            }
        });
    }, [hoveredLexicalNode]);

    useEffect(() => {
        editor.update(() => {
            if (!$isCodeNode(hoveredLexicalNode)) return;
            hoveredLexicalNode.setLanguage(lang.value);
        });
    }, [lang]);

    return (
        <>
            <div
                //@ts-ignore
                ref={buttonRef}
                className={`${theme?.codeLanguageSelection?.container}`}
                onClick={() => setIsOpen(true)}
            >
                <div className={`${theme?.codeLanguageSelection?.name}`}>
                    {lang.name}
                </div>
                <ExpandMoreIcon
                    size="sm"
                    className={`${theme?.codeLanguageSelection?.icon}`}
                />
            </div>
            <LanguageSelectionMenu
                isOpen={isOpen}
                anchorElement={buttonRef.current}
                setLang={(newLang) => setLang(newLang)}
                onClose={() => setIsOpen(false)}
                languages={languages}
            />
        </>
    );
}
