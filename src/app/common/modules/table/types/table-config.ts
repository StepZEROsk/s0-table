import {ComponentType} from '@angular/cdk/portal';
import {TableCol} from './table-col';
import {TableRowBehavior} from './table-row-behavior';
import {Option} from '../../option/types/option';

export interface TableConfig<T> {
  columns: TableCol<T>[];
  tableOptions?: Option[];
  rowOptions?: Option[] | ((e: T) => Option[]);
  rowBehavior?: TableRowBehavior;
  rowDetail?: ComponentType<any>;
  stickyHeader?: boolean;
  emptyMsg?: string;
}
