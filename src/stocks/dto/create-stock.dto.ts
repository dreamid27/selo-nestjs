export class CreateStockDto {
  amount: number;
  productVariantId: number;
  productId: number;
  warehouse: string;
}

// Example Object to be used in the test, using json stringify when using in the test
// const obj = {
//   amount: 10,
//   warehouse: 'UTAMA',
//   productId: 2,
//   productVariantId: 4,
// };

// {"amount":10,"warehouse":"UTAMA","productId":2,"productVariantId":3}
