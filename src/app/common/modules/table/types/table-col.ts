import {ComponentType} from '@angular/cdk/portal';
import {Tooltip} from '../../tooltip/types/tooltip';
import {Icon} from '../../icon/types/icon';

export interface TableCol<T> {
  id?: string;
  content: ComponentType<any> | ((e: T) => string) | string;
  contentType: 'COMPONENT' | 'FUNCTION' | 'PATH';
  label: string;
  width: number;
  icon?: Icon | ((e: T) => Icon);
  sort?: boolean;
  sortBy?: (e: T) => string;
  translateBy?: string;
  tooltip?: Tooltip;
}
