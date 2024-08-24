const pgp = require('pg-promise')();
const client = pgp(process.env.PG_CONNECTION_STRING);
const {
  items
} = require('../app/lib/placeholder-data.js');

async function seedItems(client) {
  try {
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    // Create the "users" table if it doesn't exist
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price INT NOT NULL
      );
    `);

    console.log(`Created "items" table`);

    // Insert data into the "users" table
    const insertedItems = await Promise.all(
      items.map(async (item) => {
        return client.query(`
          INSERT INTO items (name, description, price)
          VALUES ($<itemname>, $<itemdescription>, $<itemprice>);
        `, {itemname: item.name, itemdescription: item.description, itemprice: item.price});
      }),
    );

    console.log(`Seeded ${insertedItems.length} items`);

    return {
      createTable,
      items: insertedItems,
    };
  } catch (error) {
    console.error('Error seeding items:', error);
    throw error;
  }
}

async function main() {
  
  await seedItems(client);
  pgp.end();
  console.log("Seeded the database");
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
