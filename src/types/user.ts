import { ObjectId } from "mongodb";

//Parent(Hardware) -> Category(Laptop) -> Brand(HP) -> Product(HP 450 G6)
//oil-> engine oil -> Total -> Total Classic

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
  userID: ObjectId;
  name: string;
  parent: string;
}

export type Brand = {
  userID: ObjectId;
  name: string;
}

export type Product = {
  userID: ObjectId;
  name: string; 
}

export enum Units {
  UNIT = "unit(s)",
  PIECES = "pcs",
  GALLONS = "gallon(s)",
  RIMS = "rim(s)",
  CARTONS = "carton(s)",
  PACK = "pack(s)",
  BOOKLET = "booklet(s)"
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
  unit: Units;
}

export type ItemsNotInStock = {
  productName: string;
  quantity: number; 
  unit: Units;
}

export type StaffOrder = {
  staffID: ObjectId;
  department: string;
  branch: string;
  inStock: ItemsInStock[];
  notInStock: ItemsNotInStock[];
}

export type StaffRequest = {
  staffID: ObjectId;
  department: string;
  branch: string;
  list: StaffOrder[];
  quantityIssued: number;
  requestMode: string;
}


