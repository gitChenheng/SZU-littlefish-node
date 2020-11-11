import {Api, Ctrl, Get, Post} from "@/decorators/action";
import {Context} from "koa";
import {
    addCompetition, addScientific, getScientificDirects, getCompetitions, addRecruit,
    getRecruits, addTogether, getTogether, completeTogether, getScientificDirect,
    removeScientificDirects, changeScientificDirectsById, removeCompetition, changeCompetitionById, removeRecruit, changeRecruitById, getCompetition,
} from "@/services/annSer";
import JSONResult from "@/utils/JSONResult";
import {getUid, getUserById} from "@/services/userSer";
import {get_access_token, msg_sec_check} from "@/services/common/wx";
import {RISKY_HINT} from "@/constans/code_status";

@Ctrl
export default class AnnController {

    @Api
    @Get
    public static async getScientificDirect(ctx){
        try {
            const res = await getScientificDirects();
            ctx.rest(JSONResult.ok(res));
        }catch (e) {
            throw e;
        }
    }
    @Api
    @Post
    public static async getScientificDirectById(ctx){
        const body = ctx.request.body;
        try {
            const res = await getScientificDirect(body.id);
            ctx.rest(JSONResult.ok(res));
        }catch (e) {
            throw e;
        }
    }
    @Api
    @Post
    public static async removeScientificDirectById(ctx : Context){
        const body = ctx.request.body;
        try {
            const res = removeScientificDirects(body.id);
            ctx.rest(JSONResult.ok(res));
        }catch (e) {
            ctx.rest(JSONResult.err(e));
        }
    }
    @Api
    @Post
    public static async changeScientificDirectById(ctx : Context){
        const body = ctx.request.body;
        const id = body.id;
        try {
            const res = await changeScientificDirectsById(body, id);
            if (res){
                ctx.rest(JSONResult.ok())
            }else{
                ctx.rest(JSONResult.err("update failed"))
            }
        }catch (e) {
            ctx.rest(JSONResult.err(e));
        }
    }
    @Api
    @Post
    public static async exportScientificDirect(ctx: Context){
        const body = ctx.request.body;
        try {
            const res = await addScientific(body);
            if (res)
                ctx.rest(JSONResult.ok())
            else
                ctx.rest(JSONResult.err());
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Get
    public static async getCompetitions(ctx){
        try {
            const res = await getCompetitions();
            ctx.rest(JSONResult.ok(res));
        }catch (e) {
            throw e;
        }
    }
    @Api
    @Post
    public static async getCompetitionsById(ctx){
        const body = ctx.request.body;
        try {
            const res = await getCompetition(body.id);
            ctx.rest(JSONResult.ok(res));
        }catch (e) {
            throw e;
        }
    }
    @Api
    @Post
    public static async removeCompetitionById(ctx : Context){
        const body = ctx.request.body;
        try {
            const res = removeCompetition(body.id);
            ctx.rest(JSONResult.ok(res));
        }catch (e) {
            ctx.rest(JSONResult.err(e));
        }
    }
    @Api
    @Post
    public static async changeCompetitionById(ctx : Context){
        const body = ctx.request.body;
        const id = body.id;
        try {
            const res = await changeCompetitionById(body, id);
            if (res){
                ctx.rest(JSONResult.ok())
            }else{
                ctx.rest(JSONResult.err("update failed"))
            }
        }catch (e) {
            ctx.rest(JSONResult.err(e));
        }
    }

    @Api
    @Post
    public static async exportCompetition(ctx: Context){
        const body = ctx.request.body;
        try {
            const res = await addCompetition(body);
            if (res)
                ctx.rest(JSONResult.ok())
            else
                ctx.rest(JSONResult.err());
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Get
    public static async getRecruits(ctx){
        try {
            const res = await getRecruits();
            ctx.rest(JSONResult.ok(res));
        }catch (e) {
            throw e;
        }
    }
    @Api
    @Post
    public static async removeRecruitById(ctx : Context){
        const body = ctx.request.body;
        try {
            const res = removeRecruit(body.id);
            ctx.rest(JSONResult.ok(res));
        }catch (e) {
            ctx.rest(JSONResult.err(e));
        }
    }
    @Api
    @Post
    public static async changeRecruitById(ctx : Context){
        const body = ctx.request.body;
        const id = body.id;
        try {
            const res = await changeRecruitById(body, id);
            if (res){
                ctx.rest(JSONResult.ok())
            }else{
                ctx.rest(JSONResult.err("update failed"))
            }
        }catch (e) {
            ctx.rest(JSONResult.err(e));
        }
    }

    @Api
    @Post
    public static async exportRecruit(ctx: Context){
        const body = ctx.request.body;
        try {
            const res = await addRecruit(body);
            if (res)
                ctx.rest(JSONResult.ok())
            else
                ctx.rest(JSONResult.err());
        }catch (e) {
            throw e;
        }
    }

    @Api
    @Get
    public static async getTogether(ctx){
        try {
            const res = await getTogether();
            if (res.length){
                for (const it of res){
                    const userInfo = await getUserById(it.uid);
                    it.submitter = userInfo.name;
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
    @Post
    public static async addTogether(ctx: Context){
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
                    const res = await addTogether({
                        ...body,
                        uid
                    });
                    if (res)
                        ctx.rest(JSONResult.ok())
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
    public static async completeTogether(ctx: Context){
        const body = ctx.request.body;
        const {id, time, address} = body;
        if (!id){
            ctx.rest(JSONResult.err("id不存在"));
            return ;
        }
        if (!time){
            ctx.rest(JSONResult.err("请填写时间"));
            return ;
        }
        if (!address){
            ctx.rest(JSONResult.err("请填写地址"));
            return ;
        }
        try {
            delete body.id;
            const res = await completeTogether(body, id);
            if (res)
                ctx.rest(JSONResult.ok());
            else
                ctx.rest(JSONResult.err());
        }catch (e) {
            throw e;
        }
    }

}
