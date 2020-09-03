import {Table, Column, AllowNull, PrimaryKey, Unique} from "sequelize-typescript";
import { STRING, TINYINT, BOOLEAN } from "sequelize";
import BaseEntity from "../common/BaseEntity";

@Table({tableName: "base_user"})
export default class BaseUser extends BaseEntity{

    @Column(TINYINT)//1学生 2教师 3家长 10管理员
    public role: number;

    @Column(STRING)
    public name: string;

    @Unique
    @AllowNull
    @Column(STRING(20))
    public phone: string;

    @AllowNull
    @Column(BOOLEAN)
    public gender: boolean;

    @AllowNull
    @Column({type: STRING, field: "study_num"})
    public studyNum: string;

    @AllowNull
    @Column({type: STRING, field: "teach_card_num"})
    public teachCardNum: string;

    @AllowNull
    @Column(STRING(30))//年级
    public grade: string;

    @AllowNull
    @Column(STRING(40))//院系
    public faculty: string;

    @AllowNull
    @Column(STRING)//专业
    public major: string;

    @AllowNull
    @Column(STRING)//班级
    public clbum: string;

}
