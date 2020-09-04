import {Api, Ctrl, Get, Post} from "@/decorators/action";
import {Context} from "koa";
import JSONResult from "@/utils/JSONResult";
import {
    addMyTreeHole,
    addTreeHoleComment, getAllTreeHoles,
    getMyTreeHoles,
    getTreeHoleComments
} from "@/services/treeholeSer";
import {getUid} from "@/services/userSer";

@Ctrl
export default class TreeHoleController {

    @Api
    @Get
    public static async getAllTreeHoles(ctx: Context){
        try {
            const res = await getAllTreeHoles();
            if (res.length){
                for (const it of res){
                    it.comments = await getTreeHoleComments(it.id);
                }
                ctx.rest(JSONResult.ok(res));
            }else {
                ctx.rest(JSONResult.ok(res));
            }
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Get
    public static async getMyTreeHoles(ctx: Context){
        try {
            const uid = await getUid(ctx);
            if (uid){
                const res = await getMyTreeHoles(uid);
                if (res.length){
                    for (const it of res){
                        it.comments = await getTreeHoleComments(it.id);
                    }
                }
                ctx.rest(JSONResult.ok(res));
            }else{
                ctx.rest(JSONResult.ok([]));
            }
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Post
    public static async addMyTreeHole(ctx: Context){
        const body = ctx.request.body;
        try {
            const uid = await getUid(ctx);
            const res = await addMyTreeHole({
                ...body,
                uid,
            });
            if (res)
                ctx.rest(JSONResult.ok());
            else
                ctx.rest(JSONResult.err());
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Post
    public static async getTreeHoleComments(ctx: Context){
        const body = ctx.request.body;
        try {
            const res = await getTreeHoleComments(body.treeHoleId);
            if (res)
                ctx.rest(JSONResult.ok(res));
            else
                ctx.rest(JSONResult.err());
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Post
    public static async addTreeHoleComment(ctx: Context){
        const body = ctx.request.body;
        try {
            const uid = await getUid(ctx);
            const res = await addTreeHoleComment({
                ...body,
                uid,
            });
            if (res)
                ctx.rest(JSONResult.ok());
            else
                ctx.rest(JSONResult.err());
        }catch (e) {
            throw e;
        }
    }

}
