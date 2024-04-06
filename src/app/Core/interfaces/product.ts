export interface product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: { rate: number, count: number }
}
export interface productToAdd {
   
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
   
}

