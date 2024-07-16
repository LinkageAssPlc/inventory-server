import httpStatus from "http-status";

import { CategoryDTO } from "../DTOs/CategoryDTO";
import { getUser } from "../../inventory-accounts/user/services";


export const CategoryService = async ({userID, name, parent}: CategoryDTO) => {
    const user = await getUser({userID});

}
