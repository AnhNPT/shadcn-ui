import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

interface ISButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
}

const SButton = (props: ISButton) => {
    const { children, ...buttonProps } = props;

    return (
        <button {...buttonProps} className={`button ${buttonProps?.className || ""}`} type={buttonProps?.type || "button"}>
            {children}
        </button>
    );
};

export default SButton;
