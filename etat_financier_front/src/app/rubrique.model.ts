// rubrique.model.ts
export interface Rubrique {
    idRubrique?: number;
    rubrique: string;
    montant?: number;
    nCompte?: string;
    idType: number;
    estStock:boolean;
    idRubriqueMere?: number;
    children?: Rubrique[];
    showAddForm?: boolean;
    expanded?: boolean;
}