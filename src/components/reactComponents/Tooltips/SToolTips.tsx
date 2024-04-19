/* eslint-disable react-hooks/exhaustive-deps */
import { Placement } from "@popperjs/core/lib";
import { usePopper } from "react-popper";
import { ReactNode, useEffect, useRef } from "react";

interface ISToolTips {
    label: ReactNode;
    position?: Placement;
    children?: ReactNode;
    wrapperClass?: string;
    alwaysVisible?: boolean;
    disabled?: boolean;
}

const SToolTips = (props: ISToolTips) => {
    const { label, position, children, wrapperClass, alwaysVisible, disabled } = props;

    const ButtonRef = useRef<HTMLDivElement>(null);
    const PopperRef = useRef<HTMLDivElement>(null);
    // const [arrowRef, setArrowRef] = useState(null);
    const ArrowRef = useRef<HTMLDivElement>(null);

    const { styles, attributes, update } = usePopper(ButtonRef.current, PopperRef.current, {
        placement: position || "auto",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: "arrow",
                options: {
                    element: ArrowRef.current,
                },
            },
        ],
    });

    const showToolTips = () => {
        if (PopperRef?.current) {
            PopperRef.current.setAttribute("data-show", "show");
            update && update();
        }
    };

    useEffect(() => {
        if (alwaysVisible && ButtonRef.current) {
            showToolTips();
        }
    }, [alwaysVisible, ButtonRef.current]);

    const hideToolTips = () => {
        if (PopperRef?.current && !alwaysVisible) {
            PopperRef.current.removeAttribute("data-show");
        }
    };

    return (
        <>
            <div
                ref={ButtonRef}
                className={wrapperClass || ""}
                onMouseEnter={() => {
                    if (!disabled) {
                        showToolTips();
                    }
                }}
                onMouseLeave={hideToolTips}>
                {children}
            </div>
            <div className="tt-wrap" style={styles.popper} ref={PopperRef} {...attributes.popper}>
                <div className="tooltip-wrapper">
                    <div className="tooltip-container">{typeof label === "string" ? <span className="text-sm-medium">{label}</span> : <>{label}</>}</div>
                </div>
                <div ref={ArrowRef} style={styles.arrow} {...attributes.arrow} id="arrow" className="tooltip-arrow"></div>
            </div>
        </>
    );
};

export default SToolTips;
