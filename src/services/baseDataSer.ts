import {IStudent, ITeacher} from "@/models/interface/user";
import {bulkCreateBaseUsers, findAllInCondition, findOneInCondition} from "@/services/dao/baseDataDao";
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
