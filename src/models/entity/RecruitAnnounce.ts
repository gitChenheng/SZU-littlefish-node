import {Table, Column} from "sequelize-typescript";
import {STRING, TEXT, INTEGER, TINYINT} from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "recruit_announce"})
export default class RecruitAnnounce extends BaseEntity{

    @Column({type: STRING, field: "team_name"})
    public teamName: string;

    @Column(TEXT)
    public direction: string;

    @Column(STRING)
    public requirements: string;

    @Column({type: INTEGER, field: "need_student"})
    public needStudent: number;

    @Column(STRING)
    public contact: string;

    @Column(STRING)
    public contactInfo: string;

    @Column(TINYINT) //1.招募中 2结束招募
    public status: number

}
