/* eslint-disable linebreak-style */
import { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import STableBody from './STableBody';
import STableHeader from './STableHeader';
// import Checkbox from '../commonComponent/Checkbox';

export interface STableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Highlight a table row or cell
   */
  active?: boolean;
  /**
   * Set the vertical aligment.
   */
  align?: 'bottom' | 'middle' | 'top' | string;
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
}

export interface ScopedColumns {
  [key: string]: any;
}

export interface Column {
  label?: string | ReactNode;
  key: string;
  width: string;
  _style?: any;
  className?: string;
}

export interface ColumnTopTile {
  label?: string | ReactNode;
  width: string;
}

export interface Item {
  [key: string]: number | string | any;
}

interface STable extends HTMLAttributes<HTMLDivElement> {
  /**
   * Add border to any table row within the table body.
   */
  striped?: boolean;
  /**
   * Add zebra-striping to any table row within the table body.
   */
  zebra?: boolean;
  /**
   * Style table items as clickable.
   */
  clickableRows?: boolean;
  /**
   * ReactNode or string for passing custom noItemsLabel texts.
   */
  noItemsLabel?: string | ReactNode;
  /**
   * Prop for table columns configuration. If prop is not defined, table will display columns based on the first item keys, omitting keys that begins with underscore (e.g. '_classes')
   *
   * In columns prop each array item represents one column. Item might be specified in two ways:
   * String: each item define column name equal to item value.
   * Object: item is object with following keys available as column configuration:
   * - key (required)(String) - define column name equal to item key.
   * - label (String|ReactNode) - define visible label of column.
   * - _classes (String/Array/Object) - adds classes to all cels in column
   * - _style (String/Array/Object) - adds styles to the column header (useful for defining widths)
   */
  columns: Column[];
  /**
   * Prop for table columns configuration. If prop is not defined, table will display columns based on the first item keys, omitting keys that begins with underscore (e.g. '_classes')
   *
   * In columns prop each array item represents one column. Item might be specified in two ways:
   * String: each item define column name equal to item value.
   * Object: item is object with following keys available as column configuration:
   * - key (required)(String) - define column name equal to item key.
   * - label (String|ReactNode) - define visible label of column.
   * - _classes (String/Array/Object) - adds classes to all cels in column
   * - _style (String/Array/Object) - adds styles to the column header (useful for defining widths)
   */
  columnsTopTitle?: ColumnTopTile[];
  /**
   * Array of objects, where each object represents one item - row in table. Additionally, you can add style classes to each row by passing them by '_props' key and to single cell by '_cellProps'.
   *
   * Example item:
   * `{ name: 'John' , age: 12, _props: { color: 'success' }, _cellProps: { age: { className: 'fw-bold'}}}`
   */
  items: Item[];
  /**
   * Row click callback.
   */
  onRowClick?: (item: Item, index: number, columnName: string, event: MouseEvent | boolean) => void;
  /**
   * Custom  table row classname callback
   */
  renderRowClassname?: (item: Item, index: number) => void;
  /**
   * Scoped columns.
   */
  scopedColumns?: ScopedColumns;
  /**
   * Remove table heading
   */
  noHeading?: boolean;
  /**
   * Custom table content wrapper height (%, px, vh, ......)
   */
  tableContentHeight?: string;

  /**
   * Custom table content wrapper max height (%, px, vh, ......)
   */
  tableMaxHeight?: string;

  /**
   * Render react node when no item
   */
  noItemContent?: React.ReactNode;
  /**
   * default table heading
   */
  defaultHeading?: boolean;
}

const STable = (props: STable) => {
  const {
    clickableRows,
    columns,
    items,
    noItemsLabel,
    onRowClick,
    scopedColumns,
    columnsTopTitle,
    striped,
    noHeading,
    tableContentHeight,
    tableMaxHeight,
    zebra,
    noItemContent,
    renderRowClassname,
    defaultHeading,
    ...rest
  } = props;

  return (
    <>
      <div className={`${noHeading ? '' : 'main_container'}`}>
        {/* table head and table */}
        {columnsTopTitle && columnsTopTitle.length > 0 ? (
          <div className="table_top_title">
            {columnsTopTitle.map((item, index) => (
              <div
                key={index}
                className="title_info_card text_xs_bold text_secondary"
                style={{ width: item.width }}>
                <span>{item.label || ''}</span>
              </div>
            ))}
          </div>
        ) : null}

        {/* table */}
        <div
          className={`table_wrapper ${striped ? 'table_border' : ''} ${
            zebra ? 'table_event_odd' : ''
          }`}>
          <div
            style={{
              height: `${tableContentHeight ? tableContentHeight : ''}`,
              maxHeight: `${tableMaxHeight ? tableMaxHeight : ''}`,
            }}
            className={`${noHeading ? 'table_content mb_xl' : 'table_content'}`}>
            <table
              style={{ width: '100%' }}
              role="table"
              className={`${striped ? 'table_list' : ''}`}>
              <STableHeader
                noHeading={noHeading}
                columns={columns}
                striped={striped}
                defaultHeading={defaultHeading}
              />
              <STableBody
                items={items}
                striped={striped}
                columns={columns}
                clickableRows={clickableRows}
                noItemsLabel={noItemsLabel}
                onRowClick={onRowClick}
                scopedColumns={scopedColumns}
                noHeading={noHeading}
                noItemContent={noItemContent}
                renderRowClassname={renderRowClassname}
              />
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default STable;
