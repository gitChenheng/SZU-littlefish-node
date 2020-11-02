import {Table, Column, AllowNull} from "sequelize-typescript";
import {INTEGER, STRING, TEXT, BOOLEAN, TINYINT} from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "tree_hole"})
export default class TreeHole extends BaseEntity{

    @Column(STRING)
    public uid: string;

    @AllowNull(false)
    @Column(TINYINT)//1.学习树洞 2.心灵树洞 3.家长意见
    public type: number;

    @AllowNull(false)
    @Column(BOOLEAN)//1匿名 0实名
    public anonymous: number;

    @AllowNull(false)
    @Column(TEXT)
    public issue: string;

}
