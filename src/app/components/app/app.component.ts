import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from '../list/list.component';
import { EntityFormComponent } from '../entity-form/entity-form.component';
import { EntitiesService } from '../../services/entities.service';

@Component({
  selector: 'sca-app',
  imports: [RouterOutlet, ListComponent, EntityFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'simple-crud-app';
  entitiesService = inject(EntitiesService);
}
