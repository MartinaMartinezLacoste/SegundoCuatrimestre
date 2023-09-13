class car {
    private engine: Engine;
    constructor(engine: Engine) {
        this.engine= engine;
    }
    strat() {
        return `started car ${this.engine}`;
    }
    stop() {
        return "car stopped";
    }
}

class Engine{
    private fuel: string;
    constructor(fuel: string){
        this.fuel= fuel;
    }
    setfuelType() {}
}

const engine01 = new Engine("electrico");
const engine02 = new Engine("nafta");
const superCar = new car (engine01);
const drunkCar = new car (engine02);

console.log(superCar.strat());
console.log(superCar.stop());
console.log(superCar.strat());