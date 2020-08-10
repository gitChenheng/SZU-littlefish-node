import fs from "fs";
import Router from "koa-router";
import {CTRL, GET, POST, Controller} from "@/constans/decorator";
import {verbDescriptors} from "@/decorators/action";

const baseDescriptors = [
    "length",
    "prototype",
    "name",
    ...Object.values(verbDescriptors),
];
const router = new Router();
const files = fs.readdirSync(`${process.cwd()}/src/controllers/`);
const initRoute = () => {
    for (const f of files){
        import(`${process.cwd()}/src/controllers/${String(f)}`)
            .then(m => {
                const o = m.default;
                const _descriptor = Object.getOwnPropertyDescriptors(o);
                let _name = String(f).split(Controller)[0];
                _name = _name.replace(_name[0], _name[0].toLowerCase());
                if (_descriptor.type && _descriptor.type.value === CTRL){
                    for (const funcName of Object.keys(_descriptor)){
                        if (baseDescriptors.includes(funcName)){
                            continue;
                        }
                        const func = _descriptor[funcName].value;
                        const _method = func.method;
                        const _reqPrefix = func.reqPrefix || "/";
                        const finalUrl = `${_reqPrefix}${_name}/${funcName}`;
                        console.log(finalUrl);
                        if (_method && _method.toUpperCase() === GET){
                            router.get(finalUrl, func);
                        }else if (_method && _method.toUpperCase() === POST){
                            router.post(finalUrl, func);
                        }else{
                            router.get(finalUrl, func);
                            router.post(finalUrl, func);
                        }
                    }
                }
            })
            .catch(e => {
                throw e;
            });
    }
}

initRoute();

export default router;
