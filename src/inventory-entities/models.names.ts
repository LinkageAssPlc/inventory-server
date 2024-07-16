import { User } from "./User";
import { Media } from "./Media";
import { General } from "./General"; //
import { Brand } from "./Brand"; //
import { Category } from "./Category";
import { Product } from "./Product";
import { NewStock } from "./NewStock";
import { StaffOrder } from "./StaffOrder";


export enum ModelNames {
    USER = 'user',    
    MEDIA = 'media',    
    GENERAL = 'general',  
    BRAND = 'brand',  
    CATEGORY = 'category',  
    PRODUCT = 'product',  
    NEWSTOCK = 'newstock',  
    STAFFORDER = 'stafforder'  
}

export type ModelTypeMap = {
    [ModelNames.USER]: User,
    [ModelNames.MEDIA]: Media,
    [ModelNames.GENERAL]: General,
    [ModelNames.BRAND]: Brand,
    [ModelNames.CATEGORY]: Category,
    [ModelNames.PRODUCT]: Product,
    [ModelNames.NEWSTOCK]: NewStock,
    [ModelNames.STAFFORDER]: StaffOrder,
}
