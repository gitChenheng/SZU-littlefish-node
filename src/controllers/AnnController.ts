import {Api, Ctrl, Post} from "@/decorators/action";
import {Context} from "koa";

@Ctrl
export default class AnnController {

    @Api
    @Post
    public static async exportScientificDirect(ctx: Context){
        return ;
    }

}
