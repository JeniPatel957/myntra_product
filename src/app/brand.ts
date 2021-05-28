export class Brand {
    productId: number;
    product:string;
    productName:string;
    rating:number;
    ratingCount:number;
    discount:number;
    brand:string;
    searchImage : string;
    primaryColour:string;
    additionalInfo:string;
    category:string;
    mrp:any;

    constructor(mrp:number){
        this.mrp = mrp;
    }
}
