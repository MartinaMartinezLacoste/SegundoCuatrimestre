import * as rs from "readline-sync";
import * as fs from "node:fs";
import { Album } from "./album";

export class FileManager {
    static readAlbums() {
        try {
            const Album = fs.readFileSync("./albums.json", { encoding: "utf-8" });
            console.log("lectura de datos sactifactoria")
            return JSON.parse(Album) as Album[];
        } catch (error) {
            console.log("unexpected error", error)
        }
        //Pause to display messages
        rs.keyInPause("\n"); 
    }

}