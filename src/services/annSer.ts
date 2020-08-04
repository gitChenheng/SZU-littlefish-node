import {
    getAllScientific,
    createScientific,
    createCompetition,
    getAllCompetitions,
    createRecruit,
    getAllRecruits, createTogether, findAllTogether, updateTogether
} from "@/services/dao/annDao";
import {ICompleteTogether, ICreateTogether} from "@/models/interface/ann";

export const getScientificDirects = async () => {
    return await getAllScientific();
}

export const getCompetitions = async () => {
    const type1 = await getAllCompetitions(1);
    const type2 = await getAllCompetitions(2);
    return {
        type1,
        type2
    }
}

export const getRecruits = async () => {
    return await getAllRecruits();
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
    return await findAllTogether();
}

export const addTogether = async (item: ICreateTogether) => {
    return await createTogether(item);
}

export const completeTogether = async (obj: ICompleteTogether, id) => {
    return await updateTogether(obj, id);
}


