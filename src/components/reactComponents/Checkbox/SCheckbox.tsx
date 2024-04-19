import { useEffect, useState, ChangeEvent } from "react";

const getInputType = (type?: "radio" | "checkbox" | "switch") => {
    switch (type) {
        case "radio":
            return "radio";
        default:
            return "checkbox";
    }
};

const getTypeClassName = (type?: "radio" | "checkbox" | "switch") => {
    switch (type) {
        case "radio":
            return "custom-radio";
        case "checkbox":
            return "custom-checkbox";
        default:
            return "custom-checkbox";
    }
};

const checkBoxBg = (style?: number) => {
    switch (style) {
        case 2:
            return "checkbox-bg-2";
        case 3:
            return "checkbox-bg-2";
        default:
            return "checkbox-bg-default";
    }
};

export interface ISCheckbox {
    style?: number;
    type?: "radio" | "checkbox" | "switch";
    checked?: boolean;
    indeterminate?: boolean;
    bgDark?: boolean;
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    disabled?: boolean;
}

const SCheckbox = (props: ISCheckbox) => {
    const { indeterminate, style, checked, type, bgDark, handleChange, name, disabled } = props;
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        setIsChecked(checked || false);
    }, [checked]);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleChange && handleChange(event);
    };

    const inputType = getInputType(type);
    const typeClassName = getTypeClassName(type);
    const checkBoxBgClass = checkBoxBg(style);

    return (
        <div className="checkbox-wrapper z-0">
            <div className={`${checkBoxBgClass}`}>
                <label className={`caret-transparent ${typeClassName} ${disabled ? "disabled" : ""} ${bgDark ? "bg-dark" : ""} ${isChecked ? "checked" : ""}`}>
                    <input type={inputType} name={name || ""} disabled={disabled} onChange={handleCheckboxChange} checked={isChecked} />
                    <span className={`checkmark ${indeterminate ? "line" : ""}`}></span>
                </label>
            </div>
        </div>
    );
};

export default SCheckbox;
