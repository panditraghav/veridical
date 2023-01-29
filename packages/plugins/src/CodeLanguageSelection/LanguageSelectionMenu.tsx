import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { OverlayContainer } from '@veridical/components';
import { VeridicalThemeClasses, useVeridicalTheme } from '@veridical/utils';

export type Language = { name: string; value: string };

const TOP_OFFSET = 5;
const LEFT_OFFSET = 5;

function useSearch(
    languages: Language[],
    searchText: string,
): [searchedLang: Language[]] {
    const [searchedLang, setSearchedLang] = useState(languages);
    useEffect(() => {
        if (searchText === '') {
            setSearchedLang(languages);
            return;
        }
        const searchRegex = new RegExp(`^${searchText}`, 'i');
        const sl = languages.filter((lang) => {
            return lang.name.match(searchRegex);
        });
        setSearchedLang(sl);
    }, [searchText]);

    return [searchedLang];
}

function setMenuPosition(
    menuElement: HTMLDivElement | null,
    anchorElement: HTMLElement | null,
    animationClassName?: string,
) {
    if (!menuElement || !anchorElement) return;
    const { top, left, height } = anchorElement.getBoundingClientRect();
    menuElement.style.top = `${height + top + TOP_OFFSET}px`;
    menuElement.style.left = `${left + LEFT_OFFSET}px`;
    menuElement.classList.add(`${animationClassName || '$$'}`);
}

function hideMenu(
    menuElement: HTMLDivElement | null,
    animationClassName?: string,
) {
    if (!menuElement) return;
    menuElement.style.top = `${-1000}px`;
    menuElement.style.left = `${-1000}px`;
    menuElement.classList.remove(`${animationClassName || '$$'}`);
}

function LanguageOption({
    lang,
    isSelected,
    onClick,
    theme,
    optionsContainer,
}: {
    lang: Language;
    isSelected: boolean;
    onClick: () => void;
    theme?: VeridicalThemeClasses['codeLanguageSelection'];
    optionsContainer: HTMLDivElement | null;
}) {
    const optionRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!optionsContainer || !isSelected || !optionRef.current) return;
        const { top: containerTop, height: containerHeight } =
            optionsContainer.getBoundingClientRect();
        const { top: optionTop, height: optionHeight } =
            optionRef.current.getBoundingClientRect();

        if (
            containerTop + containerHeight < optionTop + optionHeight ||
            containerTop > optionTop
        ) {
            optionRef.current.scrollIntoView();
        }
    }, [isSelected, optionsContainer, optionRef]);

    return (
        <div
            className={`${theme?.menu?.option} ${
                isSelected ? theme?.menu?.optionSelected : ''
            }`}
            key={lang.name}
            onClick={onClick}
            //@ts-ignore
            ref={optionRef}
        >
            {lang.name}
        </div>
    );
}

export default function ({
    isOpen,
    setLang,
    anchorElement,
    onClose,
    languages,
}: {
    isOpen: boolean;
    setLang: (lang: Language) => void;
    anchorElement: HTMLElement | null;
    onClose: () => void;
    languages: Language[];
}) {
    const theme = useVeridicalTheme();
    const [searchText, setSearchText] = useState('');
    const menuRef = useRef<HTMLDivElement | null>(null);
    const backdropRef = useRef<HTMLDivElement | null>(null);
    const [searchedLang] = useSearch(languages, searchText);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const optionsContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        function scrollListener(ev: Event) {
            setMenuPosition(
                menuRef.current,
                anchorElement,
                theme?.codeLanguageSelection?.menu?.animation,
            );
        }
        function keydownListener(ev: KeyboardEvent) {
            switch (ev.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowDown':
                    setSelectedOptionIndex((index) => {
                        if (index === searchedLang.length - 1) {
                            return 0;
                        }
                        return index + 1;
                    });
                    break;
                case 'ArrowUp':
                    setSelectedOptionIndex((index) => {
                        if (index === 0) {
                            return searchedLang.length - 1;
                        }
                        return index - 1;
                    });
                    break;
                case 'Enter':
                    ev.preventDefault();
                    setLang(searchedLang[selectedOptionIndex]);
                    setSearchText('');
                    onClose();
                    break;
            }
        }

        function clickListener(ev: MouseEvent) {
            if (ev.target === backdropRef.current) {
                onClose();
            }
        }

        document.addEventListener('scroll', scrollListener);
        document.addEventListener('keydown', keydownListener);
        document.addEventListener('click', clickListener);

        return () => {
            document.removeEventListener('scroll', scrollListener);
            document.removeEventListener('keydown', keydownListener);
            document.removeEventListener('click', clickListener);
        };
    }, [isOpen, backdropRef, searchedLang]);

    useEffect(() => {
        if (!isOpen) return;
        if (anchorElement) {
            setMenuPosition(
                menuRef.current,
                anchorElement,
                theme?.codeLanguageSelection?.menu?.animation,
            );
        } else {
            hideMenu(
                menuRef.current,
                theme?.codeLanguageSelection?.menu?.animation,
            );
        }
    }, [anchorElement, isOpen]);

    useEffect(() => {
        setSelectedOptionIndex(0);
    }, [searchedLang]);

    if (!isOpen) return null;
    return createPortal(
        <OverlayContainer>
            <div
                ref={backdropRef}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            >
                <div
                    className={`${theme?.codeLanguageSelection?.menu?.container}`}
                    style={{ position: 'absolute' }}
                    ref={menuRef}
                >
                    <input
                        placeholder="Search"
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={`${theme?.codeLanguageSelection?.menu?.search}`}
                        autoFocus
                    />
                    <div
                        className={`${theme?.codeLanguageSelection?.menu?.optionContainer}`}
                        //@ts-ignore
                        ref={optionsContainerRef}
                    >
                        {searchedLang.map((lang) => {
                            return (
                                <LanguageOption
                                    lang={lang}
                                    isSelected={
                                        searchedLang[selectedOptionIndex]
                                            .name === lang.name
                                    }
                                    theme={theme?.codeLanguageSelection}
                                    onClick={() => {
                                        setLang(lang);
                                        setSearchText('');
                                        onClose();
                                    }}
                                    optionsContainer={
                                        optionsContainerRef.current
                                    }
                                    key={lang.name}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </OverlayContainer>,
        document.body,
    );
}
