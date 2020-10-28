import {
    bulkCreateParentStudent, deleteParentStudent,
    findAllParentStudent,
    getChildrenByParent
} from "@/services/dao/parentStudentDao";

export const getAllParentStudent = async () => {
    return await findAllParentStudent();
}
export const removeParentStudentById = async (id) => {
    return await deleteParentStudent(id);
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
