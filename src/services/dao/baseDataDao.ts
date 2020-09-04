import BaseUser from "@/models/entity/BaseUser";
import {CommonExcludeAttributes} from "@/constans/global";
import {dbCtx} from "@/server/db/db_context";
import User from "@/models/entity/User";

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
    if (params.role === "3"){
        const db = dbCtx();
        return await db.query(
            `
            select
            CONCAT(b.id,s.id) as id,
            b.name,b.phone,
            ps.student_phone AS studentPhone,
            s.name AS studentName
            from
            base_user b
            INNER JOIN
            parent_student ps
            on b.role='3' and b.phone=ps.phone
            LEFT JOIN
            base_user s
            on ps.student_phone=s.phone
            `,
            {
                type: db.QueryTypes.SELECT,
                plain: false,
                raw: true,
            }
        )
    }else{
        return await BaseUser.findAll({
            attributes: {exclude: [...CommonExcludeAttributes]},
            raw: true,
            where: params
        })
    }
}
