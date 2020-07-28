import {Model, Table, Column, PrimaryKey, AllowNull} from "sequelize-typescript";
import { STRING, DATE, INTEGER, TINYINT, BIGINT, TEXT, BOOLEAN, DECIMAL } from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "transcript"})
export default class Transcript extends BaseEntity{

    @Column(STRING)
    public uid: string;

    @Column(DECIMAL(10, 4))//GPA
    public gpa: number;

    @Column(DECIMAL(5, 1))//获得学分
    public obtainCredit: number;

    @Column(DECIMAL(5, 1))//选课学分
    public electiveCredit: number;

    @Column(DECIMAL(8, 2))//相对排名
    public relateRank: number;

    // @AllowNull
    // @Column(DECIMAL(2, 1))//最少选课学分
    // public minimumCourseCredits: number;

    // @AllowNull
    // @Column(BOOLEAN)//是否参与排名计算
    // public participateInRank: boolean;

}
