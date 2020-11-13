import {
    createTreeHole, deleteTreeHoleComment,
    findMyTreeHoles,
    findTreeHoleComments, findTreeHoles,
    insertTreeHoleComment
} from "@/services/dao/treeholeDao";
import {timeFormat} from "@/utils/util";

export const getAllTreeHoles = async (pageIndex = 1, pageSize = 10) => {
    const res = await findTreeHoles(pageIndex, pageSize);
    res.data.map((item: any) => ({
        ...item,
        created_at: timeFormat(item.created_at)
    }))
    return res;
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

export const removeTreeHoleComment  = async (id) => {
    return await deleteTreeHoleComment(id);
}
