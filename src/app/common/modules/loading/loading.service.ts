import {Injectable} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {LoadingComponent} from './loading.component';

@Injectable()
export class LoadingService {

  constructor(
    private overlay: Overlay,
  ) {}

  show() {
    this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    }).attach(new ComponentPortal(LoadingComponent));
  }
}
