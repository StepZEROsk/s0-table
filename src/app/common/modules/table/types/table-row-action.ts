import {Option} from '../../option/types/option';
import {TableRow} from './table-row';

export interface TableRowAction<T> {
  action: Option;
  row: TableRow<T>;
}
