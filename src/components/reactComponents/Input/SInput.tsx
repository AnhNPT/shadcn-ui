import React, { HTMLProps, ReactNode, useRef } from "react";
import { Placement } from "@popperjs/core/lib";
import SToolTips from "../Tooltips/SToolTips";
import SFormValid from "../FormValid/SFormValid";

export interface ISInput extends HTMLProps<HTMLInputElement> {
    require?: boolean;
    inputIcon?: (invalid: boolean) => React.ReactNode;
    label?: string;
    optionProps?: HTMLProps<HTMLDivElement>;
    hasClearButton?: boolean;
    invalid?: boolean;
    errorMessage?: ReactNode;
    toolTipsErrors?: boolean;
    toolTipsPosition?: Placement;
    wordCount?: number;
    labelProps?: HTMLProps<HTMLLabelElement>;
    resetStyle?: boolean;
}

const SInput = (props: ISInput) => {
    const { resetStyle, require, inputIcon, label, optionProps, hasClearButton, invalid, errorMessage, toolTipsErrors, toolTipsPosition, wordCount, labelProps, ...inputProps } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const clearInputValue = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const iconGroupStyle = inputIcon
        ? {
              display: "flex",
              width: "100%",
          }
        : {};
    const toolTipsDisabled = !toolTipsErrors ? true : !(errorMessage && invalid);

    return (
        <div {...optionProps} className={`${resetStyle ? "" : "custom-input"} ${optionProps?.className || ""}`}>
            {label ? (
                <div className="flex justify-between items-center">
                    <label {...labelProps} className={`text-sm-medium text-primary ${labelProps?.className || ""}`}>
                        {label}
                        {require && <span className="ml-1.5 text-red-400">*</span>}
                    </label>
                    {wordCount !== undefined && wordCount !== null ? <span className="text-xs-medium text-secondary">{wordCount}</span> : ""}
                </div>
            ) : (
                ""
            )}
            <SToolTips position={toolTipsPosition || "top"} disabled={toolTipsDisabled} label={errorMessage}>
                <div className={`${resetStyle ? "" : "input-container"}`}>
                    <div className="relative" style={{ ...iconGroupStyle }}>
                        <input ref={inputRef} {...inputProps} className={`${inputProps.type === "file" ? "" : "input text-sm-medium text-primary"} ${invalid ? "error" : ""} ${inputProps?.className || ""}`} />
                        {hasClearButton ? <div className="cursor-pointer clear-button" onClick={() => clearInputValue()}></div> : ""}
                        {inputIcon ? inputIcon((errorMessage && invalid) || false) : ""}
                        {!toolTipsErrors ? <SFormValid invalid={!!(errorMessage && invalid)}>{errorMessage}</SFormValid> : ""}
                    </div>
                </div>
            </SToolTips>
        </div>
    );
};

export default SInput;
