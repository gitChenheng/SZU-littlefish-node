import {Api, Ctrl, Get, Post} from "@/decorators/action";
import {Context} from "koa";
import {
    addCompetition, addScientific, getScientificDirects, getCompetitions, addRecruit,
    getRecruits, addTogether, getTogether, completeTogether,
    removeScientificDirects, changeScientificDirectsById, removeCompetition, changeCompetitionById,
} from "@/services/annSer";
import JSONResult from "@/utils/JSONResult";
import {getUid} from "@/services/userSer";

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
            console.log(body)
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
            console.log(body)
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
    public static async exportRecruit(ctx: Context){
        const body = ctx.request.body;
        try {
            console.log(body)
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
            ctx.rest(JSONResult.ok(res));
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
            const res = await addTogether({
                ...body,
                uid
            });
            if (res)
                ctx.rest(JSONResult.ok())
            else
                ctx.rest(JSONResult.err());
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
