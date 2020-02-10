import {ComponentPortal, ComponentType, PortalInjector} from '@angular/cdk/portal';
import {Injectable, Injector} from '@angular/core';
import * as uuid from 'uuid';
import {ROW_DATA} from './table.tokens';
import {TableCell} from './types/table-cell';
import {TableCol} from './types/table-col';
import {TableConfig} from './types/table-config';
import {TableRow} from './types/table-row';
import {TableSort} from './types/table-sort';
import {Option} from '../option/types/option';
import {OptionService} from '../option/option.service';
import {Icon} from '../icon/types/icon';

@Injectable()
export class TableService<T> {
  constructor(
    private injector: Injector,
    private optionService: OptionService,
  ) {}

  sortInputData(inputData: T[], sortParams: TableSort<T>): T[] {
    const order = sortParams.order === 'ASC' ? 1 : -1;

    return [...inputData].sort((a, b) => {
      const aValue = sortParams.sortBy(a);
      const bValue = sortParams.sortBy(b);
      return aValue.localeCompare(bValue) * order;
    });
  }

  getTableColumns(config: TableConfig<T>): TableCol<T>[] {
    const columns: TableCol<T>[] = [];
    let totalWidth = 0;

    config.columns.forEach((col) => {
      totalWidth += col.width;
      columns.push({
        id: uuid.v4(),
        ...col,
      });
    });

    if (totalWidth !== 100) {
      console.error('Invalid table width.');
    }

    return columns;
  }

  getTableRows(config: TableConfig<T>, columns: TableCol<T>[], inputData: T[]): TableRow<T>[] {
    const tableRows: TableRow<T>[] = [];

    inputData.forEach((row) => {
      tableRows.push({
        cells: this.getRowCells(columns, row),
        options: this.getRowOptions(config, row),
        data: row,
        detail: this.getRowDetail(config.rowDetail, row),
      });
    });

    return tableRows;
  }

  private getRowOptions(config: TableConfig<T>, rowData: T): Option[] {
    if (config.rowOptions && {}.toString.call(config.rowOptions) === '[object Function]') {
      return (config.rowOptions as (e) => Option[]).call(null, rowData);
    } else {
      return config.rowOptions as Option[] || null;
    }
  }

  private getRowDetail(component: ComponentType<any>, rowData: T): ComponentPortal<any> {
    if (component) {
      const injectionTokens: WeakMap<any, any> = new WeakMap();
      injectionTokens.set(ROW_DATA, rowData);
      return new ComponentPortal(component as ComponentType<any>, null, new PortalInjector(this.injector, injectionTokens));
    } else {
      return null;
    }
  }

  private getRowCells(columns: TableCol<T>[], rowData: T): TableCell[] {
    const rowCells: TableCell[] = [];
    columns.forEach((col: TableCol<T>) => {
      rowCells.push(this.getTableCell(col, rowData));
    });
    return rowCells;
  }

  private getTableCell(col: TableCol<T>, rowData: T): TableCell {
    return {
      content: this.getTableCellContent(col, rowData),
      contentType: col.contentType === 'COMPONENT' ? 'PORTAL' : 'TEXT',
      tooltip: col.tooltip,
      icon: this.getTableCellIcon(col, rowData),
      width: col.width,
      rowData,
    };
  }

  private getTableCellIcon(col: TableCol<T>, rowData: T): Icon {
    if (col.icon && {}.toString.call(col.icon) === '[object Function]') {
      return (col.icon as (e) => Icon).call(null, rowData);
    } else {
      return col.icon || null;
    }
  }

  private getTableCellContent(col: TableCol<T>, rowData: T): ComponentPortal<any> | string {
    if (col.contentType === 'COMPONENT' ) {
      const injectionTokens: WeakMap<any, any> = new WeakMap();
      injectionTokens.set(ROW_DATA, rowData);
      return new ComponentPortal(col.content as ComponentType<any>, null, new PortalInjector(this.injector, injectionTokens));
    } else if (col.contentType === 'FUNCTION') {
      return (col.content as (e) => string).call(null, rowData);
    } else {
      const cellValue: string = this.getValueByPropertyPath(col.content as string, rowData);

      if (col.translateBy) {
        const option = this.optionService.getOption(cellValue, col.translateBy);
        return option ? option.label : null;
      } else {
        return cellValue;
      }

    }
  }

  private getValueByPropertyPath(path: string, rowData: T): string {
    return path.split('.').reduce((a, b) => a && a[b], rowData);
  }
}
