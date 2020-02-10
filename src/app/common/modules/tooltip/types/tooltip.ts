import {ComponentType} from '@angular/cdk/portal';
import {Size} from './size';

export interface Tooltip {
  content: ComponentType<any>;
  size: Size;
}
