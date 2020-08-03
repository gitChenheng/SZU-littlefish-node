import {bulkCreateParentStudent, getChildrenByParent} from "@/dao/parentStudentDao";

interface IParentStudent {
    parentId?: string;
    phone: string;
    studentId?: string;
    studentPhone: string;
}
export const bulkCreatePS = async (records: IParentStudent[]) => {
    return await bulkCreateParentStudent(records)
}

export const getAllChildren = async (phone) => {
    return await getChildrenByParent(phone);
}
