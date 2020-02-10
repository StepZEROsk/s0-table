import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TableModule} from '../common/modules/table/table.module';
import {LoadingModule} from '../common/modules/loading/loading.module';
import {ExampleComponent} from './example.component';
import {ExampleTableComponent} from './table/example-table.component';
import {CustomCellComponent} from './table/cells/custom-cell.component';
import {CityTooltipComponent} from './table/tooltips/city-tooltip.component';
import {UserRestService} from '../common/rest/services/user-rest.service';
import {RowDetailComponent} from './table/row-detail/row-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    TableModule,
    LoadingModule,
  ],
  exports: [
    ExampleComponent,
  ],
  declarations: [
    ExampleComponent,
    ExampleTableComponent,
    CustomCellComponent,
    CityTooltipComponent,
    RowDetailComponent,
  ],
  entryComponents: [
    CustomCellComponent,
    CityTooltipComponent,
    RowDetailComponent,
  ],
  providers: [
    UserRestService,
  ],
})
export class ExampleModule { }
