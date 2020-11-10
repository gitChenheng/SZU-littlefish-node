import {Table, Column, AllowNull} from "sequelize-typescript";
import {STRING, TEXT} from "sequelize";
import BaseEntity from "@/models/common/BaseEntity";

@Table({tableName: "scientific"})
export default class Scientific extends BaseEntity{

    @AllowNull(false)
    @Column({type: STRING, field: "scientific_name"})
    public scientificName: string;

    @Column(TEXT)
    public intro: string; //简介

    @Column(TEXT)
    public results: string; //核心成果

    @Column(TEXT)
    public direction: string;

    @Column({type: TEXT, field: "nucleus_stuff"})
    public nucleusStuff: string;

    @Column(TEXT)
    public pic: string;

    @Column({type: TEXT, field: "pdf_url"})
    public pdfUrl: string;

}
