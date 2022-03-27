import { AuthShort } from '@features/auth/interfaces/auth';
import { ProductShort } from '@features/products/interfaces/product';

export interface Transaction {
  'id' : number,
  'amount' : number,
  'product' : ProductShort,
  'seller' : AuthShort,
  'buyer' : AuthShort,
  'created_at' : string,
  'updated_at' : string
}

export interface TransactionShort {
  'product' : ProductShort,
  'seller' : AuthShort,
}
