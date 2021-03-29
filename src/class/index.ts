export interface AnnoScolastico {
    id: number;
    label: string;
    contratti: Contratto[];
}

export interface Contratto {
    id: number;
    data_inizio: Date;
    data_fine: Date;
    days: number
}
