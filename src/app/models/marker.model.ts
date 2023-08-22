// Qui creiamo il modello, significa che ogni campo definito nella tabella markers deve corrispondere ai nomi del modello.
// L'archiviazione dei dati andrà usare questo modello quando andremo a salvare i dati del nostro marker oppure quando va a fare altre operazioni.
export class Marker {
    public id: number;
    public nome: string;
    public indirizzo: string;
    public lat: number;
    public lon: number;
    public colore: string;
    public draggable: boolean;

    constructor(id: number, nome: string, indirizzo: string, lat: number, lon: number, colore: string, draggable: boolean) {
        this.id = id;
        this.nome = nome;
        this.indirizzo = indirizzo;
        this.lat = lat;
        this.lon = lon;
        this.colore = colore;
        this.draggable = draggable;
    }
}