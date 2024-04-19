import { Column } from './STable';

interface ISTableHeader {
  /**
   * Add zebra-striping to any table row within the table body.
   */
  striped?: boolean;
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

  noHeading?: boolean;

  /**
   * default table heading
   */
  defaultHeading?: boolean;
}

const STableHeader = ({ columns, striped, noHeading, defaultHeading }: ISTableHeader) => {
  /**
   * Table Header Cell render
   */
  const tableClassName = `${
    striped && !defaultHeading ? 'heading_table_list' : 'heading_table'
  } text_xs_bold ${noHeading ? 'heading_none' : ''}`;

  const tableHeaderCellClassname = (column: Column): string => {
    if (typeof column === 'object' && column.className) {
      return tableClassName + ' ' + column.className;
    }
    return tableClassName;
  };

  const tableHeaderCellStyles = (column: Column) => {
    if (typeof column === 'object' && column._style) {
      return { ...column._style, width: column.width };
    }
    return { width: column.width };
  };

  const pretifyName = (name: string) => {
    return name
      .replace(/[-_.]/g, ' ')
      .replace(/ +/g, ' ')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const label = (column: Column | string) =>
    typeof column === 'object'
      ? column.label !== undefined
        ? column.label
        : pretifyName(column.key)
      : pretifyName(column);

  return (
    <thead>
      <tr role="row" className="table_row_head">
        {columns.map((column: Column, index: number) => {
          return (
            <th
              className={tableHeaderCellClassname(column)}
              style={tableHeaderCellStyles(column)}
              key={index}>
              {/* <div className="d-inline">{label(column)}</div> */}
              {label(column)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default STableHeader;
