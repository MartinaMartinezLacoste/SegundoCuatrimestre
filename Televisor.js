var Televisor = /** @class */ (function () {
    function Televisor(on, vol, chn) {
        if (on === void 0) { on = false; }
        if (vol === void 0) { vol = 0; }
        if (chn === void 0) { chn = 0; }
        this.isOn = on;
        this.volume = vol;
        this.channel = chn;
    }
    Televisor.prototype.switchOnOff = function () {
        if (this.isOn === true) {
            this.isOn = false;
        }
        else {
            this.isOn = true;
        }
        console.log(this.isOn ? "encendido" : "apagado");
    };
    Televisor.prototype.volUp = function () {
        if (!this.isOn) {
            return;
        }
        if (this.volume < 100) {
            this.volume++;
            console.log("vol up", this.volume);
        }
        else {
            console.log("volumen maximo", this.volume); //Cambiar el parametro inicial del constructor a 99
        }
    };
    Televisor.prototype.volDown = function () {
        if (!this.isOn) {
            return;
        }
        if (this.volume > 0) {
            this.volume -= 1;
            console.log("vol Down", this.volume);
        }
        else {
            console.log("vol minino", this.volume);
        }
    };
    Televisor.prototype.channelUp = function () {
        if (!this.isOn) {
            return;
        }
        if (this.channel < 99) {
            this.channel++;
            console.log("channel up", this.channel);
        }
        else {
            console.log("channel maximo", this.channel);
        }
    };
    Televisor.prototype.channelDown = function () {
        if (!this.isOn) {
            return;
        }
        if (this.channel > 1) {
            this.channel -= 1;
            console.log("channel down", this.channel);
        }
        else {
            console.log("channel minimo", this.channel);
        }
    };
    Televisor.prototype.pickChannel = function (channel) {
        if (!this.isOn)
            return;
        this.channel = channel;
        console.log("Cambiaste al canal", this.channel);
    };
    Televisor.prototype.info = function () {
        var currentDate = new Date();
        console.log("canal", this.channel, "volumen", this.volume, "hora actual", currentDate.toLocaleTimeString());
    };
    return Televisor;
}());
var tv01 = new Televisor();
tv01.switchOnOff();
tv01.volUp();
tv01.volUp();
tv01.volUp();
tv01.volUp();
tv01.volUp();
tv01.volDown();
tv01.volDown();
tv01.volDown();
tv01.channelUp();
tv01.channelUp();
tv01.channelUp();
tv01.channelDown();
tv01.channelDown();
tv01.pickChannel(45);
tv01.info();
//tv01.volDown(2)
//tv01.switchOnOff();
//tv01.switchOnOff();
//tv01.pickChannel(45);
