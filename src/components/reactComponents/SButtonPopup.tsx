/* eslint-disable react-hooks/exhaustive-deps */
import { Placement } from "@popperjs/core/lib";
import { HTMLProps, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { usePopper } from "react-popper";

interface IChildrenExport {
    setToggleButton: (visible: boolean) => void;
    toggleButton: boolean;
}

interface IRenderInput {
    handleOnButtonClick: () => void;
    setToggleButton: (visible: boolean) => void;
    toggleButton: boolean;
}

interface ISButtonPopup {
    buttonLayout: ReactNode; //Remove this props when change all SButtonPopup to use buttonLayourRender
    children: (props: IChildrenExport) => ReactNode;
    position: Placement;
    buttonLayoutRender?: (props: IChildrenExport) => ReactNode;
    disabledPopup?: boolean;
    onOutsideClick?: () => void;
    onButtonClick?: (toggle: boolean) => void;
    buttonProps?: HTMLProps<HTMLDivElement>;
    wrapperProps?: HTMLProps<HTMLDivElement>;
    popupProps?: HTMLProps<HTMLDivElement>;
    clearDefaultClass?: boolean;
    disabled?: boolean;
    renderInput?: (props: IRenderInput) => ReactNode;
    popupSyncLayout?: boolean;
}

const SButtonPopup = (props: ISButtonPopup) => {
    const { buttonLayout, children, position, buttonLayoutRender, disabledPopup, onOutsideClick, onButtonClick, buttonProps, wrapperProps, popupProps, clearDefaultClass, disabled, renderInput, popupSyncLayout } = props;
    const [toggleButton, setToggleButton] = useState<boolean>(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const popperRef = useRef<HTMLDivElement>(null);
    const popperWidth = popupProps?.style?.width || 0;

    const modifiers: any = useMemo(
        () => [
            {
                name: "offset",
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: "sameWidth",
                enable: true,
                fn: ({ state }: any) => {
                    state.styles.popper.width = popupSyncLayout ? `${state.rects.reference.width}px` : popperWidth || "fit-content";
                },
                phase: "beforeWrite",
                requires: ["computeStyle"],
                effect: ({ state }: any) => {
                    state.elements.popper.style.width = popupSyncLayout ? `${state.elements.reference?.clientWidth || ""}px` : popperWidth || "fit-content";
                },
            },
        ],
        []
    );
    const { styles, attributes, update } = usePopper(buttonRef.current, popperRef.current, {
        placement: position || "auto",
        modifiers,
    });

    const handleClickOutside = (event: any) => {
        if (buttonRef?.current && !buttonRef?.current?.contains(event.target) && popperRef?.current && !popperRef?.current?.contains(event.target)) {
            onOutsideClick && onOutsideClick();
            setToggleButton(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOnButtonClick = () => {
        if (!disabled) {
            onButtonClick && onButtonClick(!toggleButton);
            setToggleButton(!toggleButton);
            update && update();
        }
    };

    return (
        <>
            <div {...wrapperProps} className={`sbutton-wrapper ${wrapperProps?.className || ""}`} ref={buttonRef}>
                {renderInput ? (
                    <>{renderInput({ handleOnButtonClick, setToggleButton, toggleButton })}</>
                ) : (
                    <div {...buttonProps} className={`${clearDefaultClass ? "" : `sbutton-select ${disabled ? "disabled" : ""}`}`} onClick={disabled ? undefined : buttonProps?.onClick ? buttonProps?.onClick : handleOnButtonClick}>
                        {buttonLayoutRender ? buttonLayoutRender({ setToggleButton, toggleButton }) : buttonLayout}
                    </div>
                )}
            </div>
            <div {...popupProps} className={`sbutton-option shadow-primary ${popupProps?.className || ""} ${toggleButton === true ? "flex" : "hidden"}`} ref={popperRef} style={{ ...popupProps?.style, ...styles.popper }} {...attributes.popper}>
                {children({ setToggleButton, toggleButton })}
            </div>
        </>
    );
};

export default SButtonPopup;
