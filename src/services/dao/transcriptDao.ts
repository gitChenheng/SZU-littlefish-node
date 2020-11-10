import Transcript from "@/models/entity/Transcript";
import {CommonExcludeAttributes} from "@/constans/global";
import {dbCtx} from "@/server/db/db_context";

export const bulkCreateBaseTranscript = async (records: any[]) => {
    const res = await Transcript.bulkCreate(records);
    return res.length === records.length;
}

export const findAllTranscripts = async () => {
    const db = dbCtx();
    return await db.query(
        `SELECT
        t.id,t.study_num AS studyNum,t.term,t.gpa,
        t.obtain_credit AS obtainCredit,
        t.pro_rank AS proRank,
        t.grade_rank AS gradeRank,
        u.name,u.phone,u.gender,
        u.study_num AS studyNum,u.grade,u.faculty,u.major,u.clbum
        FROM
        transcript t
        INNER JOIN
        base_user u
        WHERE
        t.study_num=u.study_num AND t.deleted_at IS NULL`,
        {
            type: db.QueryTypes.SELECT,
            plain: false,
            raw: true,
            replacements: {}
        }
    )
}
export const deleteTranscript = async (id) => {
    return await Transcript.destroy({
        where: {id}
    });
}

export const updateTranscript = async (item, id) => {
    return await Transcript.update(
        item,
        {where: {id}}
    )
}

export const getAllById = async (uid) => {
    return await Transcript.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: {uid}
    });
}

export const getAllInCondition = async (condition) => {
    return await Transcript.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: condition
    });
}
