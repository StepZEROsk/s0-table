import {Component, Input} from '@angular/core';
import {Size} from './types/size';

@Component({
  selector: 's0-tooltip',
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent {
  @Input()
  size: Size = 'sm';
}
