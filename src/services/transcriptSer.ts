import {bulkCreateBaseTranscript, deleteTranscript, findAllTranscripts,
    getAllById, getAllInCondition, updateTranscript} from "@/services/dao/transcriptDao";

export const addBulkTranscripts = async (records) => {
    return await bulkCreateBaseTranscript(records);
}

export const getTranscriptsById = async (id: string) => {
    return await getAllById(id)
}

export const getAllTranscripts = async () => {
    return await findAllTranscripts();
}
export const changeTranscriptById = async (item, id) => {
    return await updateTranscript(item, id);
}
export const removeTranscriptById = async (id) => {
    return await deleteTranscript(id);
}

export const getAllByStudyNum = async (studyNum: string) => {
    return await getAllInCondition({studyNum});
}
