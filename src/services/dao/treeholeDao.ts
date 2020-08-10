import TreeHole from "@/models/entity/TreeHole";
import TreeHoleComment from "@/models/entity/TreeHoleComment";
import {CommonExcludeAttributes} from "@/constans/global";

export const findMyTreeHoles = async (uid: string): Promise<TreeHole[]> => {
    return await TreeHole.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: {uid}
    })
}

export const createTreeHole = async (item) => {
    return await TreeHole.create(item);
}

export const findTreeHoleComments = async (treeHoleId: number): Promise<TreeHoleComment[]> => {
    return await TreeHoleComment.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: {treeHoleId}
    })
}

export const insertTreeHoleComment = async (item) => {
    return await TreeHoleComment.create(item);
}
