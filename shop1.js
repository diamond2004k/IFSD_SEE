//"mongodb+srv://diamond_2004k:rvupassword@cluster0.bgjdxtf.mongodb.net/see"
const prompt = require('prompt-sync')();
const { MongoClient } = require('mongodb');

class Shop {
  constructor(name, rent) {
    this.name = name;
    this.rent = rent;
  }
}

async function main() {
  const uri = "mongodb+srv://diamond_2004k:rvupassword@cluster0.bgjdxtf.mongodb.net/shops1"; // Replace with your MongoDB URL
  const dbName = 'shoppingComplexDB'; // Replace with your database name
  const collectionName = 'shops'; // Replace with your collection name

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    while (true) {
      console.log('------ CRUD Operations Menu ------');
      console.log('1. Create Shop');
      console.log('2. Read Shops');
      console.log('3. Update Shop Rent');
      console.log('4. Delete Shop');
      console.log('5. Calculate Total Rent');
      console.log('6. Exit');

      const choice = parseInt(prompt('Enter your choice: '));

      switch (choice) {
        case 1:
          await createShop(collection);
          break;
        case 2:
          await readShops(collection);
          break;
        case 3:
          await updateShopRent(collection);
          break;
        case 4:
          await deleteShop(collection);
          break;
        case 5:
          await calculateTotalRent(collection);
          break;
        case 6:
          console.log('Exiting...');
          return;
        default:
          console.log('Invalid choice. Please try again.');
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.close();
    console.log('Disconnected from MongoDB');
  }
}

async function createShop(collection) {
  const name = prompt('Enter the name of the shop: ');
  const rent = parseFloat(prompt('Enter the rent for the shop: '));

  const shop = new Shop(name, rent);
  await collection.insertOne(shop);
  console.log(`Shop "${name}" created successfully.`);
}

async function readShops(collection) {
  const shops = await collection.find().toArray();

  console.log('Shops:');
  shops.forEach((shop) => {
    console.log(`Name: ${shop.name}, Rent: ${shop.rent}`);
  });
}

async function updateShopRent(collection) {
  const name = prompt('Enter the name of the shop: ');

  const shop = await collection.findOne({ name });
  if (!shop) {
    console.log('Shop not found.');
    return;
  }

  const newRent = parseFloat(prompt('Enter the new rent for the shop: '));
  await collection.updateOne({ name }, { $set: { rent: newRent } });
  console.log(`Rent updated successfully for shop "${name}".`);
}

async function deleteShop(collection) {
  const name = prompt('Enter the name of the shop: ');

  const result = await collection.deleteOne({ name });
  if (result.deletedCount === 1) {
    console.log(`Shop "${name}" deleted successfully.`);
  } else {
    console.log('Shop not found.');
  }
}

async function calculateTotalRent(collection) {
  const shops = await collection.find().toArray();

  let totalRent = 0;
  shops.forEach((shop) => {
    totalRent += shop.rent;
  });

  console.log('Total rent of all shops:', totalRent);
}

main();
