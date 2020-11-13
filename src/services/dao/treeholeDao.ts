import TreeHole from "@/models/entity/TreeHole";
import TreeHoleComment from "@/models/entity/TreeHoleComment";
import {CommonExcludeAttributes} from "@/constans/global";
import {dbCtx} from "@/server/db/db_context";
import {timeFormat} from "@/utils/util";

export const findTreeHoles = async (pageIndex: number, pageSize: number): Promise<any> => {
    const db = dbCtx();
    const data = await db.query(
        `SELECT * FROM tree_hole WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT :pageIndex,:pageSize;`,
        {
            type: db.QueryTypes.SELECT,
            plain: false,
            raw: true,
            replacements: {
                pageIndex: (Number(pageIndex) - 1) * pageSize,
                pageSize
            }
        }
    )
    const count = await TreeHole.count({
        where: {},
    });
    return {
        data: data.map((item: any) => ({
            ...item,
            created_at: timeFormat(item.created_at)
        })),
        total: count
    }
}

export const findMyTreeHoles = async (uid: string): Promise<TreeHole[]> => {
    return await TreeHole.findAll({
        // attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: {uid},
        order: [["created_at", "DESC"]],
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
        AND t.uid=u.id WHERE t.deleted_at IS NULL
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

export const deleteTreeHoleComment = async (id) => {
    return await TreeHoleComment.destroy({
        where: {id}
    });
}
