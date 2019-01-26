import Sequelize from 'sequelize';
import { sequelize } from '../';

export interface UserAddModel {
  email: string;
  username: string;
  password: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserViewModel {
  id: number;
  email: string;
  username: string;
}

export const User = sequelize.define<UserModel, UserAddModel>('user', {
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});
