class calculator{
    public add(a:number, b:number):number{
        return a + b;
    }
    public subtract(a:number, b:number):number{
        return a - b;
    }
    public multiply(a:number, b:number): number{
        return a * b;
    }
    public divide(a:number, b:number): number | string{
        if (b === 0) return "can`t divide by zero";
        return a/b;
    }
}

const calc01 = new calculator ();
console.log (calc01.add (18,9));
console.log (calc01.divide(9,0));