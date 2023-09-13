class Deportista {
    protected nombre: string;
    private edad: number;
    private equipo: string;

    constructor(nombre: string, edad: number, equipo: string) {
        this.nombre = nombre;
        this.edad = edad;
        this.equipo = equipo;
    }

    // Método para obtener la información básica del deportista.
    getInfo(): string {
        return `Nombre: ${this.nombre}, Edad: ${this.edad}, Equipo: ${this.equipo}`;
    }

    // Método abstracto que debe ser implementado por las subclases.
    realizarEntrenamiento() {
        // Debe ser implementado por las subclases.
    }
}

class Futbolista extends Deportista {
    private posicion: string;

    constructor(nombre: string, edad: number, equipo: string, posicion: string) {
        super(nombre, edad, equipo);
        this.posicion = posicion;
    }

    // Método específico para futbolistas.
    jugarPartido() {
        return `${this.nombre} está jugando como ${this.posicion} en un partido de fútbol.`;
    }
}

class Nadador extends Deportista {
    private estilo: string;

    constructor(nombre: string, edad: number, equipo: string, estilo: string) {
        super(nombre, edad, equipo);
        this.estilo = estilo;
    }

    // Método específico para nadadores.
    nadar() {
        return `${this.nombre} está nadando estilo ${this.estilo}.`;
    }
}

class AtletaCompuesto extends Deportista {
    private deportes: Deportista[];

    constructor(nombre: string, edad: number, equipo: string, deportes: Deportista[]) {
        super(nombre, edad, equipo);
        this.deportes = deportes;
    }

    // Método específico para atletas compuestos.
    realizarEntrenamiento() {
        for (const deporte of this.deportes) {
            deporte.realizarEntrenamiento();
        }
    }
}
