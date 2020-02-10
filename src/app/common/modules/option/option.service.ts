import {Injectable} from '@angular/core';
import {Option} from './types/option';

@Injectable()
export class OptionService {

  getOption(code: string, listName: string) {
    const optionList: Option[] = this.getList(listName);
    return optionList ? optionList.find((o) => o.code === code) : null;
  }

  getList(name: string): Option[] {
    switch (name) {
      case 'user-role': {
        return [
          { code: 'ADMIN', label: 'Administrator' },
          { code: 'USER', label: 'User' },
        ];
      }
    }
  }
}
