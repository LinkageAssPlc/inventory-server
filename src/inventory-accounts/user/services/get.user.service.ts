import { GetUserDTO } from "../DTOs/GetUserDTO";
import { UserModel } from "../../../inventory-entities"


export const getUser = async({userID}: GetUserDTO) => {
  const user = await UserModel.findById(userID);
  if (!user) throw new Error(`User ${userID} not found`);
  return user;
};
