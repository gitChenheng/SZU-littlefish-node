import {Model, Table, Column, PrimaryKey, AllowNull, ForeignKey} from "sequelize-typescript";
import { STRING, DATE, INTEGER, TINYINT, BIGINT, TEXT, BOOLEAN, DECIMAL } from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "transcript"})
export default class Transcript extends BaseEntity{

    // @ForeignKey(() => User)
    @Column({type: STRING})
    public uid: string;

    @Column(STRING)//学期
    public term: string;

    @Column(DECIMAL(10, 4))//GPA
    public gpa: number;

    @Column({type: DECIMAL(5, 1), field: "obtain_credit"})//获得学分
    public obtainCredit: number;

    @Column({type: DECIMAL(5, 1), field: "elective_credit"})//选课学分
    public electiveCredit: number;

    @Column({type: DECIMAL(8, 2), field: "relate_rank"})//相对排名
    public relateRank: number;

    @Column({type: STRING(30), field: "pro_rank"})//专业排名
    public proRank: string;

    @Column({type: STRING(30), field: "grade_rank"})//年级排名
    public gradeRank: string;

    // @AllowNull
    // @Column({type: DECIMAL(2, 1), field: "minimum_course_credits"})//最少选课学分
    // public minimumCourseCredits: number;

    // @AllowNull
    // @Column({type: BOOLEAN, field: "participate_in_rank"})//是否参与排名计算
    // public participateInRank: boolean;

}
