import {Ctrl, Api, Get, Post, View} from "@/decorators/action";
import JSONResult from "../utils/JSONResult";
import {Context} from "koa";
import {createToken, getUid} from "@/services/userSer";

@Ctrl
export default class AdminController{

    @Api
    @Post
    public static async testToken(ctx: Context){
        // const uid = await getUid(ctx);
        ctx.rest(JSONResult.ok());
        // if (uid)
        //     ctx.rest(JSONResult.ok());
        // else{
        //     ctx.status = 400;
        //     ctx.rest({
        //         msg: "身份认证失败"
        //     })
        // }
    }

    @Api
    @Post
    public static async login(ctx: Context){
        const body = ctx.request.body;
        console.log(body);
        if (body.name === "admin" && body.pwd === "1234"){
            const token = await createToken("admin");
            ctx.rest(JSONResult.ok({token}));
        }else{
            ctx.rest(JSONResult.err("账号密码错误"));
        }
    }

}
