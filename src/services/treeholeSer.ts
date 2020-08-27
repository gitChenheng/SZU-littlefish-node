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
    const comments = await findTreeHoleComments(treeHoleId);
    return comments.map((item: any) => ({
        ...item,
        created_at: item.created_at ? new Date(item.created_at).toLocaleString("zh", { timeZone: "UTC"}) : ""
    }))
}

export const addTreeHoleComment  = async (item) => {
    return await insertTreeHoleComment(item);
}
