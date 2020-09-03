import {Model, Table, Column, PrimaryKey, AllowNull, ForeignKey} from "sequelize-typescript";
import { STRING, DATE, INTEGER, TINYINT, BIGINT, TEXT, BOOLEAN, DECIMAL } from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "together"})
export default class Together extends BaseEntity{

    @AllowNull(false)
    @Column(STRING)
    public uid: string;

    @Column(STRING)
    public subject: string;

    @Column({type: TEXT, field: "knowledge_point"})
    public knowledgePoint: string;

    @AllowNull
    @Column(BIGINT)
    public time: number;

    @AllowNull
    @Column(TEXT)
    public address: string;

}
