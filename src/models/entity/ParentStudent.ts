import {Table, Column, Unique} from "sequelize-typescript";
import {STRING} from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "parent_student"})
export default class ParentStudent extends BaseEntity{

    @Column({type: STRING, field: "parent_id"})
    public parentId: string;

    @Unique("parent_student_phone")
    @Column({type: STRING})//家长手机
    public phone: string;

    @Column({type: STRING, field: "student_id"})
    public studentId: string;

    @Unique("parent_student_phone")
    @Column({type: STRING, field: "student_phone"})
    public studentPhone: string;

}
