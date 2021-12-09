export interface IAssociates {
    id: string;
    criminal: string;
    occupation: string;
    name: string;
    district: string;
    state: string;

    createdAt: Date;
    updatedAt: Date;
}

export type IAssociatesImput = Omit<IAssociates, 'id' | 'criminal' | 'occupation' | 'createdAt' | 'updatedAt'>;
