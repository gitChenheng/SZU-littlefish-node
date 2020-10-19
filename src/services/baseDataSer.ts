import {IStudent, ITeacher} from "@/models/interface/user";
import {bulkCreateBaseUsers, findAllInCondition,
    findOneInCondition, updateBaseUser, deleteBaseUser} from "@/services/dao/baseDataDao";
import {IBaseUser, IRole} from "@/models/interface/baseUser";

export const addBulkBaseStudents = async (records: IStudent[]) => {
    return await bulkCreateBaseUsers(records);
}

export const addBulkBaseTeachers = async (records: ITeacher[]) => {
    return await bulkCreateBaseUsers(records);
}

export const addBulkBaseParents = async (records: IBaseUser[]) => {
    return await bulkCreateBaseUsers(records);
}

export const findBaseUserInCondition = async (params: IBaseUser) => {
    return await findOneInCondition(params)
}

export const findBaseUsersInCondition = async (params: IRole) => {
    return await findAllInCondition(params)
}

export const getBaseUserByPhone = async (phone: string) => {
    return await findOneInCondition({phone})
}

export const changeBaseUserById = async (item, id) => {
    return await updateBaseUser(item, id);
}
export const removeBaseUserById = async (id) => {
    return await deleteBaseUser(id);
}
