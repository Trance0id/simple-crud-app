import { Injectable } from '@angular/core';
import { IEntity } from '../types/app.types';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public setStorageSubscriber(entitiesSubscriber: Function): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'entities' && event.newValue) {
        entitiesSubscriber(JSON.parse(event.newValue));
      }
    });
  }

  public saveEntities(entitities: IEntity[]): void {
    localStorage.setItem('entities', JSON.stringify(entitities));
  }
}
