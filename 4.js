const energyCost = 50 // 50zł/1kWh

class Product {
    //id, nazwa, model, rok produkcji, cena, zużycieEnergii (kWh)
    constructor(id, name, model, productionYear, price, energyConsumption) {
        this.id = id
        this.name = name
        this.model = model
        this.productionYear = productionYear
        this.price = price
        this.energyConsumption = energyConsumption //x kWh
    }
    cost() { return this.price }
    energyCost() { return energyCost * this.energyConsumption }
    productAgeFunc() {
        const today = new Date();
        const year = today.getFullYear();
        return year - this.productionYear
    }
    productAgeYears() {
        let productAge2 = this.productAgeFunc()
        if (productAge2 == 1) return productAge2.toString() + " rok"
        else if (productAge2 > 1 && productAge2 < 4) return productAge2.toString() + " lata"
        else if (productAge2 > 4) return productAge2.toString() + " lat"
    }
}

class ProductList {
    constructor() {
        this.products = []
    }


    writeProduct(productId) // zwraca czytelnie sformatowany string z opisem wybranego produktu
    {
        //let produkt =this.products.filter(val => val.id == idProduktu)
        let output = ""
        let exists = false;

        this.products.forEach(function (element) {
            if (element.id == productId) {
                output = "Nazwa produktu: " + element.name + ", model: " + element.model.toString() +
                    " ,rok produkcji: " + element.productionYear.toString() + " ,cena: " + element.price.toString()
                    + ",zużycie energii: " + element.energyConsumption.toString()
                exists = true;
            }
        })
        if (exists == false) { console.log("Brak produktu o ID = " + productId) }
        return output
    }


    writeAllProducts()  //zwraca czytelnie sformatowany string z listą wszystkich produktów
    {
        let output = ""
        let i = 1
        this.products.forEach((element) => {
            output += "Produkt " + i++ + ": Nazwa: " + element.name + ",id: " + element.id + ", model: " + element.model.toString() +
                " ,rok produkcji: " + element.productionYear.toString() + " ,cena: " + element.price.toString()
                + ",zużycie energii: " + element.energyConsumption.toString() + "\n"
        })
        return output
    }
    addProduct(product)  //rzuca wyjątek jeśli produkt o tym id już jest na liście
    {
        var exists = false;
        this.products.forEach(function (element) {
            if (element.id == product.id) {
                exists = true
                try {
                    throw new Error()
                } catch (e) { console.error("Produkt o id=" + element.id + " już istnieje!") }
            }
        })
        if (exists == false) {
            this.products.push(product)
        }

    }
    changeProduct(productId, product) {
        this.products.forEach(function (element) {
            if (element.id == productId) {
                console.log("Zmieniono produkt " + element.name + " na " + product.name)
                Object.assign(element, product);
            }
        })
    }
}
class Magazine extends ProductList {
    constructor(products) {
        super(products)
    }
    addProduct(product, amount) {
        let newProduct = {
            id: product.id,
            name: product.name,
            model: product.model,
            energyConsumption: product.energyConsumption,
            productionYear: product.productionYear,
            price: product.price,
            amount: amount
        }
        console.log(newProduct)
        this.products.push(newProduct)
    }
        // addProduct(productId, amount) {
        //     let productToAdd
        //     super.products.forEach(function (element) {
        //         if (element.id == productId) {
        //             productToAdd = element
        //             productToAdd.amount=amount
        //         }
        //     })
        // let newProduct = {
        //     id: productToAdd.id,
        //     name: productToAdd.name,
        //     model: productToAdd.model,
        //     energyConsumption: productToAdd.energyConsumption,
        //     productionYear: productToAdd.productionYear,
        //     price: productToAdd.price,
        //     amount: amount
        // }
 takeProduct(product, amount) {
        let copy
        this.products.forEach(function (element) {
            if (element.id == product.id) {
                element.amount -= amount
                // console.log(element)
                copy = element
            }
        })
        return copy
    }

}
class Shop extends ProductList {
    constructor() {
        super()
    }
    // addProduct(name, model, price, energyConsumption) {
    //     let lastId = this.products[products.length - 1].id;
    //     if (this.products.length == 0) lastId = 0
    //     this.products.push(new Product(++lastId, name, model, 2001, price, energyConsumption))
    // }
    addProduct(id, name, model, price, energyConsumption) {
        let exists = false
        this.products.forEach(function (element) {
            if (element.id == id) {
                console.log("Produkt o id =" + id + " istnieje w sklepie.")
                exists = true
            }
        })
        //shop.addProduct("zmywarka","Phillips",1999.99,4);
        if (exists == false) {
            this.products.push(new Product(id, name, model, 2000, price, energyConsumption))

            this.products.forEach(function (element) {
                console.log(element)
            }
            )
        }
    }
}

class Order{
    constructor(){
        this.products = []
    }

    addProduct(id){
        var exists=false;
        var shop = new Shop();
        shop.products.forEach(function(element){
            if(element.id == id){
                products.push(element);
                exists = true;
        }})
       if(exists == false){
           console.log('Nie ma takiego produktu w sklepie');
       }
    }

    completeOrder(product, amount){
        var exists=false;
        var magazine = new Magazine();
        magazine.products.forEach(function(element){
            if(element == product){
                let oldAmount = element.amount;
               element.amount = oldAmount - amount;
               exists = true;
        }})
        if(exists == false){
            console.log('Nie ma takiego produktu w sklepie');
        }
    }
}
var productList = new ProductList()
var magazine = new Magazine()
var shop = new Shop()
var order = new Order()

var pralka = new Product(0, "pralka", "samsung", 2021, 999.99, 5.6)
var zmywarka = new Product(1, "zmywarka", "samsung", 2014, 1999.99, 3)
var telewizor = new Product(2, "telewizor", "Phillips", 2003, 325.99, 5)
var odkurzacz = new Product(3, "odkurzacz", "Phillips", 2015, 699.99, 3)

productList.addProduct(pralka)
productList.addProduct(zmywarka)
productList.addProduct(odkurzacz)
productList.addProduct(telewizor)
console.log("Wypisanie listy produktów")
console.log(productList.writeAllProducts())
// productList.changeProduct(0, telewizor)
// console.log("Wypisanie listy produktów po zmienie pralki na telewizor")
// console.log(productList.writeAllProducts())

console.log("\nDodanie telewizora do magazynu.")
magazine.addProduct(telewizor, 5)
magazine.addProduct(zmywarka,2)
magazine.addProduct(odkurzacz,11)
// console.log("Dodanie po ID pralki -> 0")
// magazine.addProduct(0,15)
// magazine.writeAllProducts()

// console.log("\n Magazyn po zabraniu 3 telewizorów.")
// console.log(magazine.takeProduct(telewizor, 3))
// magazine.writeAllProducts()
console.log("Dodanie zmywarki do sklepu")
shop.addProduct(2,"zmywarka","Phillips",1999.99,4)

console.log("Dodanie produktu do zamówienia")
order.addProduct(2)
