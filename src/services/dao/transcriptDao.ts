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
        t.id,t.term,t.gpa,
        t.obtain_credit AS obtainCredit,
        t.elective_credit AS electiveCredit,
        t.rank,t.relate_rank AS relateRank,
        t.pro_rank AS proRank,
        t.grade_rank AS gradeRank,
        t.grade_student AS gradeStudent,
        u.name,u.phone,u.gender,
        u.study_num AS studyNum,u.grade,u.faculty,u.major,u.clbum
        FROM
        transcript t
        INNER JOIN
        user u
        WHERE
        t.uid=u.id`,
        {
            type: db.QueryTypes.SELECT,
            plain: false,
            raw: true,
            replacements: {}
        }
    )
}

export const getAllById = async (uid) => {
    return await Transcript.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: {uid}
    });
}
