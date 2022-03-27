import { AuthShort } from './../../auth/interfaces/auth';
import { Condition } from './../../condition/interfaces/condition';

export interface Product {
  id?: number,
  title: string,
  description: string,
  image: string,
  price: number,
  erased: boolean,
  owner: AuthShort,
  condition: Condition,
  // tags: Tags[],
  created_at: string
}

export interface ProductShort {
  'id' :  number,
  'title' : string,
  'image' : string,
}
