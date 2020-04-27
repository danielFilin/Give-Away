export interface Order {
  products: [{
    productData: string,
    quantity: number
  }];
  user: {
    name: string,
    userId: string
  };
}

// export interface Order {
//   productData: string;
//   quantity: number;
//   name: string;
//   userId: string;
// }



