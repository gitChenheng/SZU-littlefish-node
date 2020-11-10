import {
    getAllScientific, createScientific, createCompetition, getAllCompetitions, createRecruit,
    getAllRecruits, createTogether, findAllTogether, updateTogether, deleteScientific,
    updateScientific, updateCompetition, deleteCompetition, updateRecruit, deleteRecruit, getScientificById, getCompetitionById
} from "@/services/dao/annDao";
import {ICompleteTogether, ICreateTogether} from "@/models/interface/ann";
import {timeFormat} from "@/utils/util";

export const getScientificDirects = async () => {
    return await getAllScientific();
}
export const getScientificDirect = async (id) => {
    return await getScientificById(id);
}
export const changeScientificDirectsById = async (item, id) => {
    return await updateScientific(item, id);
}
export const removeScientificDirects = async (id) => {
    return await deleteScientific(id);
}

export const getCompetitions = async () => {
    const type1 = await getAllCompetitions(1);
    const type2 = await getAllCompetitions(2);
    return {
        type1,
        type2
    }
}
export const getCompetition = async (id) => {
    return await getCompetitionById(id);
}
export const changeCompetitionById = async (item, id) => {
    return await updateCompetition(item, id);
}
export const removeCompetition = async (id) => {
    return await deleteCompetition(id);
}

export const getRecruits = async () => {
    const res = await getAllRecruits();
    return res.map((item: any) => ({
        ...item,
        created_at: timeFormat(item.created_at)
    }))
}
export const changeRecruitById = async (item, id) => {
    return await updateRecruit(item, id);
}
export const removeRecruit = async (id) => {
    return await deleteRecruit(id);
}

export const addScientific = async (item) => {
    return await createScientific(item);
}

export const addCompetition = async (item) => {
    return await createCompetition(item);
}

export const addRecruit = async (item) => {
    return await createRecruit(item);
}

export const getTogether = async () => {
    const res = await findAllTogether();
    return res.map((item: any) => ({
        ...item,
        created_at: timeFormat(item.created_at),
        time: timeFormat(item.time)
    }))
}

export const addTogether = async (item: ICreateTogether) => {
    return await createTogether(item);
}

export const completeTogether = async (obj: ICompleteTogether, id) => {
    return await updateTogether(obj, id);
}


