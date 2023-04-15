import './main.css';
import Editor from './Editor';
import { useEffect, useState } from 'react';
import { getHTMLFromEditorJSONString } from './utils/editor';
import Header from './components/Header';

function FromHTML() {
    const editorState = localStorage.getItem('blog');
    const html = getHTMLFromEditorJSONString(editorState);
    return (
        <div
            dangerouslySetInnerHTML={{ __html: html || '<h1>No HTML </h1>' }}
            className="md:max-w-[780px] md:mx-auto w-full px-4"
        ></div>
    );
}

function App() {
    const [isHTML, setIsHTML] = useState(false);

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
        <>
            <Header isHTML={isHTML} onChangeIsHTML={onChangeHTML} />
            {isHTML ? <FromHTML /> : <Editor />}
        </>
    );
}

export default App;
