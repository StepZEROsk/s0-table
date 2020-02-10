import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {IconComponent} from './icon.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    IconComponent,
  ],
  declarations: [
    IconComponent,
  ],
  entryComponents: [],
  providers: [],
})
export class IconModule {
}
