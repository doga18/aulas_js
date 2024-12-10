// // Método filter

// const numbers = [1, 2, 3, 4, 5, 6, 7];
// const filterImpar = numbers.filter((n) => {
//   return n % 2 !== 0;  // Retorna true se o número é ímpar, false se é par.  // 1, 3, 5, 7
// })
// // Filtragem para pegar os valores que sejam maior que um determinado.
// const highNumbers = numbers.filter((n) => {
//   return n > 5;  // Retorna true se o número é maior que 5, false se não.  // 6, 7
// })
// // Filtrar por propriedade de um objeto.
// const empregados = [
//   { name: "Luiz", idade: 12, active: true},
//   { name: "Maria", idade: 32, active: false},
//   { name: "João", idade: 22, active: true},
//   { name: "Pedro", idade: 17, active: false},
//   { name: "Ana", idade: 45, active: true},
// ]

// console.log(filterImpar);
// console.log(highNumbers);
// console.log(empregados.filter((e) => e.active === true));

// // Método map

// const products = [
//   { id: 1, name: "Notebook", price: 1200, category: "Eletrônico" },
//   { id: 2, name: "Mouse", price: 50, category: "Eletrônico" },
//   { id: 3, name: "Teclado", price: 80 , category: "Periféricos" },
//   { id: 4, name: "Monitor", price: 200 , category: "Periféricos" }
// ]

// products.map((p) => {
//   if(p.category === "Periféricos"){
//     p.onSale = true
//   }
// })

// const ofertas = [];
// ofertas.push(products.filter((p) => p.onSale === true))
// console.log(ofertas);

// // Arrow functions

// const usuario = {
//   name: "Israel",
//   age: "20",
//   sayHello() {
//     // Bindando o this para ser usado abaixo.
//     const self = this;
//     // Falar em 2 segundos.
//     setTimeout(function() {
//       console.log(this);
//       console.log(`Olá meu nome é ${self.name} e eu tenho ${self.age} anos.`);
//     }, 500);
//   },
//   sayNewHello(){
//     setTimeout(() => {
//       console.log(`Olá meu nome é ${this.name} e tenho ${this.age} anos de idade.`);
//     }, 700)
//   }
// }

// usuario.sayHello();
// usuario.sayNewHello();

// // Spread operator

// const a1 = [1, 2, 3];
// const a2 = [4, 5, 6];
// const a3 = [...a1, ...a2];
// console.log(a3);
// // Colocando entre arrays.
// const a4 = [1000, 2000, 3000, ...a1, 5000, 6000, ...a2];
// console.log(a4);
// // mesmo ocorre com objetos.
// const carName = { name: 'Ferrari' };
// const carColor = { color: 'Vermelho' };
// const otherInfos = { hybrid: [
//   { key: 'Eletric'},
//   { key: 'Flexible'},
//   { key: 'Aquatic'}
// ]}

// const readyCar = { ...carName, ...carColor, ...otherInfos };
// console.log(readyCar);

// Classes
class Product {
  constructor(name, price){
    this.name = name;
    this.price = price;
    this.valorFinal = this.price;
  }

  productWithDiscount(discount){
    return this.valorFinal * ((100 - discount) / 100);
  }

  productVitrine(discount = 0){
    if(discount === 0){
      console.log(`O produto ${this.name}, custa ${this.price} reais. No momento não é possível dar desconto no mesmo.`);
    } else if (discount >= 0) {
      console.log(`O produto ${this.name}, custa originalmente ${this.price} reais. Foi dado um desconto de ${discount}%. O produto agora custa ${this.productWithDiscount(discount)} reais.`);
    }
  }}

// Usando a classe para cadastrar um produto e usar o método de desconto.
const notebook = new Product('Acer Nitro 5', 5499,00);

notebook.productVitrine(15)

// Heranças

class Smartphone extends Product {
  constructor(name, price, screenSize, brand, colors){
    super(name, price);    
    this.screenSize = screenSize;    
    this.brand = brand;
    this.colors = colors;
  }

  showColors(){
    console.log(`Este smartphone possui as seguintes cores: \n`);
    this.colors.forEach((color) => {
      console.log(color);
    });
  }
}

const Xioami = new Smartphone('Xioami Mi 10', 4499.00, 6.5, 'Xioami', ['Preto', 'Prata', 'Azul', 'Verde', 'Vermelho']);

Xioami.showColors()