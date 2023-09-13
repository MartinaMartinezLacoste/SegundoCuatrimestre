import { Console } from 'node:console';
import { randomUUID } from 'node:crypto';
export interface Libreriaa{
    getTitulo(): string;
    getAño(): number;
}
export class Libreria implements Libreriaa{
    private id: string = randomUUID();
    private titulo: string;
    private año: number;
    private disponibilidad: boolean = true;
    public constructor(titulo: string, año: number){
        this.titulo =  titulo;
        this.año = año;
    }
    public setTitulo(titulo:string): void{
        this.titulo = titulo;
    }
    public setAño(año:number): void{
        this.año = año;
    }
    public getTitulo(): string {
        return this.titulo;
    }
    public getAño(): number {
        return this.año;
    }
    public estaDisponible(): boolean{
        return this.disponibilidad;
    }
    public marcarNoDisponible(){
        this.disponibilidad = false;
    }
    public marcarDisponible(){
        this.disponibilidad = true;
    }
}
export class Revista extends Libreria{
    private editorial: string;
    public constructor(titulo: string, editorial: string, año: number){
        super(titulo, año);
        this.editorial = editorial;
    }
    public setEditorial(editorial: string): void{
        this.editorial = editorial;
    }
    public getEditorial(): string {
        return this.editorial;
    }
}
export class Libro extends Libreria{
    private autor:string;
    public constructor(titulo: string, autor: string, año: number){
        super(titulo, año,);
        this.autor = autor;
    }
    public setAutor(autor:string): void{
        this.autor = autor;
    }
    public getAutor(): string{
        return this.autor;
    }
}
export class Cliente{
    private id: string = randomUUID();
    private nombre: string;
    private apellido: string;
    private direccion: string;
    private cel: number;
    public constructor(nombre: string, apellido: string, direccion: string, cel: number){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.cel = cel;
    }
    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }
    public setApellido(apellido: string): void{
        this.apellido = apellido;
    }
    public setDireccion(direccion:string): void{
        this.direccion = direccion;
    }
    public setCel(cel:number): void{
        this.cel = cel;
    }
    public getId(): string{
        return this.id;
    }
    public getNombre(): string{
        return this.nombre;
    }
    public getApellido(): string{
        return this.apellido;
    }
    public getDireccion(): string{
        return this.direccion;
    }
    public getCel(): number{
        return this.cel;
    }
}
export class Prestamos{
    private id: string = randomUUID();
    private cliente: Cliente;
    private elementos: Libreria;
    private fechaInicio: Date;
    private fechaVencimiento: Date;
    public constructor( cliente: Cliente, elementos: Libreria){
        this.cliente = cliente;
        this.elementos = elementos;
        this.fechaInicio = new Date();
        this.fechaVencimiento = new Date();
        this.fechaVencimiento.setDate(this.fechaInicio.getDate()+7);
    }
    public getId(): string{
        return this.id;
    }
    public getCliente(): Cliente{
       return this.cliente;
    }
    public getElementos(): Libreria{
        return this.elementos;
    }
    public getFechaInicio():Date{
        return this.fechaInicio;
    }
    public getVencimiento(): Date{
        return this.fechaVencimiento;
    }
}
export class Biblioteca{
    private nombre: string;
    private domicilio: string;
    private clientes: Cliente[];
    private elementos: Libreria[];
    private prestamos: Prestamos[]
    public constructor(nombre: string, domicilio: string){
        this.nombre = nombre;
        this. domicilio = domicilio;
        this.clientes = [];
        this.elementos = [];
        this.prestamos = [];
    }
    public getNombre(): string{
        return this.nombre;
    }
    public getDomicilio(): string{
        return this.domicilio;
    }
    public addCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }
    public listaClientes(): void{
        console.log(this.clientes);
    }
    public addElemento(elemento: Libreria): void{
        this.elementos.push(elemento);
    }
    public listaElementos(): Libreria[]{
        return this.elementos
    }
    public addPrestamos(cliente:Cliente, elemento:Libreria): void{
        if(!this.validarCliente(cliente)){
            console.log("El usuario no existe");
            return;
        }
        const elementoExistente: Libreria | undefined = this.buscarElemento(elemento);
        if(!elementoExistente || !elementoExistente.estaDisponible()){
            console.log("No esta disponible");
            return;
        }
        elementoExistente.marcarNoDisponible();
        const nuevoPrestamo = new Prestamos(cliente,elementoExistente);
        this.prestamos.push(nuevoPrestamo);
        console.log(cliente.getNombre(), "retira ", elemento.getTitulo(), "con fecha de devolucion", nuevoPrestamo.getVencimiento().toDateString());
    }
    public devolverElemento(elemento : Libreria, cliente : Cliente): void{
        const prestamo = this.encontarPrestamosActivos(elemento, cliente);
        if (!prestamo){
            console.log("Prestamo no registrado.");
            return;
        }
        const elementoExistente = this.buscarElemento(elemento);
        if(elementoExistente){
            elementoExistente.marcarDisponible();
        }
        this.prestamos = this.prestamos.filter((i) => i !== prestamo);
        console.log(cliente.getNombre(), "devolvio", elemento.getTitulo());
    }
    public encontarPrestamosActivos(elemento: Libreria, cliente: Cliente): Prestamos | undefined{
        return this.prestamos.find((prestamo)=> prestamo.getElementos() === elemento && prestamo.getCliente()=== cliente)
    }
    public listadoPrestamos(): Prestamos[]{
        return this.prestamos;
    }
    private validarCliente(cliente:Cliente): boolean{
        return this.clientes.includes(cliente);
    }
    private buscarElemento(elemento: Libreria): Libreria | undefined {
        return this.elementos.find((i) => i === elemento);
    }
}
let biblioteca1 = new Biblioteca("AS", "25 de mayo");
let libro1 = new Libro("Casita", "Cosito", 1896,);
let cliente1 = new Cliente("Ludmila", "Miguens", "uriburu", 289355);
let cliente2 = new Cliente("Ludmilaaaaa", "Miguens", "uriburu", 289355);
let prestamo1 = new Prestamos(cliente1, libro1);
biblioteca1.addCliente(cliente1);
biblioteca1.addElemento(libro1);
biblioteca1.addPrestamos(cliente1,libro1);
biblioteca1.addPrestamos(cliente2,libro1);
biblioteca1.addPrestamos(cliente1,libro1);
biblioteca1.devolverElemento(libro1,cliente1);
//biblioteca1.listaClientes();
//console.log(biblioteca1.listaElementos());
//console.log(biblioteca1.listadoPrestamos());
