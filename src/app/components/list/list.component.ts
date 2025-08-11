import { Component, inject } from '@angular/core';
import { EntitiesService } from '../../services/entities.service';
import { IEntity } from '../../types/app.types';

@Component({
  selector: 'sca-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [EntitiesService]
})
export class ListComponent {
  protected entitiesService = inject(EntitiesService);

  public entities: IEntity[] = this.entitiesService.getEntities();
}
