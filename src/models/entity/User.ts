import {Model, Table, Column, PrimaryKey, AllowNull} from "sequelize-typescript";
import { STRING, DATE, INTEGER, TINYINT, BIGINT, TEXT, BOOLEAN, DECIMAL } from "sequelize";

@Table({tableName: "user"})
export default class User extends Model<User>{

    @PrimaryKey
    @Column(STRING)
    public id: string;

    @Column(TINYINT)//1学生 2教师 3家长 10管理员
    public role: number;

    @AllowNull
    @Column(STRING)
    public openid: string;

    @AllowNull
    @Column(STRING)
    public name: string;

    @AllowNull
    @Column(STRING)
    public pwd: string;

    @AllowNull
    @Column(STRING(20))
    public phone: string;

    @AllowNull
    @Column(BOOLEAN)
    public gender: boolean;

    @AllowNull
    @Column(STRING)
    public studyNum: string;

    @AllowNull
    @Column(STRING)
    public teachCardNum: string;

    @AllowNull
    @Column(STRING(30))
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

    @AllowNull
    @Column(TEXT)
    public avatarUrl: string;

    @AllowNull
    @Column(STRING(50))
    public city: string;

    @AllowNull
    @Column(STRING(50))
    public province: string;

    @AllowNull
    @Column(STRING(50))
    public country: string;

    @AllowNull
    @Column(STRING(20))
    public language: string;

    @AllowNull
    @Column(TEXT)
    public address: string;

}
