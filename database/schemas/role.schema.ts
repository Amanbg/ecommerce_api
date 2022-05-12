import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType} from 'sequelize-typescript';

@Table ({tableName :'role'})
export class Role extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public type!: string; // (PK)

    @Column (DataType.TEXT)
    public description : string;
}
