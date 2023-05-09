import debug from 'debug';
import * as db from '../helpers/database';

export const findByUsername = async (username: string) => {
  const query = 'SELECT * from users where username = ?';
  const user = await db.run_query(query, [username]);
  return user;
}

export const regUser = async(user: any) => {
  let keys = Object.keys(user);
  let values = Object.values(user);
  let key = keys.join(',');
  let param = '';
  for(let i: number = 0; i<values.length; i++) {
    param += '? ,';
  }
  param=param.slice(0, -1);
  let query = `INSERT INTO users (${key}) VALUES (${param})`;
  console.log(query)
  try {
    await db.run_insert(query, values);
    return {status: 201};
  } catch(err: any) {
    return err;
  }
}

export const login = async (username: string, password: string) => {
  const query = 'SELECT * from users where username = ? and password = ?';
  const user = await db.run_query(query, [username,password]);
  return user;
}
