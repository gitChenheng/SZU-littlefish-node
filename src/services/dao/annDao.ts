import Scientific from "@/models/entity/Scientific";
import Competition from "@/models/entity/Competition";
import RecruitAnnounce from "@/models/entity/RecruitAnnounce";
import Together from "@/models/entity/Together";
import {dbCtx} from "@/server/db/db_context";
import {CommonExcludeAttributes} from "@/constans/global";
import BaseUser from "@/models/entity/BaseUser";

export const getAllScientific = async () => {
    return await Scientific.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
    });
}
export const getScientificById = async (id) => {
    return await Scientific.findOne({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
        where: {id}
    });
}
export const updateScientific = async (item, id) => {
    return await Scientific.update(
        item,
        {where: {id}}
    )
}
export const deleteScientific = async (id) => {
    return await Scientific.destroy({
        where: {id}
    });
}

export const getAllCompetitions = async (type) => {
    const db = dbCtx();
    return await db.query(
        "SELECT `id`,`title`,`introduce`,`condition`,`schedule`,`way` FROM competition where type=:type AND deleted_at IS NULL",
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
export const updateCompetition = async (item, id) => {
    return await Competition.update(
        item,
        {where: {id}}
    )
}
export const deleteCompetition = async (id) => {
    return await Competition.destroy({
        where: {id}
    });
}

export const getAllRecruits = async () => {
    return await RecruitAnnounce.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true,
    });
}
export const updateRecruit = async (item, id) => {
    return await RecruitAnnounce.update(
        item,
        {where: {id}}
    )
}
export const deleteRecruit = async (id) => {
    return await RecruitAnnounce.destroy({
        where: {id}
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
        {where: {id}}
    );
}

export const findAllTogether = async () => {
    return await Together.findAll({
        attributes: {exclude: [...CommonExcludeAttributes]},
        raw: true
    });
}
