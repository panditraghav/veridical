import React from "react";
import { CodeNode } from "@lexical/code";
import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LANGUAGES } from "./languages";

export default function LanguageSelectionMenu({
    codeNode,
}: {
    codeNode: CodeNode | null;
}) {
    const [editor] = useLexicalComposerContext();
    const [lang, setLang] = useState<string | null>(null);

    useEffect(() => {
        editor.update(() => {
            let codeLang = codeNode?.getLanguage();

            if (!lang && codeLang) {
                setLang(codeLang);
            }

            if (lang) {
                codeNode?.setLanguage(lang);
            }
        });
    }, [lang]);

    return (
        <select
            value={lang ? lang : "javascript"}
            name="language"
            id="lang"
            className="language-selector"
            onChange={(e) => setLang(e.target.value)}
        >
            {LANGUAGES.map((language) => {
                return (
                    <option key={language.lang} value={language.lang}>
                        {language.name}
                    </option>
                );
            })}
        </select>
    );
}
