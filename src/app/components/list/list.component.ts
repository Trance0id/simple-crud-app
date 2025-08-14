import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { EntitiesService } from '../../services/entities.service';
import { IEntity } from '../app/app.types';
import { debounceTime, Observable, distinctUntilChanged, merge, tap, combineLatest, map, startWith, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EntityComponent } from '../entity/entity.component';
import { MatList } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TFilter } from '../app/app.types';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: '[sca-list]',
  imports: [AsyncPipe, EntityComponent, MatTableModule, MatList, MatFormFieldModule, FormsModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  public entitiesService = inject(EntitiesService);
  public readonly displayEntities$: Observable<IEntity[]> = new Subject();
  public readonly filter$: Observable<TFilter>;
  public filterOptions: { [k in keyof TFilter]?: Set<TFilter[k]> } = {};

  public readonly nameFilter = new FormControl<string>('', { nonNullable: true, updateOn: 'change' });
  public readonly groupFilter = new FormControl<string>('', { nonNullable: true, updateOn: 'change' });
  public readonly typeFilter = new FormControl<string>('', { nonNullable: true, updateOn: 'change' });

  constructor() {
    this.filter$ = merge(
      this.nameFilter.valueChanges.pipe(debounceTime(700), distinctUntilChanged()),
      this.groupFilter.valueChanges.pipe(distinctUntilChanged()),
      this.typeFilter.valueChanges.pipe(distinctUntilChanged()),
    ).pipe(
      startWith(this._filterObject),
      map(() => this._filterObject),
    );

    this.displayEntities$ = combineLatest([
      this.entitiesService.entities$.pipe(
        tap(this._getFilterOptions.bind(this)),
      ),
      this.filter$,
    ]).pipe(
      map(this._filterEntities.bind(this)),
    );
  }

  private get _filterObject(): TFilter {
    return { name: this.nameFilter.value, group: this.groupFilter.value, type: this.typeFilter.value };
  }

  private _filterEntities([entities, filter]: [IEntity[], TFilter]): IEntity[] {
    return entities.filter((entity) => Object.keys(filter)
      .reduce((res, key) => {
        res &&= entity[key as keyof TFilter].toLowerCase().includes(filter[key as keyof TFilter]!.toLowerCase());
        return res;
      }, true));
  }

  private _getFilterOptions(entities: IEntity[]): void {
    // if (!entities) return;

    this.filterOptions = { group: new Set(), type: new Set() };

    entities.forEach(entity => {
      Object.entries(this.filterOptions)
        .forEach(([key, value]) => {
          value.add(entity[key as keyof TFilter]);
        });
    });
  }
}
