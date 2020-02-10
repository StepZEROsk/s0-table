import { Color } from './color';
import { Size } from './size';

export interface Icon {
  name: string;
  badge?: string;
  size?: Size;
  color?: Color;
  clickable?: boolean;
}
