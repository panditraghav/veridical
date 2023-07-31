import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import {
    FloatingActionMenuPlugin as FloatingActionMenu,
    FormatsType,
    useFloatingActionMenu,
} from 'veridical';
import {
    CodeIcon,
    FormatBoldIcon,
    FormatItalicIcon,
    FormatUnderlineIcon,
    LinkIcon,
} from '../components/Icons';

export default function FloatingActionMenuPlugin() {
    return (
        <FloatingActionMenu>
            <FloatingActionMenu.Content
                className="bg-foreground rounded-md py-1.5 px-2 data-[state=open]:animate-in data-[state=open]:ease-in-out data-[state=open]:fade-in data-[state=open]:duration-150 data-[state=open]:zoom-in-95 data-[state=open]:data-[side=top]:slide-in-from-bottom-1.5 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:duration-200"
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
            <FormatBoldIcon size="base" />
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
            <FormatUnderlineIcon size="base" />
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
            <FormatItalicIcon size="base" />
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
            <CodeIcon size="base" />
        </button>
    );
}

function LinkButton() {
    const [editor] = useLexicalComposerContext();
    const { formats } = useFloatingActionMenu();
    return (
        <button
            {...getButtonAttributes(formats, 'link')}
            onClick={() =>
                editor.dispatchCommand(
                    TOGGLE_LINK_COMMAND,
                    formats.link ? null : 'https://'
                )
            }
        >
            <LinkIcon size="base" />
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
