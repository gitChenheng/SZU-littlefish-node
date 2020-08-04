import Scientific from "@/models/entity/Scientific";
import Competition from "@/models/entity/Competition";
import RecruitAnnounce from "@/models/entity/RecruitAnnounce";
import Together from "@/models/entity/Together";
import {dbCtx} from "@/server/db/db_context";

export const getAllScientific = async () => {
    return await Scientific.findAll({
        raw: true,
    });
}

export const getAllCompetitions = async (type) => {
    const db = dbCtx();
    return await db.query(
        "SELECT `title`,`introduce`,`condition`,`schedule`,`way` FROM competition where type=:type",
        {
            type: db.QueryTypes.SELECT,
            plain: false,
            raw: true,
            replacements: {
                type,
            }
        }
    )
}

export const getAllRecruits = async () => {
    return await RecruitAnnounce.findAll({
        raw: true,
    });
}

export const createScientific = async (item) => {
    return await Scientific.create(item);
}

export const createCompetition = async (item) => {
    return await Competition.create(item);
}

export const createRecruit = async (item) => {
    return await RecruitAnnounce.create(item);
}

export const createTogether = async (item) => {
    return await Together.create(item);
}

export const updateTogether = async (obj, id) => {
    return await Together.update(
        obj,
        {where: id}
    );
}

export const findAllTogether = async () => {
    return await Together.findAll({raw: true});
}
