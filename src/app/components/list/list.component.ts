import { Component, inject } from '@angular/core';
import { EntitiesService } from '../../services/entities.service';
import { IEntity } from '../../types/app.types';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EntityComponent } from '../entity/entity.component';
import { MatList } from '@angular/material/list';

@Component({
  selector: '[sca-list]',
  imports: [AsyncPipe, EntityComponent, MatList],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [EntitiesService]
})
export class ListComponent {
  protected entitiesService = inject(EntitiesService);

  public get entities$$(): Observable<IEntity[]> {
    return this.entitiesService.entities$;
  }
}
