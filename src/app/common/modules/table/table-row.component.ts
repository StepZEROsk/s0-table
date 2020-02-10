import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableRow} from './types/table-row';
import {Option} from '../option/types/option';

@Component({
  selector: 's0-table-row',
  templateUrl: './table-row.component.html',
})
export class TableRowComponent {
  @Input()
  row: TableRow<any>;
  @Input()
  clickable: boolean;
  @Output()
  rowClick = new EventEmitter<TableRow<any>>();
  @Output()
  optionSelect = new EventEmitter<Option>();
  expanded = false;
  highlighted = false;

  onRowClick() {
    if (this.row.detail) {
      this.expanded = !this.expanded;
      this.highlighted = this.expanded;
    }
    this.rowClick.emit(this.row);
  }

  onOptionSelect(option: Option) {
    this.optionSelect.emit(option);
  }

  onOptionOpen(opened: boolean) {
    this.highlighted = this.expanded || opened;
  }
}
