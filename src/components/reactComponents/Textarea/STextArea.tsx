import React, { HTMLProps, ReactNode, useRef } from "react";

import { Placement } from "@popperjs/core/lib";
import SFormValid from "../FormValid/SFormValid";
import SToolTips from "../Tooltips/SToolTips";

export interface ISTextArea extends HTMLProps<HTMLTextAreaElement> {
    require?: boolean;
    textAreaIcon?: (invalid: boolean) => React.ReactNode;
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

const STextArea = (props: ISTextArea) => {
    const { resetStyle, require, textAreaIcon, label, optionProps, hasClearButton, invalid, errorMessage, toolTipsErrors, toolTipsPosition, wordCount, labelProps, ...textAreaProps } = props;
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const clearInputValue = () => {
        if (textAreaRef.current) {
            textAreaRef.current.value = "";
        }
    };

    const iconGroupStyle = textAreaIcon
        ? {
              display: "flex",
              width: "100%",
          }
        : {};
    const toolTipsDisabled = !toolTipsErrors ? true : !(errorMessage && invalid);

    return (
        <div {...optionProps} className={`${resetStyle ? "" : "custom-textarea"} ${optionProps?.className || ""}`}>
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
                <div className={`${resetStyle ? "" : "textarea-container"}`}>
                    <div className="relative" style={{ ...iconGroupStyle }}>
                        <textarea ref={textAreaRef} {...textAreaProps} className={`${textAreaProps.type === "file" ? "" : "textarea text-sm-medium text-primary"} ${invalid ? "error" : ""} ${textAreaProps?.className || ""}`} />
                        {hasClearButton ? <div className="cursor-pointer clear-button" onClick={() => clearInputValue()}></div> : ""}
                        {textAreaIcon ? textAreaIcon((errorMessage && invalid) || false) : ""}
                        {!toolTipsErrors ? <SFormValid invalid={!!(errorMessage && invalid)}>{errorMessage}</SFormValid> : ""}
                    </div>
                </div>
            </SToolTips>
        </div>
    );
};

export default STextArea;
