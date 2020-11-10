import BaseUser from "@/models/entity/BaseUser";
import {CommonExcludeAttributes} from "@/constans/global";
import {dbCtx} from "@/server/db/db_context";

export const bulkCreateBaseUsers = async (records: any[]) => {
    /**
     * records	Array	要创建实例的对象（键/值 对）列表
     * [options]	Object
     * [options.fields]	Array	要插入的字段。默认全部
     * [options.validate=true]	Boolean	插入每条记录前进行验证
     * [options.hooks=true]	Boolean	在执行前/后创建钩子
     * [options.individualHooks=false]	Boolean	在执行前/后为每个实例创建钩子
     * [options.ignoreDuplicates=false]	Boolean	忽略重复主键（Postgres不支持）
     * [options.updateOnDuplicate]	Array	如果行键已存在是否更新（mysql & mariadb支持）. 默认为更新
     * [options.transaction]	Transaction	在事务中执行查询
     */
    const res = await BaseUser.bulkCreate(records, {ignoreDuplicates: true});
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
