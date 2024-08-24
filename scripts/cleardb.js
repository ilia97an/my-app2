const pgp = require('pg-promise')();
const client = pgp(process.env.PG_CONNECTION_STRING);

async function dropItems(client) {
  try {
    // Create the "users" table if it doesn't exist
    const dropTable = await client.query(`DROP TABLE IF EXISTS items;`);

    console.log(`Dropped "items" table`);

    return {
      dropTable,
    };
  } catch (error) {
    console.error('Error dropping items:', error);
    throw error;
  }
}

async function main() {
  
  await dropItems(client);
  pgp.end();
  console.log("Cleared the database");
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to clear the database:',
    err,
  );
});
