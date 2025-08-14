import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { IEntity } from '../app/app.types';
import { MatIcon } from '@angular/material/icon';
import { EntitiesService } from '../../services/entities.service';


@Component({
  selector: '[sca-entity-form]',
  imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, MatIcon],
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityFormComponent implements OnInit {
  @Input() public entity: IEntity | null = null;
  @Input() public formSubmitAction: string = '';
  @Input() public formCancelAction: string = '';
  @Output() public readonly action = new EventEmitter<Omit<IEntity, 'id'>>();
  @Output() public readonly cancel = new EventEmitter();

  public readonly entitiesService = inject(EntitiesService);
  public entityForm!: FormGroup;
  private _fb = inject(FormBuilder);

  ngOnInit(): void {
    this.entityForm = this._fb.group({
      name: [this.entity?.name ?? '', Validators.required],
      group: [this.entity?.group ?? '', Validators.required],
      type: [this.entity?.type ?? '', Validators.required],
    }, { updateOn: 'submit' });
  }

  public onSubmit(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.action.emit(formGroup.value);
    }
  }
}
