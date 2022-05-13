import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';

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

  @Column(DataType.TEXT)
  public type: string;
}