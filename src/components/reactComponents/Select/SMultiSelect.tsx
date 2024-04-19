/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import chevon_down from "@/features/NewLayout/assets/images/common/alt-arr-down-20.svg";
import select_check from "@/features/NewLayout/assets/images/common/select_check.svg";
import { Placement } from "@popperjs/core/lib";
import { HTMLProps, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { usePopper } from "react-popper";
import SelectSearch from "./SelectSearch";
import SCheckbox from "../Checkbox/SCheckbox";
import Search from "./Search";
import { searchArray } from "@/utils/utils";

export interface IOption<T> {
    label: string | ReactNode | null;
    value: T | null;
}

export interface ISMultiSelectButton {
    label: string | ReactNode | null;
    placeHolder: string;
    isOptionOpen: boolean;
    handleClearValue: () => void;
}

interface ISMultiSelect<T> {
    position?: Placement;
    isSearch?: boolean;
    placeHolder?: string;
    onSearch?: (keyword: string) => void;
    options: IOption<T>[];
    openOnClick?: boolean;
    handleChange: (values: IOption<T>[]) => void;
    clearable?: boolean;
    value: Array<T>;
    buttonProps?: HTMLProps<HTMLDivElement>;
    dropdownProps?: HTMLProps<HTMLDivElement>;
    optionProps?: HTMLProps<HTMLDivElement>;
    customButton?: (props: ISMultiSelectButton) => ReactNode;
    onClear?: () => void;
    disabled?: boolean;
    searchPlaceholder?: string;
    searchDelay?: number;
    chosenValueTemplate?: (chosenValue: IOption<T>[]) => ReactNode;
    selectedText?: HTMLProps<HTMLSpanElement>;
}

const RenderOption = <T,>(options: IOption<T>[], value: Array<T>, handleChosenValue: (option: IOption<T>) => void, optionProps?: HTMLProps<HTMLDivElement>) => (
    <>
        {options.map((item) => (
            <label key={`${item.value}`}>
                <div {...optionProps} className={`option text_xs_medium text_primary ${optionProps?.className || ""}`}>
                    <div className="d_flex align_items_center gap_sm">
                        <SCheckbox checked={item.value !== null && value.includes(item.value)} handleChange={() => handleChosenValue(item)} />
                        {item.label}
                    </div>
                    {item.value !== null && value.includes(item.value) ? <img src={"select_check"} className="" alt="" /> : <div style={{ width: "20px", height: "20px" }}></div>}
                </div>
            </label>
        ))}
    </>
);

const SMultiSelect = <T,>(props: ISMultiSelect<T>) => {
    const { position, options, value, handleChange, openOnClick, buttonProps, dropdownProps, customButton, optionProps, isSearch, onSearch, placeHolder, clearable, onClear, disabled, searchPlaceholder, chosenValueTemplate, searchDelay, selectedText } = props;
    const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
    const [chosenValue, setChosenValue] = useState<IOption<T>[]>([]);
    const [optionList, setOptionList] = useState<IOption<T>[]>([]);
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
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (options.length > 0) {
            // const valueObj = options.filter((item) => value.includes(item.value));
            const valueObj = options.filter((item) => item.value !== null && value.includes(item.value));

            setChosenValue(valueObj);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, options]);

    useEffect(() => {
        setOptionList(options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    const handleChecked = (item: IOption<T>): IOption<T>[] => {
        const isItemChecked = chosenValue.find(({ value }) => value === item.value);
        const newCheckedOrders = isItemChecked ? chosenValue.filter(({ value }) => value !== item.value) : [...chosenValue, item];
        return newCheckedOrders;
    };

    const handleChosenValue = (option: IOption<T>) => {
        if (!openOnClick) {
            setIsOptionOpen(false);
        }
        const newArr: IOption<T>[] = handleChecked(option);
        setSearchText("");
        handleChange(newArr);
        setChosenValue(newArr);
    };

    const handleClearValue = () => {
        onClear && onClear();
        setSearchText("");
        handleChange([]);
        // setChosenValue(null);
        setChosenValue([]);
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
                                label: chosenValue.map((item) => item.label).join(", "),
                                placeHolder: placeHolder || "",
                                isOptionOpen,
                                handleClearValue,
                            })}
                        </>
                    ) : (
                        <>
                            {chosenValueTemplate ? (
                                <>{chosenValueTemplate(chosenValue)}</>
                            ) : (
                                <span {...selectedText} className={` truncate truncate_1row text_sm_medium ${chosenValue.length > 0 ? "text_primary" : "text_secondary"} ${selectedText?.className || ""}`}>
                                    {chosenValue.length > 0 ? chosenValue.map((item) => item.label).join(", ") : placeHolder || ""}
                                </span>
                            )}

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
                {isSearch ? <Search value={searchText} style={{ width: "100%", background: "#2f353d" }} placeholder={searchPlaceholder || "Lọc theo"} searchClassName="search_box bg_neu_600 mb_12 edit_btn sticky" setSearchKeyword={handleOnSearch} delay={searchDelay || 0} /> : ""}
                <div className="content_scroll">
                    {/* content_scroll */}
                    {RenderOption(optionList, value, handleChosenValue, optionProps)}
                </div>
            </div>
        </>
    );
};

export default SMultiSelect;
