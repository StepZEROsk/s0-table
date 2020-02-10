import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {LoadingService} from './loading.service';
import {LoadingComponent} from './loading.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    LoadingComponent,
  ],
  declarations: [
    LoadingComponent,
  ],
  entryComponents: [],
  providers: [
    LoadingService,
  ],
})
export class LoadingModule {
}
