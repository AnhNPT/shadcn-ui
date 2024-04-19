import React, { MouseEvent, ReactNode } from 'react';
import { Column, Item, ScopedColumns } from './STable';

interface ISTableBody {
  /**
   * Add zebra-striping to any table row within the table body.
   */
  striped?: boolean;
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
   * Scoped columns.
   */
  scopedColumns?: ScopedColumns;
  noHeading?: boolean;

  /**
   * Render react node when no item
   */
  noItemContent?: React.ReactNode;
  /**
   * Custom  tabler row classname callback
   */
  renderRowClassname?: (item: Item, index: number) => void;
}

const STableBody = (props: ISTableBody) => {
  const {
    items,
    noItemContent,
    striped,
    noItemsLabel,
    onRowClick,
    scopedColumns,
    columns,
    noHeading,
    renderRowClassname,
  } = props;

  const rawColumnNames = columns.map((column: any) => {
    if (typeof column === 'object') return column.key;
    else return column;
  });

  const getColumnName = (event: MouseEvent): string => {
    const target = event.target as HTMLTextAreaElement;
    const closest = target.closest('tr');
    const children = closest ? Array.from(closest.children) : [];
    const clickedCell = children.filter((child) => child.contains(target))[0];
    return rawColumnNames[children.indexOf(clickedCell)];
  };

  const renderElement = (item: ReactNode, key: number) => (
    <React.Fragment key={key}>{item}</React.Fragment>
  );

  return (
    <tbody>
      {items.map((item: Item, trIndex) => {
        return (
          <React.Fragment key={trIndex}>
            <tr
              role="row"
              className={`row_hover border_b ${
                renderRowClassname ? renderRowClassname(item, trIndex) : ''
              }`}
              onClick={(event) =>
                onRowClick && onRowClick(item, trIndex, getColumnName(event), event)
              }>
              {rawColumnNames.map((colName, index) => {
                const columsClassName = `${striped ? 'body_table_list' : 'body_table'}  ${
                  noHeading ? 'p_md' : ''
                }`;
                return (
                  //   (scopedColumns &&
                  //     scopedColumns[colName] &&
                  //     React.cloneElement(scopedColumns[colName](item, trIndex), {
                  //       key: index,
                  //     })) || <td key={index}>{String(item[colName])}</td>
                  (scopedColumns &&
                    scopedColumns[colName] &&
                    renderElement(
                      scopedColumns[colName](item, columsClassName, trIndex),
                      index
                    )) || (
                    <td key={index} role="cell" className={columsClassName}>
                      <span className="text_sm_medium text_secondary">
                        {String(item[colName] ?? '-')}
                      </span>
                    </td>
                  )
                );
              })}
            </tr>
          </React.Fragment>
        );
      })}
      {!items.length && (
        <tr>
          <td colSpan={rawColumnNames.length}>{noItemContent || noItemsLabel || ''}</td>
        </tr>
      )}
    </tbody>
  );
};

export default STableBody;
