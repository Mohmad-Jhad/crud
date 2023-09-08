const addProduct = document.querySelector(".addProduct-navigation");
const searchTopButton = document.querySelector(".search-navigation");
const searchParent = document.querySelector(".search-parent");
const searchInput = document.querySelector(".searchInput");
const tbody = document.querySelector(".tbody");



let products = [];
if(JSON.parse(localStorage.getItem("products"))) {
   products = JSON.parse(localStorage.getItem("products"));
  showData();
}else {
   products = [];
}

// products = [
//   {"name":"desktop msi motherpoad","company":"msi","product":"computer motherpord","quantity":"4","date":"8/9/2023"},
//   {"name":"iphone","company":"apple","product":"phone","quantity":"10","date":"8/9/2023"},
//   {"name":"mouse","company":"logtic","product":"computer mouse","quantity":"5","date":"8/9/2023"},
//   {"name":"laptop","company":"dell","product":"laptop","quantity":"2","date":"8/9/2023"},
// ];
// showData();




// add product
function addProductF() {
  Swal.fire({
    title: 'Add Product',
    html:
      '<div style="display:flex;flex-direction: column;gap:5px">'+
      '<label for="name">Name</label>' +
      '<input type="text" id="name" class="swal2-input" placeholder="Enter product name" >' +
      '<label for="company">Company name</label>' +
      '<input type="text" id="company" class="swal2-input" placeholder="Enter your company name">' +
      '<label for="product">product type</label>' +
      '<input type="text" id="product" class="swal2-input" placeholder="Enter the product type">' +
      '<label for="quantity">Quantity</label>' +
      '<input type="number" id="quantity" class="swal2-input" placeholder="Enter the quantity">'+
      '</div>',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      // You can handle the form submission here
      const name = document.getElementById('name').value;
      const company = document.getElementById('company').value;
      const product = document.getElementById('product').value;
      const quantity = document.getElementById('quantity').value;
      // Perform validation or further processing here
      // Return a promise to handle async operations if needed
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulate a request, you can replace this with actual data submission
          if (name && company && product && quantity) {
            resolve({ name, company, product, quantity }); // Resolve with an object containing the form data
          } else {
            Swal.showValidationMessage('Please fill in all fields');
            resolve();
          }
        }, 1000);
      });
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Handle the form submission result here
      const { name, company, product, quantity } = result.value; // Get the form data from the result
      Swal.fire('Success!', 'The product has been added', 'success');

      const date = currentDate();

      const productData = {
        name,
        company,
        product,
        quantity,
        date
      };

      products.push(productData);
      localStorage.setItem('products', JSON.stringify(products));
      showData();
    }
  });
}
// return current date
function currentDate() {
  const currentDate = new Date();

const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; 
const year = currentDate.getFullYear();

return `${day}/${month}/${year}`;
}


// for appear search input 
searchTopButton.onclick = function() {
  if(searchParent.getAttribute("style") == "visibility: hidden") {
    searchParent.setAttribute("style","visibility: visible")
    return;
  }
}
// for disappear search input 
function hideInputSearch() {
searchParent.setAttribute("style","visibility: hidden");
searchInput.value = "";
showData();
}

//for search in array
function searchF(e) {
if(searchInput.value.length < 3) {
  showData();
  return;
}
if(!products) return
 const result = products.filter( (el,index)=> {
  if(el.name.includes(searchInput.value)) {
      el.index = index;
      return el;
  }
  return false;
 }  );
 showData(result);
  
}

// show data in the table
function showData(searchArr) {
  let str = ``;

  if(searchArr) {

    searchArr.forEach( (el,index)=> {
      str += 
      `
      <tr>
      <td>${index + 1}</td>
      <td>${el.name}</td>
      <td>${el.company}</td>
      <td>${el.product}</td>
      <td>${el.quantity}</td>
      <td>${el.date}</td>
      <td><button class="deleteButton" onclick="deleteF(${el.index})">delete</button></td>
      <td><button class="updateButton" onclick="updateF(${el.index})">update</button></td>
       </tr>
      `
    } )


  }else {

    products.forEach( (el,index)=> {
      str += 
      `
      <tr>
      <td>${index + 1}</td>
      <td>${el.name}</td>
      <td>${el.company}</td>
      <td>${el.product}</td>
      <td>${el.quantity}</td>
      <td>${el.date}</td>
      <td><button class="deleteButton" onclick="deleteF(${index})">delete</button></td>
      <td><button class="updateButton" onclick="updateF(${index})">update</button></td>
       </tr>
      `
    } )
  }
    tbody.innerHTML = str;
    
}





// delete function 

function deleteF(index) {
 deleteAlert().then( isConfirmed => {
    if(isConfirmed) {
      products.splice(index,1);
      localStorage.setItem("products",JSON.stringify(products));
      searchInput.value = "";
      showData();
    }
 } )
}
// delete alert and confirm delete process
function deleteAlert() {
  return new Promise((resolve) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'the product has been deleted',
          'success'
        )
        resolve(true); // Resolve the promise with true when confirmed
      } else {
        resolve(false); // Resolve the promise with false when canceled
      }
    });
  });
}


// update function
function updateF(index) {
  Swal.fire({
    title: 'Add Product',
    html:
      '<div style="display:flex;flex-direction: column;gap:5px">'+
      '<label for="name">Name</label>' +
      `<input type="text" id="name" class="swal2-input" placeholder="Enter product name" value="${products[index].name}">` +
      '<label for="company">Company name</label>' +
      `<input type="text" id="company" class="swal2-input" placeholder="Enter your company name" value="${products[index].company}">` +
      '<label for="product">product type</label>' +
      `<input type="text" id="product" class="swal2-input" placeholder="Enter the product type" value="${products[index].product}"` +
      '<label for="quantity">Quantity</label>' +
      `<input type="number" id="quantity" class="swal2-input" placeholder="Enter the quantity" value="${products[index].quantity}">`+
      '</div>',
    showCancelButton: true,
    confirmButtonText: 'update',
    cancelButtonText: 'Cancel',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      // You can handle the form submission here
      const name = document.getElementById('name').value;
      const company = document.getElementById('company').value;
      const product = document.getElementById('product').value;
      const quantity = document.getElementById('quantity').value;
      // Perform validation or further processing here
      // Return a promise to handle async operations if needed
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulate a request, you can replace this with actual data submission
          if (name && company && product && quantity) {
            resolve({ name, company, product, quantity }); // Resolve with an object containing the form data
          } else {
            Swal.showValidationMessage('Please fill in all fields');
            resolve();
          }
        }, 1000);
      });
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Handle the form submission result here
      const { name, company, product, quantity } = result.value; // Get the form data from the result
      Swal.fire('Success!', 'The product has been updated', 'success');


      const productData = {
        name,
        company,
        product,
        quantity,
        date: products[index].date,
      };

      products[index] = productData;
      localStorage.setItem('products', JSON.stringify(products));
        searchInput.value = "";
      showData();
    }
  });
}