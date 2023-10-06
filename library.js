"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_crypto_1 = require("node:crypto"); //esto genera un id ramdon cada vez que se utiliza.
//clase base de los items en stock (revistas o libros)
var LibraryItem = /** @class */ (function () {
    function LibraryItem(title, year) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.isAvailable = true;
        this.title = title;
        this.year = year;
    }
    LibraryItem.prototype.setTitle = function (title) {
        this.title = title;
    };
    LibraryItem.prototype.setYear = function (year) {
        this.year = year;
    };
    LibraryItem.prototype.getTitle = function () {
        return this.title;
    };
    LibraryItem.prototype.getYear = function () {
        return this.year;
    };
    LibraryItem.prototype.isItemAvailable = function () {
        return this.isAvailable;
    };
    LibraryItem.prototype.markAsUnavailable = function () {
        this.isAvailable = false;
    };
    LibraryItem.prototype.markAsAvailable = function () {
        this.isAvailable = true;
    };
    return LibraryItem;
}());
//libros
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(title, year, author) {
        var _this = _super.call(this, title, year) || this;
        _this.author = author;
        return _this;
    }
    Book.prototype.setAuthor = function (author) {
        this.author = author;
    };
    Book.prototype.getAuthor = function () {
        return this.author;
    };
    return Book;
}(LibraryItem));
var book = /** @class */ (function (_super) {
    __extends(book, _super);
    function book(author, title, year) {
        var _this = _super.call(this, title, year) || this;
        _this.author = author;
        return _this;
    }
    book.prototype.getauthor = function () {
        return this.author;
    };
    return book;
}(LibraryItem));
//revista
var Magazine = /** @class */ (function (_super) {
    __extends(Magazine, _super);
    function Magazine(title, year, editor) {
        var _this = _super.call(this, title, year) || this;
        _this.editor = editor;
        return _this;
    }
    Magazine.prototype.setEditor = function (editor) {
        this.editor = editor;
    };
    Magazine.prototype.getEditor = function () {
        return this.editor;
    };
    return Magazine;
}(LibraryItem));
//los lectores
var User = /** @class */ (function () {
    function User(name, address, phoneNumber) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.scoring = 0; //puntuacion.
        this.penaltyExpiryDate = null; //fecha de vencimiento de la penalizacion.
        this.isCancelled = false; //Propiedad para controlar si el usuario esta cancelado.
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
    //los metodos los hacemos separados por si queremos tener informacion separada de los usuarios, por ej. 
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.setName = function (name) {
        this.name = name;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.setAddress = function (address) {
        this.address = address;
    };
    User.prototype.getAddress = function () {
        return this.address;
    };
    User.prototype.setPhoneNumber = function (phoneNumber) {
        this.phoneNumber = phoneNumber;
    };
    User.prototype.getPhoneNumber = function () {
        return this.phoneNumber;
    };
    // metodo para obtener la puntuacion del usuario
    User.prototype.getScoring = function () {
        return this.scoring;
    };
    User.prototype.cancelUser = function () {
        this.isCancelled = true;
    };
    // metodo para aplicar penalizacion y actualizar puntos.
    User.prototype.applyPenalty = function (daysLate) {
        if (daysLate === 1) {
            this.scoring += 2;
        }
        else if (daysLate >= 2 && daysLate <= 5) {
            this.scoring += 3;
        }
        else if (daysLate >= 6 && daysLate <= 10) {
            this.scoring += 6;
        }
        else if (daysLate > 10) {
            this.cancelUser(); //se cancela al usuario si acumulo mas de 10 puntos.
            console.log("".concat(this.getName(), " ha sido cancelado debido a un exceso de puntos de penalizaci\u00F3n."));
            return;
        }
        if (this.scoring >= 6) {
            this.setPenalty();
        }
    };
    //metodo para establecer la penalizacion.
    User.prototype.setPenalty = function () {
        var currentDate = new Date();
        this.penaltyExpiryDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
    };
    //metodo para verificar si el usuario esta penalizado.
    User.prototype.isPenalized = function () {
        if (this.penaltyExpiryDate) {
            var currentDate = new Date();
            return currentDate <= this.penaltyExpiryDate;
        }
        return false;
    };
    // metodo para reducir el scoring al devolver un libro a tiempo.
    User.prototype.reduceScoringOnTime = function () {
        if (this.scoring > 0) {
            this.scoring--;
        }
    };
    return User;
}());
//Préstamos
var Loan = /** @class */ (function () {
    function Loan(item, user) {
        this.id = (0, node_crypto_1.randomUUID)();
        this.item = item;
        this.user = user;
        this.loanDate = new Date(); //Fecha del prestamo... new date te da la fecha del momento
        this.dueDate = new Date();
        this.dueDate.setDate(this.loanDate.getDate() + 7); // esto toma la fecha anterior y se le suman 7 dias que es la fecha de devolucion.
    }
    Loan.prototype.getId = function () {
        return this.id;
    };
    Loan.prototype.getItem = function () {
        return this.item;
    };
    Loan.prototype.getUser = function () {
        return this.user;
    };
    Loan.prototype.getLoanDate = function () {
        return this.loanDate;
    };
    Loan.prototype.getDueDate = function () {
        return this.dueDate;
    };
    return Loan;
}());
//clase gestora
var Library = /** @class */ (function () {
    function Library() {
        this.items = [];
        this.users = [];
        this.loans = [];
    }
    Library.prototype.addItem = function (item) {
        this.items.push(item);
    };
    Library.prototype.addUser = function (user) {
        this.users.push(user);
    };
    Library.prototype.loanItem = function (item, user) {
        if (!this.isUserValid(user)) {
            //early return = retorno temprano 
            console.log("Usuario no registrado");
            return;
        }
        var existingItem = this.findItem(item);
        if (!existingItem || !existingItem.isItemAvailable()) {
            //si existe o existe pero esta en falso
            console.log("Item no está disponible.");
            return;
        }
        existingItem.markAsUnavailable();
        var loan = new Loan(existingItem, user);
        this.loans.push(loan);
        console.log("".concat(user.getName(), " retira \"").concat(item.getTitle(), "\" con fecha de devoluci\u00F3n ").concat(loan
            .getDueDate()
            .toLocaleDateString()));
    };
    Library.prototype.returnItem = function (item, user, returnDate) {
        var loan = this.findActiveLoan(item, user);
        if (!loan) {
            console.log("Préstamo no registrado. Revise Título y Usuario");
            return;
        }
        var dueDate = loan.getDueDate();
        var daysLate = this.calculateDaysLate(returnDate, dueDate);
        if (daysLate > 0) {
            user.applyPenalty(daysLate);
        }
        else {
            user.reduceScoringOnTime();
        }
        var existingItem = this.findItem(item);
        if (existingItem) {
            existingItem.markAsAvailable();
        }
        this.loans = this.loans.filter(function (l) { return l !== loan; });
        console.log("".concat(user.getName(), " devolvi\u00F3 \"").concat(item.getTitle(), "\""));
    };
    Library.prototype.findActiveLoan = function (item, user) {
        return this.loans.find(function (loan) { return loan.getItem() === item && loan.getUser() === user; });
    };
    Library.prototype.isUserValid = function (user) {
        return this.users.includes(user);
    };
    Library.prototype.findItem = function (item) {
        return this.items.find(function (i) { return i === item; });
    };
    //metodo para calcular la cantidad de dias de retraso.
    Library.prototype.calculateDaysLate = function (returnDate, dueDate) {
        var timeDifference = returnDate.getTime() - dueDate.getTime();
        var daysLate = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return daysLate;
    };
    return Library;
}());
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
var User1 = new User("Martina", { street: "calle 123", number: 1, apartment: "A" }, "123-456-789");
var User2 = new User("Patricia", { street: "avenida 456", number: 2, apartment: "B" }, "987-654-321");
//creo los libros y revistas.
var book1 = new book("libro 1", "autor 1", 2023);
var book2 = new book("libro 2", "autor 2", 2022);
var magazine1 = new Magazine("revista 1", 2023, "editor 1");
var magazine2 = new Magazine("revista 2", 2022, "editor 2");
//creo una instancia  de la biblioteca.
var library = new Library();
//agrego usuarios, libros y revistas a la biblioteca.
library.addUser(User1);
library.addUser(User2);
library.addItem(book1);
library.addItem(book2);
library.addItem(magazine1);
library.addItem(magazine2);
//prestar un libro a un usuario:
library.loanItem(book1, User1); //esto marcara el libro como no disponible y creara un prestamo.
//intentar prestar un libro que no este disponible.
library.loanItem(book1, User2); // esto mostrara "item no esta disponible".
//prestar una revista a un usuario
library.loanItem(magazine1, User2); //esto marcara la revista como no disponible y creara un prestamo.
//devolver un libro a tiempo 
var returnDateOnTme = new Date();
library.returnItem(book1, User1, returnDateOnTme); //esto marcara el libro como disponible y mostrara que se de volvio a tiempo
//devolver un libro con retraso de 3 dias.
var returnDateLate = new Date();
returnDateLate.setDate(returnDateLate.getDate() + 3);
library.returnItem(magazine1, User2, returnDateLate); //esto marca al libro como disponible, aplicara una penalizacion de 3 puntos y mostrara que se devolvio con retraso de 3 dias.
//nuevo prestamo
library.loanItem(magazine2, User2);
//devolver una revista con retraso de 12 dias.
var returnDateVeryLate = new Date();
returnDateVeryLate.setDate(returnDateVeryLate.getDate() + 12);
library.returnItem(magazine2, User2, returnDateVeryLate);
console.log("".concat(User1.getName(), ": Scoring ").concat(User1.getScoring()));
console.log("".concat(User2.getName(), ": Scoring ").concat(User2.getScoring(), ", Penalizado: ").concat(User2.isPenalized()));
