import {findOrCreateUser, getUid, getUserById, changeUserInfoById, getUserByPhone} from "@/services/userSer";
import {Ctrl, Api, Get, Post, View} from "@/decorators/action";
import JSONResult from "../utils/JSONResult";
import {js_code2_session} from "@/services/common/wx";
import {utf16toEntities} from "@/utils/util";
import {Context} from "koa";
import {findBaseUserInCondition} from "@/services/baseDataSer";
import {getAllChildren} from "@/services/parentStudentSer";
import {getTranscriptsById} from "@/services/transcriptSer";
import WXBizDataCrypt from "@/utils/watermark/WXBizDataCrypt";
import {APP_ID} from "@/constans/wx";

@Ctrl
export default class UserController{

    @Api
    @Post
    public static async login(ctx: Context) {
        const body = ctx.request.body;
        const {code, nickName} = body;
        try {
            const jscode2session = await js_code2_session(code);
            if (jscode2session.errcode){
                ctx.rest(JSONResult.err(jscode2session.errmsg))
            }else{
                const openid = JSON.parse(jscode2session).openid;
                if (!openid){
                    ctx.rest(JSONResult.err("登录失败,缺省openid"));
                    return ;
                }
                const userItem = {
                    ...body,
                    openid,
                    nickName: utf16toEntities(nickName),
                };
                delete userItem.code;
                const token = await findOrCreateUser(openid, userItem);
                if (token)
                    ctx.rest(JSONResult.ok({token}, "登录成功"));
            }
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Post
    public static async getUserInfo(ctx: Context) {
        try {
            const uid = await getUid(ctx);
            if (!uid){
                ctx.rest(JSONResult.authority())
            }else{
                const res = await getUserById(uid);
                if (res){
                    ctx.rest(JSONResult.ok(res))
                }else{
                    ctx.rest(JSONResult.authority("未找到用户信息"))
                }
            }
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Post
    public static async getPhoneNum(ctx: Context){
        const body = ctx.request.body;
        try {
            const jcs = await js_code2_session(body.code);
            if (jcs.errcode){
                ctx.rest(JSONResult.err(jcs.errmsg))
            }else{
                const iv = body.iv;
                const encryptedData = body.encryptedData;
                const pc = new WXBizDataCrypt(APP_ID, JSON.parse(jcs).session_key);
                const data = pc.decryptData(encryptedData, iv);
                ctx.rest(JSONResult.ok({
                    phone: data.purePhoneNumber,
                    countryCode: data.countryCode,
                }))
            }
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Post
    public static async completeUserInfo(ctx: Context) {
        const body = ctx.request.body;
        const {role, phone, name, teachCardNum, studyNum} = body;
        if (!role || !phone || !name){
            ctx.rest(JSONResult.err());
            return ;
        }
        if (role === 1 && (!studyNum)){//学生
            ctx.rest(JSONResult.err());
            return ;
        } else if (role === 2 && (!teachCardNum)){//教师
            ctx.rest(JSONResult.err());
            return ;
        }
        try {
            let params: any = {};
            if (role === 1){
                params = {
                    studyNum,
                }
            } else if (role === 2){
                params = {
                    teachCardNum,
                }
            }
            const baseUserRes = await findBaseUserInCondition({
                ...params,
                role,
                name,
                phone,
            });
            if (!baseUserRes){
                ctx.rest(JSONResult.err("信息不匹配"));
                return ;
            }
            const uid = await getUid(ctx);
            if (uid){
                delete baseUserRes.id;
                const res = await changeUserInfoById(baseUserRes, uid);
                if (res)
                    ctx.rest(JSONResult.ok())
            } else{
                ctx.rest(JSONResult.err("未找到用户信息"))
            }
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Post
    public static async getChildrenInfo(ctx: Context) {
        try {
            const uid = await getUid(ctx);
            if (!uid){
                ctx.rest(JSONResult.authority())
            }else{
                const userInfo = await getUserById(uid);
                if (userInfo.role !== 3) {
                    ctx.rest(JSONResult.err("角色身份错误"));
                    return ;
                }
                const phone = userInfo.phone;
                const res = await getAllChildren(phone);
                const allChildren = [];
                if (res.length){
                    for (const o of res){
                        const childInfo = await getUserByPhone(o.studentPhone);
                        const transcripts = await getTranscriptsById(childInfo.id);
                        allChildren.push({
                            ...childInfo,
                            transcripts
                        })
                    }
                }
                ctx.rest(JSONResult.ok(allChildren))
            }
        }catch (e) {
            throw e;
        }
    }

    // @View
    // public static async loginView(ctx: Context){
    //     ctx.types = "text/html;charset=utf-8";
    //     ctx.body = `<form action="/api/user/signIn" method="post">
    //         <p>Name: <input name="name" value=""></p>
    //         <p>pwd: <input name="pwd" types="text"></p>
    //         <p><input types="submit" value="Submit"></p>
    //     </form>`;
    // }

    // @Api
    // @Post
    // public async signIn(ctx){
    //     const body = ctx.request.body;
    //     //..
    //     try {
    //         // //mysql query
    //         // const res = await signInBySqlQuery(body.name, body.pwd);
    //         // if (res.length){
    //         //     ctx.rest(JSONResult.ok(res));
    //         // } else{
    //         //     ctx.rest(JSONResult.err("name or pwd is incorrect"))
    //         // }
    //
    //         //map hash
    //         const res = await signIn(body.name, body.pwd);
    //         if (res){
    //             ctx.rest(JSONResult.ok(res));
    //         }else {
    //             ctx.rest(JSONResult.err("name or pwd is incorrect"))
    //         }
    //     }catch (e) {
    //         throw e
    //     }
    // }

    // @Api
    // @Post
    // public async register(ctx){
    //     const body = ctx.request.body;
    //     try {
    //         const res = await addUser(body);
    //         if (res)
    //             ctx.rest(JSONResult.ok())
    //     }catch (e) {
    //         throw e;
    //     }
    // }
}
