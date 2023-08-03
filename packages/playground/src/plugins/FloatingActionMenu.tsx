import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import {
    FloatingActionMenuPlugin as FloatingActionMenu,
    FormatsType,
    LINK_POPOVER_COMMAND,
    useFloatingActionMenu,
} from 'veridical';
import { FaBold, FaCode, FaItalic, FaLink, FaUnderline } from 'react-icons/fa6';
import { cn } from '../utils/cn';

export default function FloatingActionMenuPlugin() {
    return (
        <FloatingActionMenu>
            <FloatingActionMenu.Content
                className="bg-foreground rounded-md py-1 px-1 data-[state=open]:animate-in data-[state=open]:ease-in-out data-[state=open]:fade-in data-[state=open]:duration-150 data-[state=open]:zoom-in-95 data-[state=open]:data-[side=top]:slide-in-from-bottom-1.5 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:duration-200"
                sideOffset={8}
            >
                <FloatingActionMenu.Arrow className="fill-foreground" />
                <BoldButton />
                <ItalicButton />
                <UnderlineButton />
                <LinkButton />
                <CodeButton />
            </FloatingActionMenu.Content>
        </FloatingActionMenu>
    );
}

function BoldButton() {
    const [editor] = useLexicalComposerContext();
    const { formats } = useFloatingActionMenu();
    return (
        <button
            {...getButtonAttributes(formats, 'bold')}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        >
            <FaBold className={getIconClassName(formats.bold)} />
        </button>
    );
}

function UnderlineButton() {
    const [editor] = useLexicalComposerContext();
    const { formats } = useFloatingActionMenu();
    return (
        <button
            {...getButtonAttributes(formats, 'underline')}
            onClick={() =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
            }
        >
            <FaUnderline className={getIconClassName(formats.underline)} />
        </button>
    );
}

function ItalicButton() {
    const [editor] = useLexicalComposerContext();
    const { formats } = useFloatingActionMenu();
    return (
        <button
            {...getButtonAttributes(formats, 'italic')}
            onClick={() =>
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
            }
        >
            <FaItalic className={getIconClassName(formats.italic)} />
        </button>
    );
}

function CodeButton() {
    const [editor] = useLexicalComposerContext();
    const { formats } = useFloatingActionMenu();
    return (
        <button
            {...getButtonAttributes(formats, 'code')}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
        >
            <FaCode className={getIconClassName(formats.code)} />
        </button>
    );
}

function LinkButton() {
    const [editor] = useLexicalComposerContext();
    const { formats, closeMenu } = useFloatingActionMenu();

    function handleClick() {
        if (formats.link) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        } else {
            editor.dispatchCommand(LINK_POPOVER_COMMAND, {
                side: 'top',
                autoFocus: true,
                target: '_blank',
            });
            closeMenu();
        }
    }
    return (
        <button {...getButtonAttributes(formats, 'link')} onClick={handleClick}>
            <FaLink className={getIconClassName(formats.link)} />
        </button>
    );
}

function getButtonAttributes(
    formats: FormatsType,
    format: keyof FormatsType
): React.ButtonHTMLAttributes<HTMLButtonElement> {
    return {
        className: `rounded-md p-1 mx-1 ${
            formats[format]
                ? 'bg-muted-foreground/40 hover:bg-muted-foreground/50 fill-background'
                : 'hover:bg-muted-foreground/20 fill-background/90'
        }`,
    };
}

function getIconClassName(selected: boolean) {
    return cn(
        'text-xl',
        selected && 'fill-background',
        !selected && 'fill-background/90'
    );
}
