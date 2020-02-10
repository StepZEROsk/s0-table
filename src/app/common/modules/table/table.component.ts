import {AfterViewInit, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {fromEvent, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, startWith, switchMapTo, takeUntil, tap} from 'rxjs/internal/operators';
import {TableService} from './table.service';
import {TableCol} from './types/table-col';
import {TableConfig} from './types/table-config';
import {TableRow} from './types/table-row';
import {TableRowAction} from './types/table-row-action';
import {TableSort} from './types/table-sort';

export abstract class TableComponent<T> implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  refresh: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  rowClick = new EventEmitter<TableRow<T>>();
  @Output()
  rowAction = new EventEmitter<TableRowAction<T>>();
  config: TableConfig<T>;
  inputData: T[] = [];
  columns: TableCol<T>[];
  rows: TableRow<T>[] = [];
  headerStuck = false;
  loading: boolean;
  private unsubscribe$ = new Subject();

  protected constructor(
    protected elementRef: ElementRef,
    protected tableService: TableService<T>,
  ) {
  }

  ngOnInit(): void {
    this.config = this.getConfig();
    this.columns = this.tableService.getTableColumns(this.config);

    this.refresh.pipe(
      takeUntil(this.unsubscribe$),
      startWith(true),
      tap(() => this.loading = true),
      switchMapTo(this.getInputData()),
      tap(() => this.loading = false),
    ).subscribe((result) => {
      this.inputData = result;
      this.rows = this.tableService.getTableRows(this.config, this.columns, this.inputData);
    });
  }

  ngAfterViewInit() {
    if (this.config.stickyHeader) {
      this.initStickyHeader();
    }
  }

  sortRows(params: TableSort<T>) {
    if (this.rows.length > 0) {
      if (params) {
        this.rows = this.tableService.getTableRows(this.config, this.columns, this.tableService.sortInputData(this.inputData, params));
      } else {
        this.rows = this.tableService.getTableRows(this.config, this.columns, this.inputData);
      }
    }
  }

  private initStickyHeader() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      takeUntil(this.unsubscribe$),
      map((): boolean => (this.elementRef.nativeElement.getBoundingClientRect().top < 32)),
      distinctUntilChanged(),
    );

    scroll$.subscribe((value) => {
      this.headerStuck = value;
    });
  }

  abstract getConfig(): TableConfig<T>;
  abstract getInputData(): Observable<T[]>;

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
