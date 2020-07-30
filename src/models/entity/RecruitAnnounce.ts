import {Table, Column} from "sequelize-typescript";
import {STRING, TEXT, INTEGER} from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "recruit_announce"})
export default class RecruitAnnounce extends BaseEntity{

    @Column({type: STRING, field: "team_name"})
    public teamName: string;

    @Column({type: STRING, field: "issue_name"})
    public issueName: string;

    @Column(TEXT)
    public direction: string;

    @Column({type: INTEGER, field: "need_student"})
    public needStudent: number;

    @Column(STRING)
    public contact: string;

    @Column(STRING)
    public contactInfo: string;

}
