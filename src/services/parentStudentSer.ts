import {
    bulkCreateParentStudent,
    findAllParentStudent,
    getChildrenByParent
} from "@/services/dao/parentStudentDao";

export const getAllParentStudent = async () => {
    return await findAllParentStudent();
}

interface IParentStudent {
    phone: string;
    studentPhone: string;
}
export const bulkCreatePS = async (records: IParentStudent[]) => {
    return await bulkCreateParentStudent(records)
}

export const getAllChildren = async (phone) => {
    return await getChildrenByParent(phone);
}
