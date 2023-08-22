// Qui creiamo il modello, significa che ogni campo definito nella tabella polylines de db deve corrispondere ai nomi del modello.
// L'archiviazione dei dati andrà usare questo modello quando andremo a salvare i dati del nostro polyline oppure quando va a fare altre operazioni.
export class Polyline {
    public id: number;
    public nome_p: string;
    public nome_a: string;
    public lat_p: number;
    public lon_p: number;
    public lat_a: number;
    public lon_a: number;
    public colore: string;

    constructor(id: number, nome_p: string, nome_a: string, lat_p: number, lon_p: number, lat_a: number, lon_a: number, colore: string) {
        this.id = id;
        this.nome_p = nome_p;
        this.nome_a = nome_a;
        this.lat_p = lat_p;
        this.lon_p = lon_p;
        this.lat_a = lat_a;
        this.lon_a = lon_a;
        this.colore = colore;
    }
}