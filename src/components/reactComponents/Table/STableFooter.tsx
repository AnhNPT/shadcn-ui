/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import chevon_down from "@/features/NewLayout/assets/images/common/alt-arr-down-20.svg";
// import chevon_left from "@/features/NewLayout/assets/images/common/chevon-left.svg";
// import chevon_right from "@/features/NewLayout/assets/images/common/chevon-right.svg";
import { IParams } from "@/model/shared-models";
import SSelect from "../Select/SSelect";

const paginationList = (page: number, totalPage: number) => {
    // total number visible on left or right when too much page
    const oneSideStep = 4;

    // Total number visible on start side first start
    const leftSide = oneSideStep + 1;

    // total number visible on end side when current page are last
    const rightSide = totalPage - oneSideStep;

    // total number visible
    const step = 1;
    // total number visible on the left when page at middle
    const left = page - step;
    // total number visible on the right when page at middle
    const right = page + step + 1;
    const range: number[] = [];
    const rangeWithDots: string[] = [];
    let displayNumb = 0;

    // get the page list
    for (let i = 1; i <= totalPage; i++) {
        if (
            // auto get start page and last page
            i === 1 ||
            i === totalPage ||
            // if page middle in range
            (i >= left && i < right) ||
            // if page at start range get left to max number
            (page < leftSide && i <= leftSide) ||
            // if page at end range get right to min number
            (page > rightSide && i >= rightSide)
        ) {
            range.push(i);
        }
    }

    // add range to page
    for (const i of range) {
        if (displayNumb) {
            // if page at middle add 2 number at left and right
            if (i - displayNumb === 2) {
                rangeWithDots.push(String(displayNumb + 1));

                // if page too far from the middle transform to ...
            } else if (i - displayNumb !== 1) {
                rangeWithDots.push("...");
            }
        }

        // add page
        rangeWithDots.push(String(i));

        displayNumb = i;
    }

    return rangeWithDots;
};

interface ISTableFooter<T extends IParams> {
    filterState: T;
    totalItem: number;
    sizeArray?: number[];
    setFilterState: (filterState: T) => void;
    handleSetLimit?: (dummt: any) => void;
    handleChosenPage?: (dummt: any) => void;
}

const STableFooter = <T extends IParams>(props: ISTableFooter<T>) => {
    const { filterState, setFilterState, totalItem, sizeArray } = props;
    const arrayLimit: number[] = sizeArray || [10, 50, 100];
    const { page, limit } = filterState;
    const totalPage = Math.ceil(totalItem / limit);

    const startEndIndexCal = () => {
        const endIdx = (page + 1) * limit;
        const startIdx = page * limit + 1;

        return {
            startIdx,
            endIdx: endIdx > (totalItem || 0) ? totalItem : endIdx,
        };
    };

    const handleChosenLimit = (limit: number) => {
        // const newTotalPage = Math.ceil(totalItem / limit);
        // if (filterState.page > newTotalPage) {
        //   setFilterState({ ...filterState, limit, page: newTotalPage - 1 });
        // } else {
        //   setFilterState({ ...filterState, limit });
        // }
        setFilterState({ ...filterState, limit, page: 0 });
    };

    const { endIdx, startIdx } = startEndIndexCal();

    const handlePreviousClick = () => {
        if (page !== 0) {
            setFilterState({ ...filterState, page: page - 1 });
        }
    };

    const handleNextClick = () => {
        if (page !== totalPage - 1) {
            setFilterState({ ...filterState, page: page + 1 });
        }
    };

    const handleChosenPage = (page: number) => () => {
        setFilterState({ ...filterState, page });
    };

    const paginations = paginationList(page + 1, totalPage);

    return (
        <>
            <div className="footer_table_wrapper">
                <div className="footer_container">
                    <div className="left_content">
                        {/* select records */}
                        <SSelect
                            value={filterState.limit}
                            optionProps={{
                                className: "option text_sm_medium text_secondary",
                            }}
                            dropdownProps={{ style: { minWidth: "100px" } }}
                            options={arrayLimit.map((item) => ({ label: item, value: item }))}
                            position="top"
                            buttonProps={{
                                className: "select_label text_sm_medium text_secondary",
                                style: { minWidth: "90px" },
                            }}
                            customButton={({ label, isOptionOpen, placeHolder }) => (
                                <>
                                    <span className="text_sm_medium text_secondary">{label || placeHolder || ""} dòng</span>
                                    <img src={"chevon_down"} className={isOptionOpen ? "active animation_chevon" : "animation_chevon"} alt="" />
                                </>
                            )}
                            handleChange={(value) => {
                                handleChosenLimit(value?.value || 0);
                            }}
                        />
                        <div className="perpage_records  text_sm_medium text_secondary">
                            <p>
                                {startIdx}-{endIdx}
                            </p>{" "}
                            trên <p>{totalItem}</p>
                        </div>
                    </div>
                    <div className="right_content">
                        <div className="table_pagination">
                            <div className={`pagination_items text_xs_medium text_secondary ${page === 0 && "disabled"}`} onClick={handlePreviousClick}>
                                <img src={"chevon_left"} className="" alt="" />
                            </div>

                            {paginations && paginations.length > 0 ? (
                                <>
                                    {paginations.map((item, index) => (
                                        <div key={index} className={`pagination_items  text_xs_medium text_secondary ${page + 1 === Number(item) ? "active disable" : ""} ${item === "..." ? "disable" : ""}`} onClick={handleChosenPage(Number(item) - 1)}>
                                            {item}
                                        </div>
                                    ))}
                                </>
                            ) : (
                                ""
                            )}

                            <div onClick={handleNextClick} className={`pagination_items text_xs_medium text_secondary ${page === totalPage && "disabled"}`}>
                                <img src={"chevon_right"} className="" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default STableFooter;
