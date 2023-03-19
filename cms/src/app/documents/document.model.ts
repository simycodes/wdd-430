// Short hand for creating a class with two variables
export class Document {
    constructor(public id: string, public name: string, public description: string,
        public url: string, public children: []){
    }
}