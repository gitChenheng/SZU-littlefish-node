import {bulkCreateBaseTranscript, getAllById} from "@/dao/transcriptDao";

export const addBulkTranscripts = async (records) => {
    return await bulkCreateBaseTranscript(records);
}

export const getTranscriptsById = async (id: string) => {
    return await getAllById(id)
}
