/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import chevon_down from '@/features/NewLayout/assets/images/common/alt-arr-down-20.svg';
// import select_check from '@/features/NewLayout/assets/images/common/select_check.svg';
import { HTMLProps, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Placement } from "@popperjs/core/lib";
import { usePopper } from "react-popper";
import SelectSearch from "./SelectSearch";
import Search from "./Search";
import { searchArray } from "@/utils/utils";

export interface IOption<T> {
    label: string | ReactNode | null | number;
    value: T | null;
}

export interface ISSelectButton {
    label: string | ReactNode | null;
    placeHolder: string;
    isOptionOpen: boolean;
    handleClearValue: () => void;
}

interface ISSelect<T, G> {
    logkey?: string;
    position?: Placement;
    isSearch?: boolean;
    placeHolder?: string;
    onSearch?: (keyword: string) => void;
    options: G[];
    openOnClick?: boolean;
    handleChange: (value?: G) => void;
    clearable?: boolean;
    value: T;
    buttonProps?: HTMLProps<HTMLDivElement>;
    dropdownProps?: HTMLProps<HTMLDivElement>;
    optionProps?: HTMLProps<HTMLDivElement>;
    customButton?: (props: ISSelectButton) => ReactNode;
    onClear?: () => void;
    disabled?: boolean;
    searchPlaceholder?: string;
    onScrollToBottom?: () => void;
    selectedText?: HTMLProps<HTMLSpanElement>;
    searchDelay?: number;
}

const RenderOption = <T, G extends IOption<T>>(options: G[], value: string | number | null | undefined | any, handleChosenValue: (option: G) => void, optionProps?: HTMLProps<HTMLDivElement>) => (
    <>
        {options.map((item) => (
            <div {...optionProps} key={`${item.value}`} className={`option text_xs_medium text_primary ${optionProps?.className || ""}`} onClick={() => handleChosenValue(item)}>
                {item.label}
                {item.value === value ? <img src={"select_check"} className="" alt="" /> : <div style={{ width: "20px", height: "20px" }}></div>}
            </div>
        ))}
    </>
);

const SSelect = <T, G extends IOption<T>>(props: ISSelect<T, G>) => {
    const { position, options, value, handleChange, openOnClick, buttonProps, dropdownProps, customButton, optionProps, isSearch, onSearch, placeHolder, clearable, onClear, disabled, searchPlaceholder, onScrollToBottom, logkey, searchDelay, selectedText } = props;
    const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
    const [chosenValue, setChosenValue] = useState<G | null>(null);
    const [optionList, setOptionList] = useState<G[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    const popperWidth = dropdownProps?.style?.width || 0;

    const ButtonRef = useRef<HTMLDivElement>(null);
    const PopperRef = useRef<HTMLDivElement>(null);

    const modifiers: any = useMemo(
        () => [
            { name: "offset", options: { offset: [0, 8] } },
            {
                name: "sameWidth",
                enabled: true,
                fn: ({ state }: any) => {
                    state.styles.popper.width = popperWidth || `${state.rects.reference.width}px`;
                },
                phase: "beforeWrite",
                requires: ["computeStyles"],
                effect: ({ state }: any) => {
                    state.elements.popper.style.width = popperWidth || `${state.elements.reference?.clientWidth || ""}px`;
                },
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const { styles, attributes, update } = usePopper(ButtonRef.current, PopperRef.current, {
        placement: position || "auto",
        modifiers,
    });

    const handleClickOutside = (event: any) => {
        if (ButtonRef?.current && !ButtonRef?.current?.contains(event.target) && PopperRef?.current && !PopperRef?.current?.contains(event.target)) {
            setIsOptionOpen(false);
        }
    };

    // useOutsideAlerter(referenceElement, handleSetToggleButton);

    useEffect(() => {
        if (!isOptionOpen) {
            handleOnSearch("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOptionOpen]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        /**
         * Old condition (value && !chosenValue) => dont remember why use this condition
         * => Change because is have a case that change value from outside
         */
        if (value) {
            const valueObj = options?.find((item) => item.value === value);
            if (valueObj) {
                setChosenValue(valueObj);
            }
        }
        if (!value) {
            // condition for change when another field change
            setChosenValue(null);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, options]);

    useEffect(() => {
        setOptionList(options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    const handleChosenValue = (option: G) => {
        setSearchText("");
        handleChange(option);
        setChosenValue(option);
        if (!openOnClick) {
            setIsOptionOpen(false);
        }
    };

    const handleClearValue = () => {
        onClear && onClear();
        setSearchText("");
        handleChange(undefined);
        setChosenValue(null);
    };

    const handleOnSearch = (keyword: string) => {
        const trimKeyword = keyword?.trim() ?? "";
        if (onSearch) {
            onSearch(trimKeyword);
        } else {
            if (!trimKeyword) setOptionList(options);
            const searchOptions = searchArray(trimKeyword, options);
            setOptionList(searchOptions);
        }
        setSearchText(trimKeyword);
    };

    const openDropdown = () => {
        if (!disabled) {
            setIsOptionOpen(!isOptionOpen);
            update && update();
        }
    };

    return (
        <>
            <div className="option_container" ref={ButtonRef}>
                <div {...buttonProps} className={`select ${buttonProps?.className || ""} ${disabled ? "disabled" : ""}`} onClick={openDropdown}>
                    {customButton ? (
                        <>
                            {customButton({
                                label: chosenValue?.label || "",
                                placeHolder: placeHolder || "",
                                isOptionOpen,
                                handleClearValue,
                            })}
                        </>
                    ) : (
                        <>
                            <span {...selectedText} className={`truncate truncate_1row text_sm_medium ${chosenValue ? "text_primary" : "text_secondary"} ${selectedText?.className || ""} `}>
                                {chosenValue?.label || placeHolder || ""}
                            </span>
                            <div className="icon_group flex_shrink_0">
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearValue();
                                    }}
                                    className={`cursor_pointer input_clear_button select_button button_hover ${chosenValue && clearable && !disabled ? "" : "d_none"}`}></div>
                                <img src={"chevon_down"} className={isOptionOpen ? "active animation_chevon" : "animation_chevon"} alt="" />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div
                {...dropdownProps}
                className={`${isOptionOpen ? "choose_option active shadow_primary" : "choose_option"} 
     ${dropdownProps?.className || ""}  `}
                ref={PopperRef}
                {...attributes.popper}
                style={{
                    ...dropdownProps?.style,
                    ...styles.popper,
                }}>
                {isSearch && isOptionOpen ? <Search value={searchText || ""} style={{ width: "100%", background: "#2f353d" }} placeholder={searchPlaceholder || "Lọc theo"} searchClassName="search_box bg_neu_600 mb_12 edit_btn sticky" setSearchKeyword={handleOnSearch} delay={searchDelay || 0} /> : ""}
                <div
                    className="content_scroll"
                    onScroll={(e) => {
                        const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
                        if (bottom && onScrollToBottom) {
                            onScrollToBottom();
                        }
                    }}>
                    {/* content_scroll */}
                    {RenderOption(optionList, value, handleChosenValue, optionProps)}
                </div>
            </div>
        </>
    );
};

export default SSelect;
