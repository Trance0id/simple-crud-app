import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEntity } from '../../types/app.types';
import { MatIconButton } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: '[sca-entity]',
  imports: [MatListModule, MatIconButton, MatIcon],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss',
})
export class EntityComponent {
  @Input() public data!: IEntity;
  @Output() public delete = new EventEmitter<number>();
  @Output() public edit = new EventEmitter<number>();
}
