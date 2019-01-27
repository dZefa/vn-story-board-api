import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Bluebird from 'bluebird';

import { User, UserModel, UserAddModel, UserViewModel, UserLoginModel } from '../database/models/user';

interface JWTSignedToken {
  token: string;
}

interface JWTpayload {
  id: number;
  email: string;
}

class UserService {
  private readonly _saltRounds = Number(process.env.SALT);
  private readonly _jwtSecret = process.env.JWT_SECRET;
  private static _user: Bluebird<UserModel | null>;

  public static get userAttributes(): string[] {
    return ['id', 'email', 'username'];
  }

  public static get user(): Bluebird<UserModel | null> {
    return this._user;
  }

  public getUserById(id: number): Bluebird<UserViewModel> {
    const attributes = UserService.userAttributes;

    return User.findById(id, { attributes }) as Bluebird<UserViewModel>;
  }

  public register({ email, username, password } : UserAddModel): Promise<UserViewModel | string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, this._saltRounds)
        .then((hash: string) => {
          User.create({ email, username, password: hash })
            .then((user: UserModel) => {
              const userInfo = this.getUserById(user.id);

              resolve(userInfo);
            })
            .catch((err) => {
              return reject(`${err}`);
            });
        })
        .catch((err) => {
          reject(`${err}`);
        });
    });
  }

  public login({ username }: UserLoginModel): Promise<JWTSignedToken | string> {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: { username }
      })
        .then((user: UserModel) => {
          const { id, username } = user;
          const token = jwt.sign({ id, username }, this._jwtSecret, { expiresIn: '30 days' });

          resolve({ token });
        })
        .catch((err) => {
          reject(`${err}`);
        });
    });
  }

  public verifyToken(token: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this._jwtSecret, (err, decoded: JWTpayload) => {
        if (err) {
          return reject(false);
        }

        UserService._user = User.findById(decoded.id);
        resolve(true);
      });
    });
  }
}

export { UserService };
