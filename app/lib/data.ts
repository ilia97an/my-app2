import { unstable_noStore as noStore } from 'next/cache';

import {getDB} from './db';

const {db, pgp} = getDB();

//import { Item } from './types';

export async function fetchItems() {
  noStore();
  try {
    console.log('Fetching items data...');
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await db.any('SELECT id, name, price FROM items');
    console.log(data);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch items data.');
  }
}

export async function fetchItemDescription(slug: string) {
  noStore();
  try {
    console.log('Fetching items data...');
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await db.one('SELECT description FROM items WHERE (id = $(slug))', {slug:slug});
    console.log(data);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch items data.');
  }
}

export async function fetchItem(slug: string) {
  noStore();
  try {
    console.log('Fetching items data...');
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await db.one('SELECT name, price, description FROM items WHERE (id = $(slug))', {slug:slug});
    console.log(data);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch items data.');
  }
}
