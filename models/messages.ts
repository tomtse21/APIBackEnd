import * as db from '../helpers/database';

export const getAll = async() => {
  let query = 'SELECT * FROM messages where deleted = false order by id ';
  let data = await db.run_query(query, null);
  return data;
}

export const add = async(message: any) => {
  let keys = Object.keys(message);
  let values = Object.values(message);
  let key = keys.join(',');
  let param = '';
  for(let i: number = 0; i<values.length; i++) {
    console.log(keys[i])
      param += '? ,';
  }

  param=param.slice(0, -1);
  let query = `INSERT INTO messages (${key}) VALUES (${param})`;
    console.log(query)
  try {
    await db.run_insert(query, values);
    return {status: 201};
  } catch(err: any) {
    return err;
  }
}

export const deleteMessage = async(id: any) => {
//   let query = 'Update messages set deleted = true where id = ?';
  let query = 'Update messages set deleted = true where id = ?';
  let values = [id];
  console.log(query)
  try {
    await db.run_query(query, values);
    return {status: 201};
  } catch(err: any) {
    return err;
  }
}



