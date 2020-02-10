import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {TooltipService} from './tooltip.service';
import {TooltipComponent} from './tooltip.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    TooltipComponent,
  ],
  declarations: [
    TooltipComponent,
  ],
  entryComponents: [],
  providers: [
    TooltipService,
  ],
})
export class TooltipModule {
}
