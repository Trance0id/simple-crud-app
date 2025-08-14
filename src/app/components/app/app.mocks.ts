import { InjectionToken } from "@angular/core";
import { IEntity } from "./app.types";
import { getRandomId } from './app.utils';

export const mockEntities: IEntity[] = [
  { id: getRandomId(), name: 'Entity1', group: 'Group1', type: 'Type1' },
  { id: getRandomId(), name: 'Entity2', group: 'Group1', type: 'Type2' },
  { id: getRandomId(), name: 'Entity3', group: 'Group1', type: 'Type3' },
  { id: getRandomId(), name: 'Entity4', group: 'Group2', type: 'Type1' },
  { id: getRandomId(), name: 'Entity5', group: 'Group2', type: 'Type2' },
  { id: getRandomId(), name: 'Entity6', group: 'Group2', type: 'Type3' },
  { id: getRandomId(), name: 'Entity7', group: 'Group3', type: 'Type1' },
  { id: getRandomId(), name: 'Entity8', group: 'Group3', type: 'Type2' },
  { id: getRandomId(), name: 'Entity9', group: 'Group3', type: 'Type3' },
];

export const MOCK_ENTITIES = new InjectionToken<IEntity[]>('mock-entities');
