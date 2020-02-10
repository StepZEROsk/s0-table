import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableCol} from './types/table-col';
import {TableConfig} from './types/table-config';
import {TableSort} from './types/table-sort';

@Component({
  selector: 's0-table-head',
  templateUrl: './table-head.component.html',
})
export class TableHeadComponent<T> {
  @Input()
  config: TableConfig<T>;
  @Input()
  columns: TableCol<T>;
  @Input()
  disabled: boolean;
  @Input()
  loading: boolean;
  @Output()
  sort = new EventEmitter<TableSort<T>>();
  sortParams: TableSort<T> = null;

  onSortClick(col: TableCol<T>) {
    if (this.sortParams && this.sortParams.colId === col.id) {
      if (this.sortParams.order === 'ASC') {
        this.sortParams.order = 'DESC';
      } else {
        this.sortParams = null;
      }
    } else {
      this.sortParams = {
        colId: col.id,
        sortBy: col.sortBy,
        order: 'ASC',
      };
    }
    this.sort.emit(this.sortParams);
  }
}
