"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Album = /** @class */ (function () {
    function Album(title, artist, year, recordLabel) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.recordLabel = recordLabel;
    }
    return Album;
}());
var album = new Album("Bohemia Rhapsody", "Queen", 1975, "EMI Records");
Object.values(album).forEach(function (val) { return console.log(val); });
