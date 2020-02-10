import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {OptionService} from './option.service';
import {OptionButtonComponent} from './option-button.component';
import {IconModule} from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    IconModule,
  ],
  exports: [
    OptionButtonComponent,
  ],
  declarations: [
    OptionButtonComponent,
  ],
  entryComponents: [],
  providers: [
    OptionService,
  ],
})
export class OptionModule {
}
