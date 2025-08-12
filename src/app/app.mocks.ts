import { InjectionToken } from "@angular/core";
import { IEntity } from "./types/app.types";

export const mockEntities: IEntity[] = [
  { id: 1, name: 'Entity1', group: 'Group1', type: 'Type1' },
  { id: 2, name: 'Entity2', group: 'Group1', type: 'Type2' },
  { id: 3, name: 'Entity3', group: 'Group1', type: 'Type3' },
  { id: 4, name: 'Entity4', group: 'Group2', type: 'Type1' },
  { id: 5, name: 'Entity5', group: 'Group2', type: 'Type2' },
  { id: 6, name: 'Entity6', group: 'Group2', type: 'Type3' },
  { id: 7, name: 'Entity7', group: 'Group3', type: 'Type1' },
  { id: 8, name: 'Entity8', group: 'Group3', type: 'Type2' },
  { id: 9, name: 'Entity9', group: 'Group3', type: 'Type3' },
];

export const MOCK_ENTITIES = new InjectionToken<IEntity[]>('mock-entities');
