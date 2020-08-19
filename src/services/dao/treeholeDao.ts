import TreeHole from "@/models/entity/TreeHole";
import TreeHoleComment from "@/models/entity/TreeHoleComment";
import {CommonExcludeAttributes} from "@/constans/global";
import {dbCtx} from "@/server/db/db_context";

export const findTreeHoles = async (): Promise<TreeHole[]> => {
    return await TreeHole.findAll({
        attributes: {exclude: [...CommonExcludeAttributes, "uid"]},
        raw: true,
    })
}

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
    const db = dbCtx();
    return await db.query(
        `
        SELECT
        t.id,t.tree_hole_id AS treeHoleId,t.uid,t.pid,t.content,t.created_at,
        u.name
        FROM
        tree_hole_comment t
        INNER JOIN
        user u
        on t.tree_hole_id=:treeHoleId
        AND t.uid=u.id
        `,
        {
            type: db.QueryTypes.SELECT,
            plain: false,
            raw: true,
            replacements: {
                treeHoleId,
            }
        }
    )
}

export const insertTreeHoleComment = async (item) => {
    return await TreeHoleComment.create(item);
}
