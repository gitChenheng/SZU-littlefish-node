import {Api, Ctrl, Get, Post} from "@/decorators/action";
import {Context} from "koa";
import JSONResult from "@/utils/JSONResult";
import {
    addMyTreeHole,
    addTreeHoleComment, getAllTreeHoles,
    getMyTreeHoles,
    getTreeHoleComments, removeTreeHoleComment
} from "@/services/treeholeSer";
import {getUid, getUserById} from "@/services/userSer";
import {get_access_token, msg_sec_check} from "@/services/common/wx";
import {RISKY_HINT} from "@/constans/code_status";

@Ctrl
export default class TreeHoleController {

    @Api
    @Post
    public static async getAllTreeHoles(ctx: Context){
        const {body} = ctx.request;
        try {
            const resWidthTotal = await getAllTreeHoles(body.pageIndex, body.pageSize);
            const res = resWidthTotal.data;
            if (res.length){
                for (const it of res){
                    it.comments = await getTreeHoleComments(it.id);
                    it.issuener = await getUserById(it.uid);
                }
                ctx.rest(JSONResult.ok(resWidthTotal));
            }else {
                ctx.rest(JSONResult.ok(resWidthTotal));
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
            const at = await get_access_token();
            if (at.errcode){
                ctx.rest(JSONResult.err(at.errmsg))
            }else {
                const access_token = at.access_token;
                const msg_sec_res = await msg_sec_check(access_token, JSON.stringify(body));
                if (msg_sec_res.errcode === 87014){
                    ctx.rest(JSONResult.err(RISKY_HINT))
                }else if (msg_sec_res.errcode){
                    ctx.rest(JSONResult.err(msg_sec_res.errmsg))
                }else {
                    const res = await addMyTreeHole({
                        ...body,
                        uid,
                    });
                    if (res)
                        ctx.rest(JSONResult.ok());
                    else
                        ctx.rest(JSONResult.err());
                }
            }
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
    @Api
    @Post
    public static async removeTreeHoleComment(ctx: Context){
        const body = ctx.request.body;
        try {
            const res = await removeTreeHoleComment(body.id);
            if (res)
                ctx.rest(JSONResult.ok());
            else
                ctx.rest(JSONResult.err());
        }catch (e) {
            throw e;
        }
    }

}
