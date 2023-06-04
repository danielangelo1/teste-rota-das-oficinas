let products = [];
let customers = [];

function addProduct() {
  const productName = document.querySelector(".product-name").value;
  const productPrice = parseFloat(
    document.querySelector(".product-price").value
  );
  const productQuantity = parseInt(
    document.querySelector(".product-quantity").value
  );

  const product = {
    name: productName,
    price: productPrice,
    quantity: productQuantity,
  };

  products.push(product);
  Swal.fire("Good job!", productName + " adicionado com sucesso!", "success");

  document.querySelector(".product-name").value = "";
  document.querySelector(".product-price").value = "";
  document.querySelector(".product-quantity").value = "";

  updateProductSelectOptions();
}

function addCustomer() {
  const customerName = document.querySelector(".customer-name").value;
  const customerProducts = Array.from(
    document.querySelector(".customer-products").selectedOptions
  ).map((option) => option.value);
  const serviceCharge = document.querySelector(".service-charge").checked;

  const customer = {
    name: customerName,
    products: customerProducts,
    serviceCharge: serviceCharge,
  };

  customers.push(customer);
  Swal.fire("Good job!", customerName + " adicionado com sucesso!", "success");

  document.querySelector(".customer-name").value = "";
  document
    .querySelectorAll(".customer-products option")
    .forEach((option) => (option.selected = false));
  document.querySelector(".service-charge").checked = false;
}

function calculate() {
  let output = "";

  // Calcular o valor total gasto em cada produto
  const productTotals = {};
  for (const product of products) {
    if (!productTotals[product.name]) {
      productTotals[product.name] = 0;
    }
    productTotals[product.name] += product.price * product.quantity;
  }

  // Calcular o valor total a ser pago por cada cliente para os produtos que eles consumiram
  for (const customer of customers) {
    output += `<p><strong>${customer.name}</strong> consumiu:<br>`;

    let customerTotal = 0;

    for (const productName of customer.products) {
      const productTotal = productTotals[productName];

      if (productTotal) {
        const customersWithProduct = customers.filter((c) =>
          c.products.includes(productName)
        );
        const productShare = productTotal / customersWithProduct.length;
        customerTotal += productShare;

        output += `- ${productName}: R$ ${productShare.toFixed(2)}<br>`;
      }
    }

    if (customer.serviceCharge) {
      const serviceChargeAmount = customerTotal * 0.1;
      customerTotal += serviceChargeAmount;
      output += `<em>Taxa de serviço (10%): R$ ${serviceChargeAmount.toFixed(
        2
      )}</em><br>`;
    }

    output += `<strong>Total a pagar: R$ ${customerTotal.toFixed(
      2
    )}</strong></p>`;
  }

  document.querySelector("#output").innerHTML = output;
}

function updateProductSelectOptions() {
  const selectElement = document.querySelector(".customer-products");
  selectElement.innerHTML = "";

  for (const product of products) {
    const optionElement = document.createElement("option");
    optionElement.value = product.name;
    optionElement.text = product.name;
    selectElement.appendChild(optionElement);
  }
}
