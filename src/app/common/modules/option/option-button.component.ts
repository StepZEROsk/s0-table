import {Directionality} from '@angular/cdk/bidi';
import {CdkOverlayOrigin, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Option} from './types/option';

@Component({
  selector: 's0-option-button',
  templateUrl: './option-button.component.html',
})
export class OptionButtonComponent {

  @ViewChild(CdkOverlayOrigin, { static: true })
  private overlayOrigin: CdkOverlayOrigin;
  @ViewChild('overlay', { static: true })
  private overlayTemplate: TemplateRef<any>;
  @Input()
  options: Option[];
  @Input()
  disabled = false;
  @Output()
  selected = new EventEmitter<Option>();
  @Output()
  opened = new EventEmitter<boolean>();
  private overlayRef: OverlayRef | null;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private directionality: Directionality,
  ) { }

  selectOption(option: Option) {
    this.selected.emit(option);
  }

  showOverlay() {
    if (!this.disabled) {
      const positionStrategy = this.overlay.position()
        .flexibleConnectedTo(this.overlayOrigin.elementRef)
        .withFlexibleDimensions(true)
        .withPush(true)
        .withViewportMargin(10)
        .withGrowAfterOpen(true)
        .withPositions([
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top',
            offsetX: 0,
            offsetY: 8,
          },
        ]);

      this.overlayRef = this.overlay.create({
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.close(),
        direction: this.directionality.value,
        hasBackdrop: true,
        backdropClass: '',
      });
      this.overlayRef.attach(new TemplatePortal(this.overlayTemplate, this.viewContainerRef));
      this.opened.emit(true);
      this.overlayRef.backdropClick().subscribe(() => {
        this.hideOverlay();
      });
    }
  }

  hideOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.opened.emit(false);
  }
}
