import { LINK_POPOVER_COMMAND } from '@/commands';
import { LinkAttributes, LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import * as Popover from '@radix-ui/react-popover';
import { COMMAND_PRIORITY_LOW } from 'lexical';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

type LinkPopoverPluginContextType = {
    url: string;
    setUrl: (url: string) => void;
    rel?: LinkAttributes['rel'];
    target?: LinkAttributes['target'];
    title?: LinkAttributes['title'];
    linkNode?: LinkNode | null;
    autoFocus?: boolean;
    side?: Popover.PopoverContentProps['side'];
};
const LinkPopoverPluginContext = createContext<LinkPopoverPluginContextType>({
    url: '',
    setUrl: () => {
        /*Empty*/
    },
});

const useLinkPopoverPlugin = () => useContext(LinkPopoverPluginContext);

function LinkPopoverPlugin({ children }: { children?: React.ReactNode }) {
    const [editor] = useLexicalComposerContext();
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState<string>('');

    const side = useRef<Popover.PopoverContentProps['side']>();
    const autoFocus = useRef<boolean | undefined>(true);
    const linkNode = useRef<LinkNode | undefined>();
    const target = useRef<LinkAttributes['target']>();
    const title = useRef<LinkAttributes['title']>();
    const rel = useRef<LinkAttributes['rel']>();

    const anchorRef = useRef<HTMLDivElement | null>(null);

    const setAnchor = useCallback(() => {
        const { current: anchorDom } = anchorRef;
        if (!anchorDom) return;
        const selection = getSelection();
        const selectionRange = selection?.getRangeAt(0);
        if (!selectionRange) return;

        const linkDomNode = linkNode.current
            ? editor.getElementByKey(linkNode.current.getKey())
            : null;

        const { left, top, width, height } = linkDomNode
            ? linkDomNode.getBoundingClientRect()
            : selectionRange.getBoundingClientRect();

        anchorDom.style.left = `${left}px`;
        anchorDom.style.top = `${top + window.scrollY}px`;
        anchorDom.style.width = `${width}px`;
        anchorDom.style.height = `${height}px`;
    }, [editor]);

    useEffect(() => {
        return editor.registerCommand(
            LINK_POPOVER_COMMAND,
            (payload) => {
                if (!payload) {
                    setOpen(false);
                    return true;
                }
                autoFocus.current = payload.autoFocus;
                linkNode.current = payload.linkNode;
                target.current = payload.target;
                title.current = payload.title;
                rel.current = payload.rel;
                side.current = payload.side;

                setOpen(true);
                setUrl(payload.linkNode?.getURL() || '');
                setAnchor();

                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor, setAnchor]);

    const contextValue: LinkPopoverPluginContextType = {
        url,
        setUrl,
        linkNode: linkNode.current,
        side: side.current,
        autoFocus: autoFocus.current,
        target: target.current,
        title: title.current,
        rel: rel.current,
    };

    return (
        <LinkPopoverPluginContext.Provider value={contextValue}>
            <Popover.Root open={open} onOpenChange={setOpen}>
                <Popover.Anchor
                    ref={anchorRef}
                    style={{ position: 'absolute', visibility: 'hidden' }}
                />
                {children}
            </Popover.Root>
        </LinkPopoverPluginContext.Provider>
    );
}

const LinkPopoverPluginInput = React.forwardRef<
    HTMLInputElement,
    Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'value' | 'onChange' | 'defaultValue'
    >
>((props, forwardedRef) => {
    const [editor] = useLexicalComposerContext();
    const { url, setUrl, linkNode, target, rel, title } =
        useLinkPopoverPlugin();
    return (
        <input
            {...props}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(ev) => {
                if (ev.key == 'Enter') {
                    ev.preventDefault();
                    if (linkNode) {
                        editor.update(() => {
                            linkNode.setURL(url);
                        });
                    } else {
                        editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
                            url,
                            target,
                            rel,
                            title,
                        });
                    }
                }
            }}
            ref={forwardedRef}
        />
    );
});
LinkPopoverPluginInput.displayName = 'LinkPopoverPluginInput';

const LinkPopoverPluginContent = React.forwardRef<
    React.ElementRef<typeof Popover.Content>,
    Omit<React.ComponentPropsWithoutRef<typeof Popover.Content>, 'side'>
>((props, forwardedRef) => {
    const { align, onOpenAutoFocus, ...etc } = props;
    const { autoFocus, side } = useLinkPopoverPlugin();

    function onOpenAutoFocusDefault(ev: Event) {
        if (!autoFocus) {
            ev.preventDefault();
        }
        onOpenAutoFocus?.(ev);
    }

    return (
        <Popover.Content
            side={side}
            onOpenAutoFocus={onOpenAutoFocusDefault}
            align={align || 'center'}
            ref={forwardedRef}
            {...etc}
        />
    );
});
LinkPopoverPluginContent.displayName = 'LinkPopoverPluginContent';

const LinkPopoverPluginArrow = Popover.Arrow;

LinkPopoverPlugin.Content = LinkPopoverPluginContent;
LinkPopoverPlugin.Input = LinkPopoverPluginInput;
LinkPopoverPlugin.Arrow = LinkPopoverPluginArrow;

export {
    LinkPopoverPlugin,
    //
    LinkPopoverPluginContent,
    LinkPopoverPluginInput,
    LinkPopoverPluginArrow,
    //
    LinkPopoverPluginContext,
    useLinkPopoverPlugin,
};
