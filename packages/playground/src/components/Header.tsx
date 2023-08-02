import { useEffect } from 'react';
import { useAppContext } from '../utils/context';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from './DropdownMenu';
import { SettingsIcon } from './Icons';

export default function Header() {
    const { mode, setMode, isHTML, setIsHTML, showTreeView, setShowTreeView } =
        useAppContext();

    useEffect(() => {
        const currentMode = localStorage.getItem('mode');
        if (currentMode === 'dark') {
            document.documentElement.classList.add(currentMode);
            setMode('dark');
        } else {
            document.documentElement.classList.remove('dark');
            setMode('light');
        }
    }, [setMode]);

    function handleChange(mode: string) {
        const cl = document.documentElement.classList;

        localStorage.setItem('mode', mode);
        if (mode === 'dark') {
            setMode(mode);
            cl.add('dark');
        } else {
            setMode('light');
            cl.remove('dark');
        }
    }
    return (
        <nav className="sticky top-0 z-30 w-full py-4 bg-background border-b border-b-muted">
            <div className="w-8/12 mx-auto flex justify-between">
                <h1>Veridical</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <SettingsIcon className="fill-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end">
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                Theme
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                    value={mode}
                                    onValueChange={handleChange}
                                >
                                    <DropdownMenuRadioItem value="dark">
                                        Dark
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="light">
                                        Light
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                Render
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                    value={isHTML ? 'html' : 'veridical'}
                                    onValueChange={(value) => {
                                        setIsHTML(value == 'html');
                                    }}
                                >
                                    <DropdownMenuRadioItem value="veridical">
                                        Veridical
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="html">
                                        HTML
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuCheckboxItem
                            checked={showTreeView}
                            onCheckedChange={setShowTreeView}
                        >
                            Tree View
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}
