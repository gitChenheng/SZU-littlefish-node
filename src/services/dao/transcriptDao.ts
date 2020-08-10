import Transcript from "@/models/entity/Transcript";
import {CommonExcludeAttributes} from "@/constans/global";

export const bulkCreateBaseTranscript = async (records: any[]) => {
    const res = await Transcript.bulkCreate(records);
    return res.length === records.length;
}

export const getAllById = async (uid) => {
    return await Transcript.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: {uid}
    });
}
