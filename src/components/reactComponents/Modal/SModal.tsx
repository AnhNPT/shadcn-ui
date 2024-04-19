import { ReactNode, HTMLProps } from "react";

interface ISModal {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
    wrapperProps?: HTMLProps<HTMLDivElement>;
}

const SModal = (props: ISModal) => {
    const { visible, children, wrapperProps } = props;
    return (
        <div {...wrapperProps} className={`modal-bg ${visible ? "active" : ""} ${wrapperProps?.className || ""}`}>
            <div className="modal-content shadow-primary">{children}</div>
        </div>
    );
};

export default SModal;
