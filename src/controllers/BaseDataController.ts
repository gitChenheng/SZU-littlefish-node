import {addBulkBaseStudents, addBulkBaseParents, addBulkBaseTeachers, findBaseUsersInCondition,
    removeBaseUserById, changeBaseUserById} from "@/services/baseDataSer";
import {Ctrl, Api, Get, Post, View} from "@/decorators/action";
import JSONResult from "../utils/JSONResult";
import {Context} from "koa";
import {bulkCreatePS, getAllParentStudent} from "@/services/parentStudentSer";
import {addBulkTranscripts, getAllTranscripts} from "@/services/transcriptSer";
import {getUserByStudyNum} from "@/services/userSer";
import {upload} from "@/services/common/upload";

@Ctrl
export default class BaseDataController{

    @Api
    @Post
    public static async uploadFile(ctx: Context){
        try {
            const filePath = await upload(ctx);
            if (filePath)
                ctx.rest(JSONResult.ok(filePath));
        }catch (e) {
            throw e
        }
    }

    @Api
    @Get
    public static async getBaseUsers(ctx: Context){
        const params = ctx.request.query;
        try {
            const res = await findBaseUsersInCondition(params);
            if (res)
                ctx.rest(JSONResult.ok(res));
            else
                ctx.rest(JSONResult.err())
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Get
    public static async getBaseParentStudent(ctx: Context){
        try {
            const res = await getAllParentStudent();
            if (res)
                ctx.rest(JSONResult.ok(res));
            else
                ctx.rest(JSONResult.err())
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Get
    public static async getAllTranscripts(ctx: Context){
        try {
            const res = await getAllTranscripts();
            if (res)
                ctx.rest(JSONResult.ok(res));
            else
                ctx.rest(JSONResult.err())
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Post
    public static async exportBaseStudents(ctx: Context){
        const body = ctx.request.body;
        console.log(body)
        try {
            const res = await addBulkBaseStudents(body);
            if (res)
                ctx.rest(JSONResult.ok("导入成功"));
            else
                ctx.rest(JSONResult.err("导入失败"))
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Post
    public static async exportBaseTeachers(ctx: Context){
        const body = ctx.request.body;
        console.log(body)
        try {
            const res = await addBulkBaseTeachers(body);
            if (res)
                ctx.rest(JSONResult.ok("导入成功"));
            else
                ctx.rest(JSONResult.err("导入失败"))
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Post
    public static async exportBaseParents(ctx: Context){
        const body = ctx.request.body;
        console.log(body);
        try {
            const res = await addBulkBaseParents(body);
            if (res)
                ctx.rest(JSONResult.ok("导入成功"));
            else
                ctx.rest(JSONResult.err("导入失败"))
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Post
    public static async exportBaseParentStudent(ctx: Context){
        const body = ctx.request.body;
        try {
            console.log(body)
            const psRes = await bulkCreatePS(body);
            console.log("psRes", psRes)
            if (psRes)
                ctx.rest(JSONResult.ok("导入成功"))
            else
                ctx.rest(JSONResult.err("导入失败"))
        }catch (e) {
            ctx.rest(JSONResult.err(e))
        }
    }

    @Api
    @Post
    public static async exportTranscripts(ctx: Context){
        const body = ctx.request.body;
        console.log(body)
        try {
            // const transcripts: any[] = [];
            // for (const o of body){
            //     const userInfo = await getUserByStudyNum(o.studyNum);
            //     if (userInfo){
            //         transcripts.push({
            //             ...o,
            //             uid: userInfo.id,
            //         })
            //     }else{
            //         transcripts.push(o)
            //     }
            // }
            const psRes = await addBulkTranscripts(body);
            console.log("psRes", psRes)
            if (psRes)
                ctx.rest(JSONResult.ok("导入成功"))
            else
                ctx.rest(JSONResult.err("导入失败"))
        }catch (e) {
            ctx.rest(JSONResult.err(e))
        }
    }

    @Api
    @Post
    public static async removeBaseUserById(ctx : Context){
        const body = ctx.request.body;
        console.log(body);
        try {
            const res = removeBaseUserById(body.id);
            ctx.rest(JSONResult.ok(res));
        }catch (e) {
            ctx.rest(JSONResult.err(e));
        }
    }

    @Api
    @Post
    public static async changeBaseUserById(ctx : Context){
        const body = ctx.request.body;
        const id = body.id;
        delete body.id;
        delete body.phone;
        try {
            const res = await changeBaseUserById(body, id);
            if (res){
                ctx.rest(JSONResult.ok())
            }else{
                ctx.rest(JSONResult.err("update failed"))
            }
        }catch (e) {
            ctx.rest(JSONResult.err(e));
        }
    }
}
