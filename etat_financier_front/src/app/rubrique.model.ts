// rubrique.model.ts
export interface Rubrique {
    id_rubrique: number;
    rubrique: string;
    montant?: number;
    n_compte?: string;
    id_type: number;
    id_rubrique_1?: number;
    children?: Rubrique[];
    showAddForm?: boolean;
    expanded?: boolean;
}