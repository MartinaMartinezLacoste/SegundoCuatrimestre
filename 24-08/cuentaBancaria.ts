export class banlAccount {
    private owner : string;
    private balance: number;
    private accountType: string;

    public constructor (owner: string, accountType: string){
        this.owner= owner;
        this.balance= 0;
        this.accountType= accountType;
    }
    public deposit (amount :number): void{
        if (amount >0){
            this.balance += amount;
            return ``
        }
    }

}