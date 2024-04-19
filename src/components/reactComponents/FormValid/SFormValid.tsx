import { ReactNode } from "react";

interface ISFormValid {
    children: ReactNode;
    invalid?: boolean;
}

const SFormValid = (props: ISFormValid) => {
    const { children, invalid } = props;
    return <div className={`input_error text_xs_medium ${invalid ? "" : "hidden"}`}>{children}</div>;
};

export default SFormValid;
