import {bulkCreateBaseTranscript, findAllTranscripts, getAllById, getAllInCondition} from "@/services/dao/transcriptDao";

export const addBulkTranscripts = async (records) => {
    return await bulkCreateBaseTranscript(records);
}

export const getTranscriptsById = async (id: string) => {
    return await getAllById(id)
}

export const getAllTranscripts = async () => {
    return await findAllTranscripts();
}

export const getAllByStudyNum = async (studyNum: string) => {
    return await getAllInCondition({studyNum});
}
