import './main.css';
import Editor from './components/Editor';
import { useEffect, useState } from 'react';
import { getHTMLFromEditorJSONString } from './utils/editor';
import { AppContext } from './utils/context';
import Header from './components/Header';

function FromHTML() {
    const editorState = localStorage.getItem('blog');
    const html = getHTMLFromEditorJSONString(editorState);
    return (
        <div
            dangerouslySetInnerHTML={{ __html: html || '<h1>No HTML </h1>' }}
            className="md:w-8/12 md:mx-auto w-full px-4 mb-24"
        ></div>
    );
}

function App() {
    const [mode, setMode] = useState<'dark' | 'light'>('dark');
    const [isHTML, setIsHTML] = useState(false);
    const [showTreeView, setShowTreeView] = useState(true);

    useEffect(() => {
        const _isHTML = localStorage.getItem('isHTML');
        const parsed = JSON.parse(_isHTML || '{}');
        setIsHTML(parsed.isHTML || false);
    }, []);

    function onChangeHTML(newVal: boolean) {
        setIsHTML(newVal);
        localStorage.setItem('isHTML', JSON.stringify({ isHTML: newVal }));
    }

    return (
        <AppContext.Provider
            value={{
                isHTML,
                setIsHTML: onChangeHTML,
                showTreeView,
                setShowTreeView,
                mode,
                setMode,
            }}
        >
            <Header />
            {isHTML ? <FromHTML /> : <Editor />}
        </AppContext.Provider>
    );
}

export default App;
