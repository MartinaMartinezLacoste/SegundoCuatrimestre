class Personaje {
    private nombre: string;
    private edad: number;
    private pais: string;
    private movimientoEspecial: string;
    private salud: number;
    public nivel: number;
  
    constructor(nombre: string, edad: number, pais: string, movimientoEspecial: string) {
      this.nombre = nombre;
      this.edad = edad;
      this.pais = pais;
      this.movimientoEspecial = movimientoEspecial;
      this.salud = 100;
      this.nivel = 1;
    }
  
    recibirDanio(danio: number): void {
      this.salud -= danio;
      console.log(`${this.nombre} recibió ${danio} puntos de daño. Salud actual: ${this.salud}`);
    }
  
    incrementarNivel(): void {
      this.nivel++;
      console.log(`${this.nombre} subió al nivel ${this.nivel}!`);
    }
  
    usarMovimientoEspecial(objetivo: string): void {
      console.log(`${this.nombre} usó ${this.movimientoEspecial} contra ${objetivo}!`);
    }
  }
  
  class Enemigo {
    private nombre: string;
    private tipo: string;
    private danio: number;
    private energia: number;
    private personaje: Personaje;
  
    constructor(nombre: string, tipo: string, danio: number, personaje: Personaje) {
      this.nombre = nombre;
      this.tipo = tipo;
      this.danio = danio;
      this.energia = 100;
      this.personaje = personaje;
    }
  
    recibirDanio(danio: number): void {
      this.energia -= danio;
      console.log(`${this.nombre} recibió ${danio} puntos de daño. Energía actual: ${this.energia}`);
      console.log(this.tipo)
    }
  
    atacar(): void {
      this.personaje.recibirDanio(this.danio);
    }
  }
  
  // Crear un personaje y probar sus métodos
  const personaje1 = new Personaje("Luchador1", 25, "Japón", "Puño de Fuego");
  personaje1.recibirDanio(20);
  personaje1.usarMovimientoEspecial("Enemigo1");
  personaje1.incrementarNivel();
  
  // Crear un enemigo y probar sus métodos
  const personajeEnemigo = new Personaje("Enemigo1", 30, "Mundo Oscuro", "Maldición Oscura");
  const enemigo1 = new Enemigo("Ogro", "Fuerza Bruta", 32, personajeEnemigo);
  enemigo1.atacar();
  enemigo1.atacar();