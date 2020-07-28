import {Table, Column, PrimaryKey, AllowNull} from "sequelize-typescript";
import {STRING} from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "parent_student"})
export default class ParentStudent extends BaseEntity{

    @Column(STRING)
    public parentId: string;

    @Column(STRING)
    public studentId: string;

}
