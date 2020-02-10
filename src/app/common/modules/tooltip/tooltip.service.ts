import {Directionality} from '@angular/cdk/bidi';
import {
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy
} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {Injectable, Injector} from '@angular/core';
import {fromEvent, merge, Observable, Subject} from 'rxjs';
import {auditTime, filter, first, mapTo, takeUntil} from 'rxjs/operators';

@Injectable()
export class TooltipService {
  private overlayRef: OverlayRef | null;
  private unsubscribe$: Subject<any> = new Subject();
  tooltipPosition$: Observable<ConnectedOverlayPositionChange>;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private directionality: Directionality,
  ) {}

  showTooltip(tooltip: TemplatePortal<any>, tooltipOrigin: CdkOverlayOrigin) {
    this.hideTooltip();

    this.overlayRef = this.overlay.create(this.getOverlayConfig(tooltipOrigin));
    this.overlayRef.attach(tooltip);

    merge(
      fromEvent(tooltipOrigin.elementRef.nativeElement, 'mouseenter').pipe(mapTo('enter')),
      fromEvent(this.overlayRef.hostElement, 'mouseenter').pipe(mapTo('enter')),
      fromEvent(tooltipOrigin.elementRef.nativeElement, 'mouseleave').pipe(mapTo('leave')),
      fromEvent(this.overlayRef.hostElement, 'mouseleave').pipe(mapTo('leave')),
    ).pipe(
      auditTime(200),
      filter(n => n === 'leave'),
      first(),
      takeUntil(this.unsubscribe$),
    ).subscribe(() => {
      this.hideTooltip();
    });
  }

  hideTooltip() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    this.unsubscribe$.next();
  }

  private getOverlayConfig(tooltipOrigin: CdkOverlayOrigin): OverlayConfig {
    return {
      positionStrategy: this.getTooltipPositionStrategy(tooltipOrigin),
      scrollStrategy: this.overlay.scrollStrategies.close(),
      direction: this.directionality.value,
    };
  }

  private getTooltipPositionStrategy(tooltipOrigin: CdkOverlayOrigin): PositionStrategy {
    const pS: FlexibleConnectedPositionStrategy = this.overlay.position().flexibleConnectedTo(tooltipOrigin.elementRef);
    this.tooltipPosition$ = pS.positionChanges;
    return pS
      .withFlexibleDimensions(true)
      .withPush(true)
      .withViewportMargin(10)
      .withGrowAfterOpen(true)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetX: -18,
          offsetY: -5,
        },
      ]);
  }
}
