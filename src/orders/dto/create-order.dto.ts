export class CreateOrderDetailDto {
  subTotal: number;
  productId: number;
}

export class CreateOrderDto {
  date: Date;
  status: string;
  code: string;
  total: number;
  discount: number;
  tableCode: string;
  details: CreateOrderDetailDto[];
}

// Example Object to be used in the test, using json stringify when using in the test
// const exampleObject = {
//   date: '2022-03-01T13:40:52.458Z',
//   status: 'DONE',
//   code: 'ECP0067',
//   total: 2000000,
//   discount: 1000,
//   tableCode: 'ABCD01',
//   details: [
//     {
//       subTotal: 10000,
//       productId: 1,
//     },
//     {
//       subTotal: 18000,
//       productId: 2,
//     },
//   ],
// };

// JSON Stringify
// {"date":"2022-03-01T13:40:52.458Z","status":"DONE","code":"ECP0067","total":2000000,"discount":1000,"tableCode":"ABCD01","details":[{"subTotal":10000,"productId":1},{"subTotal":18000,"productId":2}]}
