import BaseUser from "@/models/entity/BaseUser";
import {CommonExcludeAttributes} from "@/constans/global";
import {dbCtx} from "@/server/db/db_context";

export const bulkCreateBaseUsers = async (records: any[]) => {
    const res = await BaseUser.bulkCreate(records);
    return res.length === records.length;
}

export const deleteBaseUser = async (id) => {
    return await BaseUser.destroy({
        where: {id}
    });
}

export const updateBaseUser = async (item, id) => {
    return await BaseUser.update(
        item,
        {where: {id}}
    )
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
            ps.id as id,
            CONCAT(b.id,s.id) as combId,
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
            on ps.student_phone=s.phone WHERE ps.deleted_at IS NULL
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
