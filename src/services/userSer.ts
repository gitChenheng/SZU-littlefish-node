import {
    findAllUsers, createUser, getByName, getByOpenid,
    updateUserInCondition, getById, updateUser, getInCondition
} from "@/services/dao/userDao";
import {_compare, _hash} from "@/utils/hash";
import {sign} from "@/middlewares/jwt";
import {setRedisData, getRedisData} from "@/services/common/redisSer";
import {JWT_SECRET} from "@/constans/global";
import jwt from "jsonwebtoken";

export const createToken = async (uid) => {
    const userInfo = {
        uid,
        timestamp: Date.now(),
    };
    const token = sign(userInfo);
    await setRedisData(token, userInfo);
    return token;
}

export const getUid = async (ctx) => {
    const token = ctx.request.header.token;
    if (token){
        const userInfo = await getRedisData(token);
        if (userInfo){
            return JSON.parse(userInfo).uid;
        } else{
            await jwt.verify(token, JWT_SECRET, null, async (err, decoded) => {
                if (err){
                    return null;
                }else{
                    return decoded.uid
                }
            });
        }
    }else{
        return null;
    }
}

export const getUserById = async (uid: string) => {
    return await getById(uid);
}

export const getUserByPhone = async (phone: string) => {
    return await getInCondition({phone})
}

export const getUserByStudyNum = async (studyNum: string) => {
    return await getInCondition({studyNum});
}

export const changeUserInfoById = async (item, id) => {
    return await updateUser(item, id);
}
export const changeUserInfo = async (item, obj) => {
    await updateUserInCondition(item, obj)
}

export const getAllUsers = async () => {
    return await findAllUsers();
}

// export const signInBySqlQuery = async (name, pwd) => {
//     return await getUserByPwd(name, pwd);
// }

export const signIn = async (name, pwd) => {
    const user = await getByName(name);
    const hashResult = await _compare(String(pwd), String(user.pwd));
    // const date = new Date();
    // if (hashResult) {
    //     const userInfo = {
    //         uid: id,
    //         timestamp: date.getTime()
    //     };
    //     const token = sign(userInfo);
    //     await newRedis.set(token, JSON.stringify(userInfo));
    //     await newRedis.expire(token, 30 * 24 * 60 * 60);
    //     return token;
    // }
    if (hashResult){
        return user;
    }else{
        return false;
    }
}

export const addUser = async (obj: any) => {
    // const pwd = await _hash(String(obj.pwd));
    return await createUser({
        ...obj,
        // pwd,
    });
}

export const findOrCreateUser = async (openid, obj) => {
    let user = await getByOpenid(openid);
    if (!user) {
        user = await addUser(obj);
    }
    return await createToken(user.id);
}
