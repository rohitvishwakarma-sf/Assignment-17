import { Observable } from 'rxjs';

export interface ICRUD<T> {
  create(obj: T): Promise<T>;
  getAll(): Promise<T[]>;
  getOneBy(id: number): Promise<T>;
  delete(obj: T): Observable<any>;
  save(obj: T): Observable<any>;
}
