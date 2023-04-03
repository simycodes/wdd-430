// Short hand for creating a class with two variables
export class Meal {
    constructor(
        public _id: string,
        public id: string,
        public name: string,
        public price: string,
        public category: string,
        public imageUrl: string,
        public description: string,
    ){}
}
