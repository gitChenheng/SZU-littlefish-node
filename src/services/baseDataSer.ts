import {IStudent} from "@/models/interface/user";
import {bulkCreateBaseUsers, findOneInCondition} from "@/dao/baseDataDao";
import {IBaseUser} from "@/models/interface/baseUser";

export const addBulkBaseStudents = async (records: IStudent[]) => {
    return await bulkCreateBaseUsers(records);
}

export const addBulkBaseParents = async (records: IBaseUser[]) => {
    return await bulkCreateBaseUsers(records);
}

export const findBaseUserInCondition = async (params: IBaseUser) => {
    return await findOneInCondition(params)
}
