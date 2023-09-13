class Persona {
    private name: string;
    private dob: Date;

    constructor(name: string, dob: Date) {
        this.name = name;
        this.dob = dob;
    }

    setName(newName: string) {
        this.name = newName;
    }

    getAge(): number {
        const today = new Date();
        const birthDate = this.dob;
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        } else {
            return age;
        }
    }

    getInfo(): string {
        return `Nombre: ${this.name}, Edad: ${this.getAge()}`;
    }
}
