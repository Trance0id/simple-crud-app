import { inject, Injectable } from '@angular/core';
import { IEntity } from '../types/app.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { MOCK_ENTITIES } from '../app.mocks';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  private _mockEntities = inject(MOCK_ENTITIES);
  private _entities$$ = new BehaviorSubject(this._mockEntities);

  private _storageService = inject(StorageService);

  constructor() {
    this._storageService.setStorageSubscriber(this._updateEntities.bind(this));
    this._entities$$.subscribe(this._storageService.saveEntities.bind(this));
  }

  public get dispalyEntities$(): Observable<IEntity[]> {
    return this._entities$$.asObservable();
  }

  private get _entities(): IEntity[] {
    return this._entities$$.getValue();
  }

  private _updateEntities(newEntities: IEntity[]): void {
    this._entities$$.next(newEntities);
  }

  public deleteEntity(entitityToDelete: IEntity): void {
    console.log(`delete ${entitityToDelete.id}!`);
    this._entities$$.next(this._entities.filter((entity) => entity.id !== entitityToDelete.id));
    this._storageService.saveEntities(this._entities);
  }

  public editEntity(entitiy: IEntity): void {
    console.log(`delete ${entitiy}!`);
  }

  public addEntity(entitiy: IEntity): void {
    console.log(`add ${entitiy}!`);
  }
}
