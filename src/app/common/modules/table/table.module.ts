import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TableCellComponent} from './table-cell.component';
import {TableHeadComponent} from './table-head.component';
import {TableRowComponent} from './table-row.component';
import {TableService} from './table.service';
import {IconModule} from '../icon/icon.module';
import {OptionModule} from '../option/option.module';
import {TooltipModule} from '../tooltip/tooltip.module';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
    IconModule,
    OptionModule,
    TooltipModule,
  ],
  exports: [
    TableHeadComponent,
    TableRowComponent,
    TableCellComponent,
  ],
  declarations: [
    TableHeadComponent,
    TableRowComponent,
    TableCellComponent,
  ],
  entryComponents: [],
  providers: [
    TableService,
  ],
})
export class TableModule {
}
