import { IProposalInput } from '../models';

export type CreateProposalDto = Omit<IProposalInput, 'created_by'>;
