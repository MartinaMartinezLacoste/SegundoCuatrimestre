import * as crypto from "node:crypto";

export class Album{
    private id: string;
    private title: string;
    private artist: string;
    private year: number;
    private recordLabel: string;
    constructor (title: string, artist: string, year: number, recordLabel: string){
        this.id = crypto.randomUUID();
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.recordLabel = recordLabel;
    }
}