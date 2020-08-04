import {Table, Column, AllowNull} from "sequelize-typescript";
import {STRING, TEXT, TINYINT} from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "competition"})
export default class Competition extends BaseEntity{

    @AllowNull(false)
    @Column(TINYINT)//1.学术科研竞赛 2.各类技能考试
    public type: number;

    @AllowNull(false)
    @Column(STRING)
    public title: string;

    @Column(TEXT)
    public introduce: string;

    @Column(TEXT)
    public condition: string;

    @Column(TEXT)
    public schedule: string;

    @Column(TEXT)
    public way: string;

}
