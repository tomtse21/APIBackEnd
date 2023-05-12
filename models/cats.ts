import * as db from '../helpers/database';

export const getById = async (id: any) => {
  let query = 'SELECT * FROM cats WHERE ID = ? and adopted = false';
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}

export const getAll = async() => {
  let query = 'SELECT * FROM cats where adopted = false order by id ';
  let data = await db.run_query(query, null);
  return data;
}

export const add = async(cat: any) => {
  let keys = Object.keys(cat);
  let values = Object.values(cat);
  let key = keys.join(',');
  let param = '';
  for(let i: number = 0; i<values.length; i++) {
    console.log(keys[i])
    // if(keys[i]=='imageuri'){
    //   param += 'decode(? ,"base64"),';
    // }else{
      param += '? ,';
    //}
    
  }
  param=param.slice(0, -1);
  let query = `INSERT INTO cats (${key}) VALUES (${param})`;
console.log(query)
  try {
    await db.run_insert(query, values);
    return {status: 201};
  } catch(err: any) {
    return err;
  }
}

export const deleteCat = async(id: any) => {
  let query = 'Update cats set adopted = true where id = ?';
  let values = [id];
  console.log(query)
  try {
    await db.run_query(query, values);
    return {status: 201};
  } catch(err: any) {
    return err;
  }
}

  export const updateCat = async(id: any,obj: any) => {
    
    var str = `name = '${obj.name}', age = ${obj.age} , color = '${obj.color}' , foundlocation = '${obj.foundlocation}', description  = '${obj.description}' `;

    let query = `Update cats set ${str}  where id = ?`;
    let idValues = [id];
    console.log(query)
    try {
      await db.run_query(query, idValues);
      return {status: 201};
    } catch(err: any) {
      return err;
    }
}
