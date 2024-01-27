import { OptionalExceptFor, PartialBy } from './utility';

export type Explorer = {
  id: number;
  name: string;
  username: string;
  mission: string;
  azureCertification: boolean;
  dateCreated: Date;
  lastUpdated: Date;
};

export type CreateExplorer = PartialBy<
  Omit<Explorer, 'id' | 'dateCreated' | 'lastUpdated'>,
  'azureCertification'
>;

export type UpdateExplorer = OptionalExceptFor<Explorer, 'id'>;
