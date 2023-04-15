import './main.css';
import Editor from './Editor';
import { useEffect, useState } from 'react';

function Header({
    isHTML,
    onChangeIsHTML,
}: {
    isHTML: boolean;
    onChangeIsHTML: (isHTML: boolean) => void;
}) {
    const [mode, setMode] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        const currentMode = localStorage.getItem('mode');
        if (currentMode === 'dark') {
            document.documentElement.classList.add(currentMode);
            setMode('dark');
        } else {
            document.documentElement.classList.remove('dark');
            setMode('light');
        }
    });
    function onClickHandler() {
        const currentMode = localStorage.getItem('mode');
        const cl = document.documentElement.classList;
        if (!currentMode) {
            localStorage.setItem('mode', 'dark');
            setMode('dark');
            cl.add(!cl.contains('dark') ? 'dark' : '');
        } else {
            if (currentMode === 'dark') {
                cl.remove('dark');
                localStorage.setItem('mode', 'light');
                setMode('light');
            } else {
                cl.add(!cl.contains('dark') ? 'dark' : '');
                localStorage.setItem('mode', 'dark');
                setMode('dark');
            }
        }
    }
    return (
        <nav className="sticky top-0 z-30 text-editor-p-dark dark:text-editor-p-light h-12 w-full bg-editor-bg-light dark:bg-editor-bg-dark flex justify-between items-center flex-row shadow-sm shadow-slate-200 dark:shadow-gray-800 mb-8">
            <div>
                <span className="mx-2">CurrentMode: {mode}</span>
                <span>Rendering : Editor</span>
            </div>
            <div>
                <button onClick={onClickHandler} className="mx-4">
                    {mode === 'dark' ? 'Light' : 'Dark'}
                </button>
                <button
                    className="mx-4"
                    onClick={() => onChangeIsHTML(!isHTML)}
                >
                    Use {isHTML ? 'Veridical' : 'HTML'}
                </button>
            </div>
        </nav>
    );
}

function FromHTML() {
    const html = localStorage.getItem('html');
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
