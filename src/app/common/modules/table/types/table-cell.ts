import {ComponentPortal} from '@angular/cdk/portal';
import {Tooltip} from '../../tooltip/types/tooltip';
import {Icon} from '../../icon/types/icon';

export interface TableCell {
  content: ComponentPortal<any> | string;
  contentType: 'TEXT' | 'PORTAL';
  rowData: any;
  width: number;
  tooltip?: Tooltip;
  icon?: Icon;
}
