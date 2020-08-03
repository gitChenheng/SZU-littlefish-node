import {addBulkBaseStudents, addBulkBaseParents} from "@/services/baseDataSer";
import {Ctrl, Api, Get, Post, View} from "@/decorators/action";
import JSONResult from "../utils/JSONResult";
import {Context} from "koa";
import {bulkCreatePS} from "@/services/parentStudentSer";
import {addBulkTranscripts} from "@/services/transcriptSer";
import {getUserByStudyNum} from "@/services/userSer";

@Ctrl
export default class BaseDataController{

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
            console.log('psRes',psRes)
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
        try {
            const transcripts: any[] = [];
            for (const o of body){
                const userInfo = await getUserByStudyNum(o.studyNum);
                transcripts.push({
                    ...o,
                    uid: userInfo.id,
                })
            }
            console.log(transcripts)
            const psRes = await addBulkTranscripts(transcripts);
            console.log('psRes',psRes)
            if (psRes)
                ctx.rest(JSONResult.ok("导入成功"))
            else
                ctx.rest(JSONResult.err("导入失败"))
        }catch (e) {
            ctx.rest(JSONResult.err(e))
        }
    }

}
