import { Console, error } from 'node:console';
import { randomUUID } from "node:crypto"; //esto genera un id ramdon cada vez que se utiliza.
import { userInfo } from 'node:os';
import * as readline from 'readline';
import * as fs from 'fs';



interface iAddress {
  street: string;
  number: number;
  apartment: string;
}
//clase base de los items en stock (revistas o libros)
class LibraryItem {   //articulo de libreria.
  private id: string = randomUUID();
  private title: string;
  private year: number;                              //super clase.
  private isAvailable: boolean = true;
  public constructor(title: string, year: number) {
    this.title = title;
    this.year = year;
  }
  public setTitle(title: string): void {
    this.title = title;
  }
  public setYear(year: number): void {
    this.year = year;
  }
  public getTitle(): string {      //estos son metodos que van a tener en comun los libros y revistas.
    return this.title;
  }
  public getYear(): number {
    return this.year;
  }
  public isItemAvailable(): boolean {
    return this.isAvailable;
  }
  markAsUnavailable() {  // marcar como no disponible.   Esto se utiliza cuando alguien quiere alquilar un libro.
    this.isAvailable = false;
  }
  markAsAvailable() {  // Esto se usa cuando la persona devuelve el libro.
    this.isAvailable = true;
  }
}

//libros
class Book extends LibraryItem {  //esto se extiende de la super clase.
  private author: string;
  public constructor(title: string, year: number, author: string) {
    super(title, year);   //en la clase super solo se pasan los valores de la super clase.
    this.author = author;
  }
  public setAuthor(author: string): void {
    this.author = author;
  }
  getAuthor() {
    return this.author;
  }
}

//revista
class Magazine extends LibraryItem {  //se extiende de la super clase.
  private editor: string;
  public constructor(title: string, year: number, editor: string) {
    super(title, year);
    this.editor = editor;
  }
  public setEditor(editor: string): void {
    this.editor = editor;
  }
  getEditor() {
    return this.editor;
  }
}

//los lectores
class User {   //usuarios
  private id: string = randomUUID();
  private name: string;
  private address: iAddress;  //La direccion no es string por que se piden varias cosas.
  private phoneNumber: string;
  private scoring: number = 0;  //puntuacion.
  private penaltyExpiryDate: Date | null = null;  //fecha de vencimiento de la penalizacion.
  private isCancelled: boolean = false; //Propiedad para controlar si el usuario esta cancelado.
  public constructor(name: string, address: iAddress, phoneNumber: string) {
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

  //los metodos los hacemos separados por si queremos tener informacion separada de los usuarios, por ej. 
  public getId(): string {
    return this.id;
  }
  public setName(name: string): void {
    this.name = name;
  }
  public getName(): string {
    return this.name;
  }
  public setAddress(address: iAddress): void {
    this.address = address;
  }
  public getAddress(): iAddress {
    return this.address;
  }
  public setPhoneNumber(phoneNumber: string): void {
    this.phoneNumber = phoneNumber;
  }
  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  // metodo para obtener la puntuacion del usuario
  getScoring(): number {
    return this.scoring;
  }

  cancelUser(): void {
    this.isCancelled = true;
  }

  // metodo para aplicar penalizacion y actualizar puntos.
  applyPenalty(daysLate: number): void {
    if (daysLate === 1) {
      this.scoring += 2;
    } else if (daysLate >= 2 && daysLate <= 5) {
      this.scoring += 3;
    } else if (daysLate >= 6 && daysLate <= 10) {
      this.scoring += 6;
    } else if (daysLate > 10) {
      this.cancelUser(); //se cancela al usuario si acumulo mas de 10 puntos.
      console.log(`${this.getName()} ha sido cancelado debido a un exceso de puntos de penalización.`);
      return;
    }

    if (this.scoring >= 6) {
      this.setPenalty();
    }
  }

  //metodo para establecer la penalizacion.
  setPenalty(): void {
    const currentDate = new Date();
    this.penaltyExpiryDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
  }

  //metodo para verificar si el usuario esta penalizado.
  isPenalized(): boolean {
    if (this.penaltyExpiryDate) {
      const currentDate = new Date();
      return currentDate <= this.penaltyExpiryDate;
    }
    return false;
  }

  // metodo para reducir el scoring al devolver un libro a tiempo.
  reduceScoringOnTime(): void {
    if (this.scoring > 0) {
      this.scoring--;
    }
  }
}

//Préstamos
class Loan {
  private id: string = randomUUID();
  private item: LibraryItem;
  private user: User;
  private loanDate: Date;
  private dueDate: Date;

  constructor(item: LibraryItem, user: User) {
    this.item = item;
    this.user = user;
    this.loanDate = new Date();   //Fecha del prestamo... new date te da la fecha del momento
    this.dueDate = new Date();
    this.dueDate.setDate(this.loanDate.getDate() + 7);   // esto toma la fecha anterior y se le suman 7 dias que es la fecha de devolucion.
  }

  getId(): string {
    return this.id;
  }
  getItem(): LibraryItem {
    return this.item;
  }
  getUser(): User {
    return this.user;
  }
  getLoanDate(): Date {
    return this.loanDate;
  }
  getDueDate(): Date {
    return this.dueDate;
  }
}
//clase gestora
class Library {  //articulos = revistas/libros
  private items: LibraryItem[];
  private users: User[];
  private loans: Loan[];
  private loanHistory: Loan[] = [];
  public constructor() {
    this.items = [];
    this.users = [];
    this.loans = [];
  }
  public getUsers(): User[] {
    return this.users;
  }
  public getItems(): LibraryItem[] {
    return this.items;
  }
  addItem(item: LibraryItem): void {   // agrega libro/revista
    this.items.push(item);
  }
  addUser(user: User): void {
    this.users.push(user);
  }

  loanItem(item: LibraryItem, user: User): void {   //prestar un articulo
    if (!this.isUserValid(user)) {
      //early return = retorno temprano 
      console.log("Usuario no registrado");
      return;
    }
    const existingItem: LibraryItem | undefined = this.findItem(item);
    if (!existingItem || !existingItem.isItemAvailable()) {
      //si existe o existe pero esta en falso
      console.log("Item no está disponible.");
      return;
    }

    //agrego una verificacion para comprobar si el usuario no esta penalizado
    if (user.isPenalized()) {
      console.log(`${user.getName()} está penalizado y no puede realizar préstamos.`);
      return;
    }

    existingItem.markAsUnavailable();
    const loan = new Loan(existingItem, user);
    this.loans.push(loan);
    console.log(
      `${user.getName()} retira "${item.getTitle()}" con fecha de devolución ${loan
        .getDueDate()
        .toLocaleDateString()}`
    );
  }

 returnItem(item: LibraryItem, user: User, returnDate: Date): void {
    const loan = this.findActiveLoan(item, user);
    if (!loan) {
      console.log("Préstamo no registrado. Revise Título y Usuario");
      return;
    }

    const dueDate = loan.getDueDate();
    const daysLate = this.calculateDaysLate(returnDate, dueDate);

    if (daysLate > 0) {
      user.applyPenalty(daysLate);
    } else {
      user.reduceScoringOnTime();
    }

    const existingItem = this.findItem(item);
    if (existingItem) {
      existingItem.markAsAvailable();
    }
    this.loans = this.loans.filter((l) => l !== loan);
    console.log(`${user.getName()} devolvió "${item.getTitle()}"`);
  }
  private findActiveLoan(item: LibraryItem, user: User): Loan | undefined {
    return this.loans.find(
      (loan) => loan.getItem() === item && loan.getUser() === user
    );
  }
  private isUserValid(user: User): boolean {  //valida que el usuario sea verdadero
    return this.users.includes(user);
  }
  private findItem(item: LibraryItem): LibraryItem | undefined {  //se fija si el libro/revista esta disponible
    return this.items.find((i) => i === item);
  }
  //metodo para calcular la cantidad de dias de retraso.
  private calculateDaysLate(returnDate: Date, dueDate: Date): number {
    const timeDifference = returnDate.getTime() - dueDate.getTime();
    const daysLate = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLate;
  }

  // Función para registrar un préstamo y guardar en un archivo
  logLoan(loan: Loan): void {
    this.loanHistory.push(loan);
    
  
    const loanRecord = {
      date: new Date().toLocaleString(),
      userName: loan.getUser().getName(), 
      itemName: loan.getItem().getTitle(), 
    };
  
    const loanRecordJSON = JSON.stringify(loanRecord);
  
    fs.promises.appendFile('./loan_history.json', loanRecordJSON + '\n', 'utf8')
      .then(() => {
        
      })
      .catch((err) => {
        console.error('Error al escribir en el archivo de historial:', err);
      });
  }

  listLoanHistory(): void {
    fs.promises.readFile('loan_history.json', 'utf8')
      .then((data) => {
        const loanRecords = data.split('\n').filter((record) => record.trim() !== '');

        console.log('Historial de préstamos:');
        loanRecords.forEach((record, index) => {
          const loanRecord = JSON.parse(record);
          console.log(`${index + 1}. Fecha: ${loanRecord.date}, Usuario: ${loanRecord.userName}, Artículo: ${loanRecord.itemName}`);
        });
      })
      .catch((err) => {
        console.error('Error al leer el archivo de historial:', err);
      });
  }
}

  
// Función para mostrar el menú de opciones
function displayMenu(library: Library): void {
  console.log('===== Biblioteca - Menú de Opciones =====');
  console.log('1. Agregar un libro');
  console.log('2. Agregar una revista');
  console.log('3. Agregar un usuario');
  console.log('4. Prestar un artículo');
  console.log('5. Devolver un artículo');
  console.log('6. Mostrar historial de préstamos');
  console.log('7. Salir');

  rl.question('Seleccione una opción: ', (choice) => {
    switch (choice) {
      case '1':
        // Opción 1: Agregar un libro
        rl.question('Título del libro: ', (title) => {
          rl.question('Autor del libro: ', (author) => {
            rl.question('Año del libro: ', (year) => {
              const book = new Book(title, parseInt(year), author);
              library.addItem(book);
              console.log(`"${title}" ha sido agregado como libro.`);
              // Vuelve al menú principal
              displayMenu(library);
            });
          });
        });

        break;
      case '2':
        // Opción 2: Agregar una revista
        rl.question('Título de la revista: ', (title) => {
          rl.question('Editor de la revista: ', (editor) => {
            rl.question('Año de la revista: ', (year) => {
              const magazine = new Magazine(title, parseInt(year), editor);
              library.addItem(magazine);
              console.log(`"${title}" ha sido agregado como revista.`);
              // Vuelve al menú principal
              displayMenu(library);
            });
          });
        });
        break;
      case '3':
        // Opción 3: Agregar un usuario
        rl.question('Nombre del usuario: ', (name) => {
          rl.question('Calle: ', (street) => {
            rl.question('Número: ', (number) => {
              rl.question('Apartamento: ', (apartment) => {
                rl.question('Número de teléfono: ', (phoneNumber) => {
                  const address = { street, number: parseInt(number), apartment };
                  const user = new User(name, address, phoneNumber);
                  library.addUser(user);
                  console.log(`"${name}" ha sido agregado como usuario.`);
                  // Vuelve al menú principal
                  displayMenu(library);
                });
              });
            });
          });
        });
        break;
      case '4':
        // Opción 4: Prestar un artículo
        rl.question('Ingrese el título del artículo: ', (itemTitle) => {
          rl.question('Ingrese el nombre del usuario: ', (userName) => {
            const user = library.getUsers().find((u) => u.getName() === userName);
            const item = library.getItems().find((i) => i.getTitle() === itemTitle);
            
            if (user && item) {
               library.logLoan(new Loan(item, user));
            } else {
              console.log('Usuario o artículo no encontrado.');
            }
            
            // Vuelve al menú principal
            displayMenu(library);
          });
        });
        break;
      case '5':
        // Opción 5: Devolver un artículo
        rl.question('Ingrese el título del artículo: ', (itemTitle) => {
          rl.question('Ingrese el nombre del usuario: ', (userName) => {
            const user = library.getUsers().find((u) => u.getName() === userName);
            const item = library.getItems().find((i) => i.getTitle() === itemTitle);
            const returnDate = new Date(); // Puedes personalizar la fecha de devolución aquí
            
            if (user && item) {
              library.returnItem(item, user, returnDate);
            } else {
              console.log('Usuario o artículo no encontrado.');
            }
            
            // Vuelve al menú principal
            displayMenu(library);
          });
        });
      break;
      case '6':
        // Opción 6: Mostrar historial de préstamos
        library.listLoanHistory();
        // Vuelve al menú principal
        displayMenu(library);
  break;
      case '7':
        console.log('Saliendo del programa.');
        rl.close();
        return;
      default:
        console.log('Opción no válida. Por favor, seleccione una opción válida.');
    }
     // Vuelve a mostrar el menú después de procesar la opción
    displayMenu(library);
  });

   



}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});





/*
const library = new Library();
const book01 = new Book("A sangre fía", 1977, "Rodolfo Walsh");
const magazine01 = new Magazine("Pronto", 2011, "Random House Penguin sarasa");
const user01 = new User(
  "Marcelo Bettini",
  { street: "Humberto Primo", number: 602, apartment: "1C" },
  "123-444-555"
);
const user02 = new User(
  "Sergio Fino",
  {
    street: "Av. Alicia Moreau de Justo",
    number: 1050,
    apartment: "2B",
  },
  "555-555-555"
);

library.addItem(book01);
library.addItem(magazine01);
library.addUser(user01);
library.loanItem(book01, user01);
library.loanItem(book01, user02); //usuario no registrado
library.addUser(user02); //agrega usuario
library.loanItem(book01, user02); //item no disponible
library.returnItem(book01, user01,new Date); //ahora vuelve a estar disponible
library.loanItem(book01, user02); //OK*/


//otros ejemplos= 
//creo usuarios.
const User1 = new User ("Martina", {street: "calle 123", number: 1, apartment: "A"}, "123-456-789");
const User2 = new User ("Patricia", {street: "avenida 456", number: 2, apartment: "B"}, "987-654-321");
//creo los libros y revistas.
const book1 = new Book ("libro 1", 2023, "autor 1");
const book2 = new Book ("libro 2", 2022, "autor 2");
const magazine1 = new Magazine ("revista 1", 2023, "editor 1");
const magazine2 = new Magazine ("revista 2", 2022, "editor 2");
//creo una instancia  de la biblioteca.
const library = new Library();
//agrego usuarios, libros y revistas a la biblioteca.
library.addUser(User1);
library.addUser(User2);
library.addItem(book1);
library.addItem(book2);
library.addItem(magazine1);
library.addItem(magazine2);
//prestar un libro a un usuario:
library.loanItem(book1, User1); //esto marcara el libro como no disponible y creara un prestamo.
library.logLoan(new Loan(book1, User1));
//intentar prestar un libro que no este disponible.
library.loanItem(book1, User2); // esto mostrara "item no esta disponible".
//prestar una revista a un usuario
library.loanItem(magazine1, User2); //esto marcara la revista como no disponible y creara un prestamo.
library.logLoan(new Loan(magazine1, User2));
//devolver un libro a tiempo 
const returnDateOnTme = new Date();
library.returnItem(book1, User1, returnDateOnTme);  //esto marcara el libro como disponible y mostrara que se de volvio a tiempo
//devolver un libro con retraso de 3 dias.
const returnDateLate = new Date();
returnDateLate.setDate (returnDateLate.getDate() + 3);
library.returnItem(magazine1, User2, returnDateLate);//esto marca al libro como disponible, aplicara una penalizacion de 3 puntos y mostrara que se devolvio con retraso de 3 dias.

//nuevo prestamo
library.loanItem(magazine2, User2);

//devolver una revista con retraso de 12 dias.
const returnDateVeryLate = new Date();
returnDateVeryLate.setDate (returnDateVeryLate.getDate() + 12);
library.returnItem(magazine2, User2, returnDateVeryLate);
library.logLoan(new Loan(magazine2, User2));



console.log(`${User1.getName()}: Scoring ${User1.getScoring()}`);
console.log(`${User2.getName()}: Scoring ${User2.getScoring()}, Penalizado: ${User2.isPenalized()}`);

displayMenu(library); // Inicia el progradma mostrando el menú