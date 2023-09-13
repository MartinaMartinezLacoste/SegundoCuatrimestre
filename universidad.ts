class Universidad{
    private nombre: string;
    private direccion: string;
    private facultad: Facultad []
    public constructor(nombre: string, direccion: string){
        this.nombre = nombre;
        this.direccion = direccion;
        this.facultad = []
    }
    public addFacultad(facultad: Facultad): void{
        this.facultad.push(facultad);
        console.log(`Facultad agregada, ${facultad.getFacultad()}`);
    }
}
class Facultad{
    private nombre: string;
    private alumnos: Alumno[];
    private profesor: Profesor[];
    public constructor(nombre: string){
        this.nombre = nombre;
        this.alumnos = [];
        this.profesor = [];
}
public addAlumno(alumno: Alumno){
    this.alumnos.push(alumno);
    console.log(`Alumno agregado, ${alumno.getNombre()}`);
}
public addProfesor(profesor:Profesor){
    this.profesor.push(profesor);
    console.log(`profesor agregado, ${profesor.getApellido()}`);
}
public getFacultad(): string{
    return this.nombre;
}
}

class Alumno{
    private nombre: string;
    private apellido: string;
    private edad: number;
    public constructor(nombre: string, apellido:string, edad: number){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }
    public getNombre(): string{
        return this.nombre;
    }
    public setApellido(apellido:string): void{
        this.apellido = apellido;
    }
    public getApellido(): string{
        return this.apellido;
    }
    public setEdad(edad: number): void{
        this.edad = edad;
    }
    public getEdad(): number{
        return this.edad;
    }
}
class Profesor{
    private nombre: string;
    private apellido: string;
    private materia: string;
    public constructor(nombre: string, apellido: string, materia: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.materia = materia;
    }
    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }
    public getNombre(): string{
        return this.nombre;
    }
    public setApellido(apellido:string): void{
        this.apellido = apellido;
    }
    public getApellido(): string{
        return this.apellido;
    }
    public setMateria(materia: string): void{
        this.materia = materia;
    }
    public getMateria(): string{
        return this.materia;
    }
}
const universidad = new Universidad("Pepita", "9 de Julio")
const facultad1 = new Facultad("Medicina");
const alumno1 = new Alumno("Juan", "Martino", 33);
const profesor1 = new Profesor("Lucas", "Miguens", "Fisica");
facultad1.addAlumno(alumno1);
facultad1.addProfesor(profesor1);
universidad.addFacultad(facultad1);