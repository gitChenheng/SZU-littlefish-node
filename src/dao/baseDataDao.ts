import BaseUser from "@/models/entity/BaseUser";

export const bulkCreateBaseUsers = async (records: any[]) => {
    const res = await BaseUser.bulkCreate(records);
    return res.length === records.length;
}

export const findOneInCondition = async (params) => {
    return await BaseUser.findOne({
        raw: true,
        where: params
    })
}
