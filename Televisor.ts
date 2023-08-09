 class Televisor {
  private isOn: boolean;
  private volume: number;
  private channel: number;
  constructor(on: boolean = false, vol: number = 0, chn: number = 0) {
    this.isOn = on;
    this.volume = vol;
    this.channel = chn;
  }
  switchOnOff(): void {
    if (this.isOn === true) {
      this.isOn = false
    } else {
      this.isOn = true
    }
      console.log(this.isOn ? "encendido" : "apagado");
  }
  volUp(): void {
    if (!this.isOn){
      return;
    } if (this.volume < 100){
      this.volume++;
    console.log("vol up", this.volume);
    } else {
      console.log("volumen maximo", this.volume); //Cambiar el parametro inicial del constructor a 99
    }
  }
  volDown(): void {
    if (!this.isOn){
      return;
    } if(this.volume > 0) {
      this.volume -=1;
    console.log("vol Down", this.volume);
    } else {
      console.log("vol minino", this.volume);
    }
  }
  channelUp(): void {
    if (!this.isOn){
      return;
    } if (this.channel < 99) {
      this.channel ++;
     console.log("channel up", this.channel); 
    } else {
      console.log("channel maximo", this.channel);
    }
  }
  channelDown(): void {
    if (!this.isOn){
      return;
    } if (this.channel > 1) {
      this.channel -=1;
    console.log("channel down", this.channel);
    } else{
      console.log ("channel minimo", this.channel);
    }
  }
  pickChannel(channel: number): void {
    if (!this.isOn) return;
    this.channel = channel;
    console.log("Cambiaste al canal", this.channel);
  }

  info(): void {
    const currentDate = new Date();
    console.log("canal", this.channel, "volumen", this.volume, "hora actual",  currentDate.toLocaleTimeString());
  }
}

const tv01 = new Televisor();
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
