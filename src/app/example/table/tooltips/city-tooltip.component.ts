import {Component, Inject} from '@angular/core';
import {ROW_DATA} from '../../../common/modules/table/table.tokens';
import {User} from '../../../common/rest/entities/user';

@Component({
  templateUrl: './city-tooltip.component.html',
})
export class CityTooltipComponent {
  constructor(
    @Inject(ROW_DATA) public rowData: User,
  ) { }
}
