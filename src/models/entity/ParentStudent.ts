import {Table, Column, Unique} from "sequelize-typescript";
import {STRING} from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "parent_student"})
export default class ParentStudent extends BaseEntity{

    @Unique("parent_student_phone")
    @Column({type: STRING})//家长手机
    public phone: string;

    @Unique("parent_student_phone")
    @Column({type: STRING, field: "student_phone"})
    public studentPhone: string;

}
