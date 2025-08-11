import { Injectable } from '@angular/core';
import { IEntity } from '../types/app.types';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  private _mockEntities: IEntity[] = [
    { id: 1, name: 'Entity1', group: 'Group1', type: 'Type1' },
    { id: 2, name: 'Entity2', group: 'Group1', type: 'Type2' },
    { id: 3, name: 'Entity3', group: 'Group2', type: 'Type1' },
    { id: 4, name: 'Entity4', group: 'Group2', type: 'Type2' },
    { id: 5, name: 'Entity5', group: 'Group3', type: 'Type3' },
  ];

  public getEntities(): IEntity[] {
    return this._mockEntities;
  }
}
