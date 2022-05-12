import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Role } from "./role.schema";
@Table({ tableName: 'user' })
export class User extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id!: number; // (PK)

    @Column(DataType.TEXT)
    public status: string; //FK

    @Column(DataType.TEXT)
    public username: string; //FK

    @Column(DataType.TEXT)
    public password: string;

    @ForeignKey(() => Role)
    @Column(DataType.NUMBER)
    public type: string;
    @BelongsTo(() => Role, 'type')
    role: Role;
}