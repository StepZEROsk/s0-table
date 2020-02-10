import {Directionality} from '@angular/cdk/bidi';
import {CdkOverlayOrigin, ComponentType, ConnectionPositionPair, Overlay} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector, TemplatePortal} from '@angular/cdk/portal';
import {AfterViewInit, Component, HostBinding, Injector, Input, OnDestroy, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {ROW_DATA} from './table.tokens';
import {TableCell} from './types/table-cell';
import {TooltipService} from '../tooltip/tooltip.service';

@Component({
  selector: 's0-table-cell',
  templateUrl: './table-cell.component.html',
})
export class TableCellComponent implements AfterViewInit, OnDestroy {

  @Input()
  cell: TableCell;

  @ViewChild(CdkOverlayOrigin, { static: true })
  private tooltipOrigin: CdkOverlayOrigin;
  @ViewChild('tooltipTemplate', { static: false })
  private tooltipTemplate: TemplateRef<any>;
  private unsubscribe$ = new Subject();

  tooltipPortal: ComponentPortal<any>;
  tooltipPosition: ConnectionPositionPair;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private directionality: Directionality,
    private tooltipService: TooltipService,
  ) {
  }

  @HostBinding('class') get class(): string {
    const classList: string[] = ['s0-table-cell'];
    if (this.cell.width) {
      classList.push('w-' + this.cell.width + 'p');
    }
    if (this.cell.tooltip) {
      classList.push('s0-table-cell--tooltip');
    }
    return classList.join(' ');
  }

  ngAfterViewInit(): void {
    if (this.cell.tooltip) {
      this.tooltipPortal = this.resolveTooltipContent(this.cell.tooltip.content);
    }
  }

  showTooltip() {
    this.tooltipService.showTooltip(new TemplatePortal(this.tooltipTemplate, this.viewContainerRef), this.tooltipOrigin);
    this.tooltipService.tooltipPosition$.subscribe((position) => {
      this.tooltipPosition = position.connectionPair;
    });
  }

  private resolveTooltipContent(content: ComponentType<any>): ComponentPortal<any> {
    const injectionTokens: WeakMap<any, any> = new WeakMap();
    injectionTokens.set(ROW_DATA, this.cell.rowData);
    return new ComponentPortal(content as ComponentType<any>, null, new PortalInjector(this.injector, injectionTokens));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
