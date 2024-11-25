import { User } from "./User";
import { General } from "./General"; //
import { Brand } from "./Brand"; //
import { Category } from "./Category";
import { SubCategory } from "./SubCategory";
import { Product } from "./Product";
import { ProductName } from "./ProductName";
import { NewStock } from "./NewStock";
import { StaffOrder } from "./StaffOrder";
import { ItemsList } from "./ItemsList";


export enum ModelNames {
    USER = 'user',    
    GENERAL = 'general',  
    BRAND = 'brand',  
    CATEGORY = 'category',  
    PRODUCT = 'product',  
    PRODUCTNAME = 'productname',  
    NEWSTOCK = 'newstock',  
    STAFFORDER = 'stafforder',  
    SUBCATEGORY = 'subcategory',  
    ITEMSLIST = 'itemslist'  
}

export type ModelTypeMap = {
    [ModelNames.USER]: User,
    [ModelNames.GENERAL]: General,
    [ModelNames.BRAND]: Brand,
    [ModelNames.CATEGORY]: Category,
    [ModelNames.SUBCATEGORY]: SubCategory,
    [ModelNames.PRODUCT]: Product,
    [ModelNames.PRODUCTNAME]: ProductName,
    [ModelNames.NEWSTOCK]: NewStock,
    [ModelNames.STAFFORDER]: StaffOrder,
    [ModelNames.ITEMSLIST]: ItemsList,
}
