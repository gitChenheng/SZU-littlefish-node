import {
    createTreeHole,
    findMyTreeHoles,
    findTreeHoleComments, findTreeHoles,
    insertTreeHoleComment
} from "@/services/dao/treeholeDao";

export const getAllTreeHoles = async () => {
    return await findTreeHoles();
}

export const getMyTreeHoles = async (uid: string) => {
    return await findMyTreeHoles(uid);
}

export const addMyTreeHole  = async (item) => {
    return await createTreeHole(item);
}

export const getTreeHoleComments = async (treeHoleId) => {
    return await findTreeHoleComments(treeHoleId);
}

export const addTreeHoleComment  = async (item) => {
    return await insertTreeHoleComment(item);
}
