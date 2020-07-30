import {Table, Column} from "sequelize-typescript";
import {STRING} from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "parent_student"})
export default class ParentStudent extends BaseEntity{

    @Column({type: STRING, field: "parent_id"})
    public parentId: string;

    @Column({type: STRING, field: "student_id"})
    public studentId: string;

}
