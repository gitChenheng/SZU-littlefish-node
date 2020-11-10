import {Ctrl, Api, Get, Post, View} from "@/decorators/action";
import JSONResult from "../utils/JSONResult";
import {Context} from "koa";
import {createToken} from "@/services/userSer";
import {_hash, _compare} from "@/utils/hash";

@Ctrl
export default class AdminController{

    @Api
    @Post
    public static async testToken(ctx: Context){
        ctx.rest(JSONResult.ok());
    }

    // @Api
    // @Post
    // public static async register(ctx: Context){
    //     const hashPwd = await _hash(String("szu@123"));
    //     console.log(hashPwd)
    // }

    @Api
    @Post
    public static async login(ctx: Context){
        try {
            const body = ctx.request.body;
            if (!body.name || !body.pwd || (body.name !== "admin")){
                ctx.rest(JSONResult.err("账号密码错误"));
                return ;
            }
            const hashPwd = "$2a$10$WWJNydRTYeX0qZtGuzKmz.XbsCdy3mi/ctoOIsfIz2IVf49o2XRa6"; //szu@123
            const compareResult = await _compare(String(body.pwd), hashPwd);
            if (compareResult){
                const token = await createToken("szu-m");
                ctx.rest(JSONResult.ok({token}));
            }else{
                ctx.rest(JSONResult.err("账号密码错误"));
            }
        }catch (e) {
            throw e
        }
    }

}
