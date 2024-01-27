import { OptionalExceptFor, PartialBy } from './utility';

export type Commander = {
  id: number;
  name: string;
  username: string;
  mainStack: string;
  currentEnrollment: boolean;
  hasAzureCertification: boolean;
};

export type CreateCommander = PartialBy<
  Omit<Commander, 'id'>,
  'currentEnrollment' | 'hasAzureCertification'
>;

export type UpdateCommander = OptionalExceptFor<Commander, 'id'>;
