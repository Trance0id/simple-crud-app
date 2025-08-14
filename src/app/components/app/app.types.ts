export interface IEntity {
  id: number;
  name: string;
  group: string;
  type: string;
}

export type TEntityData = Omit<IEntity, 'id'>;
export type TFilter = Partial<TEntityData>;
