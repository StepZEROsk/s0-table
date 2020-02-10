import {Component} from '@angular/core';
import {TableRow} from '../common/modules/table/types/table-row';
import {User} from '../common/rest/entities/user';
import {TableRowAction} from '../common/modules/table/types/table-row-action';

@Component({
  selector: 's0-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent {

  onTableRowClick(row: TableRow<User>) {
    console.log('onTableRowClick', row);
  }

  onTableRowActionSelect(rowAction: TableRowAction<User>) {
    console.log('onTableRowActionSelect', rowAction);
  }
}
