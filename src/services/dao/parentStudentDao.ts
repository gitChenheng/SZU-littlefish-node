import ParentStudent from "@/models/entity/ParentStudent";
import {CommonExcludeAttributes} from "@/constans/global";

export const bulkCreateParentStudent = async (records: any[]) => {
    const res = await ParentStudent.bulkCreate(records);
    return res.length === records.length;
}

export const getChildrenByParent = async (phone) => {
    return await ParentStudent.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: {phone}
    })
}
