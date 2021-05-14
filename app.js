class Product {
  constructor(productName, productNo, price) {
    this.productName = productName;
    this.productNo = productNo;
    this.price = price;
  }
}

class UI {
  addProductToList(product) {
    const list = document.getElementById('product-list');
  
    // Create tr Element
    const row = document.createElement('tr');
    // Add cols to tr
    row.innerHTML = `
    <td>${product.productName}</td>
    <td>${product.productNo}</td>
    <td>$${product.price}</td>
    <th><a href="#" class="delete">&#10006;</a></th>
    `;
    
    // Add 'tr' to table item
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create alert div
    const div = document.createElement('div');
    // Add classes to div 
    div.className = `alert ${className}`
    // Add Texts
    div.appendChild(document.createTextNode(message));
    // Get Parent Element
    const container = document.querySelector('.container');
    // Get Form
    const form = document.querySelector('#product-form');
    // Insert Alert
    container.insertBefore(div, form);

    // Timeout after 3 second
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 2500);
  }

  deleteProduct(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    };
  }

  clearInputs() {
    document.getElementById('p-name').value = "";
    document.getElementById('p-no').value = "";
    document.getElementById('price').value = "";
  }
}

// Local Storage Class
class Storage {
  static getProducts() {
    let products;
    if(localStorage.getItem('products') === null) {
      products = [];
    } else {
      products = JSON.parse(localStorage.getItem('products'));
    }

    return products;
  }

  static displayProducts() {
    const products = Storage.getProducts();

    products.forEach(function(product){
      const ui = new UI;

      // Add product to UI
      ui.addProductToList(product);
    });
  }

  static addProduct(product) {
    const products = Storage.getProducts();

    products.push(product);

    localStorage.setItem('products', JSON.stringify(products));
  }

  static removeProduct(productNo) {
    const products = Storage.getProducts();

    products.forEach(function(product, index){
      if(product.productNo === productNo) {
        products.splice(index, 1);
      }
    });

    localStorage.setItem('products', JSON.stringify(products));
}
};

// DOM Load Event for display from local storage
document.addEventListener('DOMContentLoaded', Storage.displayProducts);

// Event Listeners for Add Product
document.getElementById('product-form').addEventListener('submit', 
function(e) {
  // Form value'lara ulaşma
  const productName = document.getElementById('p-name').value, // virgül sayesinde yeniden const yazmamıza gerek kalmıyor.
        productNo = document.getElementById('p-no').value,
        price = document.getElementById('price').value;


  //  Product objesi oluşturma
const product = new Product(productName, productNo, price);

// UI nesnesi
const ui = new UI();

// Validate 
if(productName === "" || productNo === "" || price === "") {
  // error alert 
  ui.showAlert("Please fill in all fields!", "error");
} else {
  // Add product to list
  ui.addProductToList(product);

  // Add product to Local Storage
  Storage.addProduct(product);
  // Add Alert
  ui.showAlert("Product Added!", "success");

  // Clear input fields
  ui.clearInputs();
}

  e.preventDefault();
});

// Event Listener for Delete Item
document.getElementById('product-list').addEventListener('click', function(e) {

  // Add to UI
  const ui = new UI();

  // Call Delete Function
  ui.deleteProduct(e.target);

  // Remove From Local Storage
  // (Reaching to the productNo for every item that we clicked to delete because the productNo should be unique.)
  //(Her bir ürünün productNo'sunu alarak eşsiz bir seçici oluşturuyoruz.)
  Storage.removeProduct(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

  // Alert for Remove
  ui.showAlert("Product Removed!", "success");
 
  e.preventDefault();
});

