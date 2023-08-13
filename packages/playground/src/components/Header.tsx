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
import { AiFillGithub, AiFillSetting } from 'react-icons/ai';

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
            <div className="md:w-8/12 lg:w-[850px] mx-auto flex justify-between">
                <h1 className="text-lg font-bold">Veridical</h1>
                <div className="flex items-center space-x-2">
                    <a
                        href="https://github.com/panditraghav/veridical"
                        target="_blank"
                    >
                        <AiFillGithub className="fill-foreground/80 hover:fill-foreground text-xl" />
                    </a>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <AiFillSetting className="fill-foreground/80 hover:fill-foreground text-xl" />
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
            </div>
        </nav>
    );
}
