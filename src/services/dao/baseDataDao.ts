import BaseUser from "@/models/entity/BaseUser";
import {CommonExcludeAttributes} from "@/constans/global";

export const bulkCreateBaseUsers = async (records: any[]) => {
    const res = await BaseUser.bulkCreate(records);
    return res.length === records.length;
}

export const findOneInCondition = async (params) => {
    return await BaseUser.findOne({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: params
    })
}

export const findAllInCondition = async (params) => {
    return await BaseUser.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: params
    })
}
