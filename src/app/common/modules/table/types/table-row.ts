import {ComponentPortal} from '@angular/cdk/portal';
import {TableCell} from './table-cell';
import {Option} from '../../option/types/option';

export interface TableRow<T> {
  options: Option[];
  cells: TableCell[];
  data: T;
  detail: ComponentPortal<any>;
}
