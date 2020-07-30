import {Table, Column, AllowNull} from "sequelize-typescript";
import {STRING, TEXT} from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "tree_hole"})
export default class TreeHole extends BaseEntity{

    @Column(STRING)
    public uid: string;

    @AllowNull(false)
    @Column(TEXT)
    public issue: string;

}
