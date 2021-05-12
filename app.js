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
    
    // Add to table item
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

// Event Listeners
document.getElementById('product-form').addEventListener('submit', 
function(e) {
  // Form value'lara ulaşma
  const productName = document.getElementById('p-name').value, // virgül sayesinde yeniden const yazmamıza gerek kalmıyor.
        productNo = document.getElementById('p-no').value,
        price = document.getElementById('price').value;


  //  Product objesi oluşturma
const product = new Product(productName, productNo, price);

// UI ' a ekleme
const ui = new UI();

// Validate 
if(productName === "" || productNo === "" || price === "") {
  // error alert 
  ui.showAlert("Please fill in all fields!", "error");
} else {
  // Add product to list
  ui.addProductToList(product);
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

  // Alert for Remove
  ui.showAlert("Product Removed!", "success");
 
  e.preventDefault();
});

