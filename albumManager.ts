import { log } from "console";
import { Album } from "./album";
import { FileManager } from "./fileManager";

export class AlbumManager{
    album: Album[];
    public constructor(){
        this.album = []
    }
    readAlbums(){
        const readResult = FileManager.readAlbums();
        if (readResult){
            this.album = readResult;
            console.log("======== Albums ========\n");
        if (!this.album.length){
            console.log();
        } else 
            
        }
    }

}