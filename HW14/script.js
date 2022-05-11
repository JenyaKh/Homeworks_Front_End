const SIZE_SMALL = {
   price: 50,
   callories: 20,
}

const SIZE_MEDIUM = {
   price: 75,
   callories: 30,
}

const SIZE_BIG = {
   price: 100,
   callories: 40,
}

const TOPPING_CHEESE = {
   name: "cheese",
   price: 10,
   callories: 20,
}

const TOPPING_SALAD = {
   name: "salad",
   price: 20,
   callories: 5,
}

const TOPPING_POTATO = {
   name: "potato",
   price: 15,
   callories: 10,
}

const TOPPING_SEAS = {
   name: "seas",
   price: 15,
   callories: 0,
}

const TOPPING_MAYO = {
   name: "mayo",
   price: 20,
   callories: 5,
}

class Hamburger {
   constructor(size) {
      this._price = size.price;
      this._callories = size.callories;
      this._toppings = [];
   }

   addTopping(topping) {
      this._price += topping.price;
      this._callories += topping.callories;
      this._toppings.push(topping.name);
   }
   
   removeTopping(topping) {
      const index = this._toppings.indexOf(topping.name);
      if (index !== -1) {
         this._toppings.splice(index, 1);
         this._price -= topping.price;
         this._callories -= topping.callories;
      }
   }

   getPrice() {
      return this._price;
   }

   getCallories() {
      return this._callories;
   }

   getToppings() {
      return this._toppings;
   }
}
   

const hamburger = new Hamburger(SIZE_BIG);

hamburger.addTopping(TOPPING_MAYO);
hamburger.addTopping(TOPPING_POTATO);
hamburger.addTopping(TOPPING_CHEESE);
hamburger.addTopping(TOPPING_MAYO);

console.log(`Price with toppings ${hamburger.getToppings()}: ${hamburger.getPrice()}`);
console.log(`Callories with toppings: ${hamburger.getCallories()}`);

hamburger.removeTopping(TOPPING_MAYO);
console.log(`Price with toppings ${hamburger.getToppings()}: ${hamburger.getPrice()}`);
console.log(`Callories with toppings: ${hamburger.getCallories()}`);
