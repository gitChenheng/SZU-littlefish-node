import User from "@/models/entity/User";
import {generateId} from "@/utils/util";
import {dbCtx} from "@/server/db/db_context";
import {CommonExcludeAttributes} from "@/constans/global";

export const getById = async (id) => {
    return await User.findOne({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: {id}
    });
}

export const getInCondition = async (condition) => {
    return await User.findOne({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: condition
    });
}

export const getByOpenid = async (openid) => {
    return await User.findOne({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: {openid}
    });
    // const db = dbCtx();
    // return await db.query(`SELECT count(*) FROM users where openid=:openid`, {
    //     types: db.QueryTypes.SELECT,
    //     plain: false,
    //     raw: true,
    //     replacements: {
    //         openid,
    //     }
    // })
}

export const getByName = async (name) => {
    return await User.findOne({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: {name}
    });
}

export const getByCondition = async (obj) => {
    return await User.findOne({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: obj
    });
}

// export const getUserByPwd = async (name, pwd) => {
//     const db = dbCtx();
//     return await db.query(`SELECT * FROM users where name=:name and pwd=:pwd`, {
//         types: db.QueryTypes.SELECT,
//         plain: false,
//         raw: true,
//         replacements: {
//             name,
//             pwd,
//         }
//     })
// }

export const findAllUsers = async () => {
    return await User.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
    });
}

export const updateUser = async (item, id) => {
    return await User.update(
        item,
        {where: {id}}
    )
}

export const updateUserInCondition = async (item, condition) => {
    return await User.update(
        {item},
        {where: condition}
        )
}

export const createUser = async (item) => {
    item = {
        id: generateId(5),
        ...item,
    }
    return await User.create(item);
}

export const deleteUser = async (id) => {
    return await User.destroy({
        where: {id}
    });
}
