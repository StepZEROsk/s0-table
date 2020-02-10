export interface TableSort<T> {
  colId: string;
  sortBy: (e: T) => string;
  order: 'ASC' | 'DESC';
}
