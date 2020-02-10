import {Component, ElementRef} from '@angular/core';
import {Observable} from 'rxjs';
import {Option} from '../../common/modules/option/types/option';
import {TableComponent} from '../../common/modules/table/table.component';
import {TableConfig} from '../../common/modules/table/types/table-config';
import {TableService} from '../../common/modules/table/table.service';
import {User} from '../../common/rest/entities/user';
import {CustomCellComponent} from './cells/custom-cell.component';
import {UserRestService} from '../../common/rest/services/user-rest.service';
import {CityTooltipComponent} from './tooltips/city-tooltip.component';
import {RowDetailComponent} from './row-detail/row-detail.component';

@Component({
  templateUrl: '../../common/modules/table/table.component.html',
  selector: 's0-example-table',
})
export class ExampleTableComponent extends TableComponent<User> {

  constructor(
    protected elementRef: ElementRef,
    protected tableService: TableService<User>,
    private userRestService: UserRestService,
  ) {
    super(elementRef, tableService);
  }

  getConfig(): TableConfig<User> {
    return {
      columns: [
        {
          label: 'Name',
          content: CustomCellComponent,
          contentType: 'COMPONENT',
          width: 25,
          sort: true,
          sortBy: (e) => e.firstName,
        },
        {
          label: 'City',
          content: 'address.city',
          contentType: 'PATH',
          width: 15,
          tooltip: {
            size: 'sm',
            content: CityTooltipComponent,
          },
        },
        {
          label: 'E-mail',
          content: 'email',
          contentType: 'PATH',
          width: 15,
        },
        {
          label: 'Phone',
          content: 'phone',
          contentType: 'PATH',
          width: 15,
        },
        {
          label: 'Role',
          content: 'role',
          contentType: 'PATH',
          translateBy: 'user-role',
          width: 15,
        },
        {
          label: 'Status',
          content: (e: User) => (e.status === 'ACTIVE' ? 'Active' : 'Inactive'),
          contentType: 'FUNCTION',
          width: 15,
          icon: (e: User) => {
            if (e.status === 'ACTIVE') {
              return { name: 'check-circle', color: 'success', size: 'md' };
            } else if (e.status === 'INACTIVE') {
              return { name: 'cancel', color: 'danger', size: 'md' };
            }
          }
        },
      ],
      rowOptions: (e: User) => {
        const rowOptions: Option[] = [
          { code: 'edit', label: 'Edit' },
          { code: 'remove', label: 'Remove' },
        ];
        if (e.status === 'INACTIVE') {
          rowOptions.push({ code: 'activate', label: 'Activate' });
        }
        return rowOptions;
      },
      rowBehavior: 'detail',
      rowDetail: RowDetailComponent,
      stickyHeader: true,
    };
  }

  getInputData(): Observable<User[]> {
    return this.userRestService.getAll();
  }
}
