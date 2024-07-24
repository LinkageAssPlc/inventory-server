import { ObjectId } from "mongodb";

export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

export interface UserTokenType {
  role: Role;
  _id: ObjectId;
  email: string;
};


export type MetaUser = {
  userID: ObjectId;
  lastloginDate: Date;
  passwordChangedAt: Date[],
  verifiedAt: Date;
  disabledAt: Date;
  suspendedAt: Date;
  deletedAt: Date;
};

export type Category = {
  name: string;
  parent: string;
}

export type Brand = {
  name: string;
}

export type Product = {
  name: string; 
}

export enum Units {
  UNIT = "unit(s)",
  PIECES = "pcs",
  GALLONS = "gallon(s)",
  RIMS = "rim(s)",
  CARTONS = "carton(s)",
  PACK = "pack(s)"
}

export type NewStock = {
  itemList: {
    productID: ObjectId;
    categoryID: ObjectId;
    brandID: ObjectId;
    quantity: number;
    price: number;
    unit: Units;
    isInStock: boolean;
  }[]
}

export type ItemsInStock = {
  productID: string;
  quantity: number;
  unit: string 
}

export type ItemsNotInStock = {
  productName: string;
  quantity: number; 
  unit: string;
}

export type StaffOrder = {
  staffID: ObjectId;
  departmentID: ObjectId;
  inStock: ItemsInStock[];
  notInStock: ItemsNotInStock[];
}

export type StaffRequest = {
  staffID: ObjectId;
  departmentID: ObjectId;
  list: StaffOrder[];
  quantityIssued: number;
  requestMode: string;
}


