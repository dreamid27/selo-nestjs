import { ApiProperty } from '@nestjs/swagger';
export class CreateProductVariantDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}

export class CreateProductAdditionalDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}

export class CreateProductDto {
  @ApiProperty({
    example: 'Kalung',
  })
  name: string;

  @ApiProperty({
    example: 'Kalung berkarat 50 karat',
  })
  description: string;

  @ApiProperty({
    example: 10000,
  })
  price: number;

  @ApiProperty({
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    example:
      'https://http://localhost:4000/public/albums/screen_shot_2022_03_05_at_20_07_27-1646577127278.png',
  })
  image: string;

  @ApiProperty({
    isArray: true,
    type: CreateProductVariantDto,
    example: [{ name: 'Kalung', price: 10000 }],
  })
  variants: CreateProductVariantDto[];

  @ApiProperty({
    isArray: true,
    type: CreateProductAdditionalDto,
    example: [{ name: 'Bross', price: 10000 }],
  })
  additionals: CreateProductAdditionalDto[];
}

/* Example Object to be used in the test */
const exampleObject = {
  name: 'Kalung',
  description: 'kalung ini hebat sekali',
  price: 10000,
  isActive: true,
  image:
    'https://http://localhost:4000/public/albums/screen_shot_2022_03_05_at_20_07_27-1646577127278.png',
  variants: [{ name: 'Kalung', price: 10000 }],
  additionals: [{ name: 'Bross', price: 10000 }],
};

// JSON Stringify
// {"name":"Baju Keren","description":"Baju ini hebat sekali","price":20000,"isActive":true,"variants":[{"name":"S","price":20000},{"name":"M","price":22000}],"additionals":[{"name":"bross","price":1000},{"name":"stiker","price":500}]}
