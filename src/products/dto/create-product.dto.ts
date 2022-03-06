export class CreateProductVariantDto {
  name: string;
  price: number;
}

export class CreateProductAdditionalDto {
  name: string;
  price: number;
}

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  image: string;
  variants: CreateProductVariantDto[];
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
