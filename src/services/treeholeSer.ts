import {
    createTreeHole,
    findMyTreeHoles,
    findTreeHoleComments, findTreeHoles,
    insertTreeHoleComment
} from "@/services/dao/treeholeDao";
import {timeFormat} from "@/utils/util";

export const getAllTreeHoles = async () => {
    return await findTreeHoles();
}

export const getMyTreeHoles = async (uid: string) => {
    const res = await findMyTreeHoles(uid);
    return res.map((item: any) => ({
        ...item,
        created_at: timeFormat(item.created_at)
    }))
}

export const addMyTreeHole  = async (item) => {
    return await createTreeHole(item);
}

export const getTreeHoleComments = async (treeHoleId) => {
    const comments = await findTreeHoleComments(treeHoleId);
    return comments.map((item: any) => ({
        ...item,
        created_at: timeFormat(item.created_at)
    }))
}

export const addTreeHoleComment  = async (item) => {
    return await insertTreeHoleComment(item);
}
