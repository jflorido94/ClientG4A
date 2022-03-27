import { AuthShort } from '@features/auth/interfaces/auth';
import { TransactionShort } from '@features/transactions/interfaces/transaction';

export interface Review {
  'id'  :  number,
  'stars' : number,
  'comment' : string,
  'transaction' : TransactionShort,
  'user' : AuthShort,
  'created_at' : string
}

