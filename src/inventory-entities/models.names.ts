import { User } from "./User";
import { General } from "./General"; //
import { Brand } from "./Brand"; //
import { Category } from "./Category";
import { SubCategory } from "./SubCategory";
import { Product } from "./Product";
import { NewStock } from "./NewStock";
import { StaffOrder } from "./StaffOrder";
import { ItemsList } from "./ItemsList";


export enum ModelNames {
    USER = 'user',    
    GENERAL = 'general',  
    BRAND = 'brand',  
    CATEGORY = 'category',  
    PRODUCT = 'product',  
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
    [ModelNames.NEWSTOCK]: NewStock,
    [ModelNames.STAFFORDER]: StaffOrder,
    [ModelNames.ITEMSLIST]: ItemsList,
}
