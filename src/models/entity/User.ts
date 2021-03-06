import {Model, Table, Column, PrimaryKey, AllowNull, Unique} from "sequelize-typescript";
import { STRING, TINYINT, TEXT, BOOLEAN } from "sequelize";

@Table({tableName: "user"})
export default class User extends Model<User>{

    @PrimaryKey
    @Column(STRING)
    public id: string;

    @Unique
    @Column(STRING)
    public openid: string;

  	@AllowNull
    @Column({type: STRING, field: "nick_name"})
    public nickName: string;

    @AllowNull
    @Column(STRING)
    public pwd: string;

  	@AllowNull
    @Column(TINYINT)//1学生 2教师 3家长 10管理员
    public role: number;

  	@AllowNull
    @Column(STRING)
    public name: string;

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

    @AllowNull
    @Column({type: TEXT, field: "avatar_url"})
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
