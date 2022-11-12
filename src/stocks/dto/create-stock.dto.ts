import { ApiProperty } from '@nestjs/swagger';
export class CreateStockDto {
  @ApiProperty({
    example: 10,
  })
  amount: number;

  @ApiProperty({
    example: 4,
  })
  productVariantId: number;

  @ApiProperty({
    example: 2,
  })
  productId: number;

  @ApiProperty({
    example: 'UTAMA',
  })
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
