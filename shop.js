const prompt = require('prompt-sync')();
class Shop {
    constructor(name, rent) {
      this.name = name;
      this.rent = rent;
    }
  }
  
  class ShoppingComplex {
    constructor() {
      this.shops = [];
    }
  
    addShop(shop) {
      this.shops.push(shop);
    }
  
    calculateTotalRent() {
      let totalRent = 0;
      for (let shop of this.shops) {
        totalRent += shop.rent;
      }
      return totalRent;
    }
  }
  
  function main() {
    const shoppingComplex = new ShoppingComplex();
  
    const numShops = parseInt(prompt("Enter the number of shops:"));
  
    for (let i = 0; i < numShops; i++) {
      const shopName = prompt(`Enter the name of shop ${i + 1}:`);
      const shopRent = parseInt(prompt(`Enter the rent for shop ${i + 1}:`));
      const shop = new Shop(shopName, shopRent);
      shoppingComplex.addShop(shop);
    }
  
    const totalRent = shoppingComplex.calculateTotalRent();
    console.log("Total rent of all shops:", totalRent);
  }
  
  main();
  