import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Shift } from '../shifts/shift.model';
import { Assignment } from '../assignments/assignment.model';

@Table
export class User extends Model<User> {

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare role: string;


  @HasMany(() => Assignment)
  declare assignments: Assignment[];
}
