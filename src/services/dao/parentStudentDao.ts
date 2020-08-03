import ParentStudent from "@/models/entity/ParentStudent";

export const bulkCreateParentStudent = async (records: any[]) => {
    const res = await ParentStudent.bulkCreate(records);
    return res.length === records.length;
}

export const getChildrenByParent = async (phone) => {
    return await ParentStudent.findAll({
        raw: true,
        where: {phone}
    })
}
