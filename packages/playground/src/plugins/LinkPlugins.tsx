import {
    LinkPopoverPlugin as LinkPopover,
    CaretLinkPopoverPlugin,
    AutoLinkPlugin,
    useLinkPopoverPlugin,
} from 'veridical';
import { OpenNewIcon } from '../components/Icons';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';

export default function LinkPlugins() {
    return (
        <>
            <LinkPopover>
                <LinkPopover.Content
                    sideOffset={8}
                    className="bg-foreground rounded-md py-1.5 px-2 data-[state=open]:animate-in data-[state=open]:ease-in-out data-[state=open]:fade-in data-[state=open]:duration-150 data-[state=open]:zoom-in-95 data-[state=open]:data-[side=top]:slide-in-from-bottom-1.5 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:duration-200 flex space-x-2"
                >
                    <LinkPopover.Input
                        className="bg-foreground text-background focus:outline-none text-sm w-48"
                        placeholder="Type or paste a link"
                    />
                    <OpenLink />
                    <LinkPopover.Arrow className="fill-foreground" />
                </LinkPopover.Content>
            </LinkPopover>
            <CaretLinkPopoverPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
        </>
    );
}

function OpenLink() {
    const { url } = useLinkPopoverPlugin();
    return (
        <a
            href={url == '' ? undefined : url}
            target="_blank"
            aria-disabled={url === ''}
        >
            <OpenNewIcon
                className={`${
                    url === '' ? 'fill-muted-foreground' : 'fill-background'
                }`}
            />
        </a>
    );
}
