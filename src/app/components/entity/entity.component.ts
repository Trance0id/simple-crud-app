import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IEntity, TEntityData } from '../app/app.types';
import { MatIconButton } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { EntityFormComponent } from '../entity-form/entity-form.component';

@Component({
  selector: '[sca-entity]',
  imports: [MatListModule, MatIconButton, MatIcon, EntityFormComponent],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent {
  @Input() public data!: IEntity;
  @Output() public delete = new EventEmitter<void>();
  @Output() public edit = new EventEmitter<TEntityData>();

  public editMode: boolean = false;
}
