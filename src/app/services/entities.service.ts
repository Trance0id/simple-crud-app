import { inject, Injectable } from '@angular/core';
import { IEntity, TEntityData } from '../components/app/app.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { getRandomId } from '../components/app/app.utils';
import * as AppMocks from '../components/app/app.mocks';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  private _storageService = inject(StorageService);
  private _entities$$ = new BehaviorSubject(inject(AppMocks.MOCK_ENTITIES));

  constructor() {
    this._storageService.setStorageSubscriber(this._updateEntities.bind(this));
    this._entities$$.subscribe(this._storageService.saveEntities.bind(this));
  }

  public get entities$(): Observable<IEntity[]> {
    return this._entities$$.asObservable();
  }

  private get _entities(): IEntity[] {
    return this._entities$$.getValue();
  }

  private _updateEntities(newEntities: IEntity[]): void {
    this._entities$$.next(newEntities);
  }

  public deleteEntity(entityId: number): void {
    this._entities$$.next(this._entities.filter((entity) => entity.id !== entityId));
  }

  public editEntity(id: number, newData: TEntityData): void {
    const index: number = this._entities.findIndex((entity) => entity.id === id);
    this._entities$$.next(this._entities.map(entity => entity.id === id ? { id, ...newData } : entity));
  }

  public addEntity(entity: TEntityData): void {
    this._entities$$.next([{ id: getRandomId(), ...entity }].concat(this._entities));
  }
}
