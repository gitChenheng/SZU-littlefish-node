import {Table, Column, AllowNull} from "sequelize-typescript";
import {STRING, TEXT, TINYINT, INTEGER} from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "tree_hole_comment"})
export default class TreeHoleComment extends BaseEntity{

    @AllowNull(false)
    @Column({type: INTEGER, field: "tree_hole_id"})
    public treeHoleId: number;

    @AllowNull
    @Column(INTEGER)
    public pid: number;

    @Column(TEXT)
    public content: string;

}
