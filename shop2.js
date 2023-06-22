const prompt = require('prompt-sync')();
const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: String,
  rent: Number,
});

const Shop = mongoose.model('Shop', shopSchema);

async function main() {
  const uri = "mongodb+srv://diamond_2004k:rvupassword@cluster0.bgjdxtf.mongodb.net/shops2"; // Replace with your MongoDB URL and database name

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

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
          await createShop();
          break;
        case 2:
          await readShops();
          break;
        case 3:
          await updateShopRent();
          break;
        case 4:
          await deleteShop();
          break;
        case 5:
          await calculateTotalRent();
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
    mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  }
}

async function createShop() {
  const name = prompt('Enter the name of the shop: ');
  const rent = parseFloat(prompt('Enter the rent for the shop: '));

  const shop = new Shop({ name, rent });
  await shop.save();
  console.log(`Shop "${name}" created successfully.`);
}

async function readShops() {
  const shops = await Shop.find();

  console.log('Shops:');
  shops.forEach((shop) => {
    console.log(`Name: ${shop.name}, Rent: ${shop.rent}`);
  });
}

async function updateShopRent() {
  const name = prompt('Enter the name of the shop: ');

  const shop = await Shop.findOne({ name });
  if (!shop) {
    console.log('Shop not found.');
    return;
  }

  const newRent = parseFloat(prompt('Enter the new rent for the shop: '));
  shop.rent = newRent;
  await shop.save();
  console.log(`Rent updated successfully for shop "${name}".`);
}

async function deleteShop() {
  const name = prompt('Enter the name of the shop: ');

  const result = await Shop.deleteOne({ name });
  if (result.deletedCount === 1) {
    console.log(`Shop "${name}" deleted successfully.`);
  } else {
    console.log('Shop not found.');
  }
}

async function calculateTotalRent() {
  const shops = await Shop.find();

  let totalRent = 0;
  shops.forEach((shop) => {
    totalRent += shop.rent;
  });

  console.log('Total rent of all shops:', totalRent);
}

main();
