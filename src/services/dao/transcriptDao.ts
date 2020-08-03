import Transcript from "@/models/entity/Transcript";

export const bulkCreateBaseTranscript = async (records: any[]) => {
    const res = await Transcript.bulkCreate(records);
    return res.length === records.length;
}

export const getAllById = async (uid) => {
    return await Transcript.findAll({
        raw: true,
        where: {uid}
    });
}
