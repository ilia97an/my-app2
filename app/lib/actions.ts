import {getDB} from './db';

import Item from '@/app/lib/types';

const {db, pgp} = getDB();

export async function updateItem(slug: string, item: Item) {
  const {id, ...fields} = item;

  const setClause = Object.entries(fields)
    .map(([key, value]) => `${key} = $/fields.${key}/`)
    .join(', ');

  // const values = Object.values(fields);

  const queryStr = `UPDATE items SET ${setClause} WHERE id = $(id)`;

  try {
    //queryStr = pgp.as.format(queryStr, {fields: fields, id: id});
    //queryStr = pgp.as.format(queryStr, {fields: fields});
    console.log(`debug actions.ts debug query string`);
    //console.log(queryStr);
    await db.none(queryStr, {fields: fields, id: id});
  } catch (error) {
    console.error('Error updating item:', error);
    throw error; // Or handle the error appropriately
  }
  console.log("post update debug");
}
