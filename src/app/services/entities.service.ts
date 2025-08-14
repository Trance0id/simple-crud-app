import { inject, Injectable } from '@angular/core';
import { IEntity, TEntityData, TFilter } from '../components/app/app.types';
import { BehaviorSubject, combineLatest, map, Observable, Subject, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { MOCK_ENTITIES } from '../components/app/app.mocks';
import { getRandomId } from '../components/app/app.utils';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  private _storageService = inject(StorageService);

  private _mockEntities = inject(MOCK_ENTITIES);
  private _entities$$ = new BehaviorSubject(this._mockEntities);

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

  public editEntity(id: number, entity: TEntityData): void {
    const index = this._entities.findIndex((entity) => entity.id === id);
    this._entities$$.next(this._entities.map(origEntity => origEntity.id === id ? { id, ...entity } : origEntity));
  }

  public addEntity(entity: TEntityData): void {
    this._entities$$.next([{ id: getRandomId(), ...entity }].concat(this._entities));
  }
}
