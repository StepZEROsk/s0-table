import { Component, Input } from '@angular/core';
import { Color } from './types/color';
import { Name } from './types/name';
import { Size } from './types/size';


@Component({
  selector: 's0-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent {

  @Input() name: Name;
  @Input() size: Size = 'sm';
  @Input() color: Color = 'primary';
  @Input() clickable: boolean;

  constructor() { }
}
