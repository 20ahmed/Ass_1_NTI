async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  const row = document.querySelector(".row");

  function displayProducts(products) {
    const productCards = products.map(
      (el) => `
      <div class="col-md-4">
        <div class="product">
          <img src="${el.image}" alt="${el.title}" style="width:100px; height:100px;">
          <h2>${el.title}</h2>
          <p class="salary">$${el.price}</p>
          <button class="btn btn-primary">View Details</button>
          <button class="btn btn-success">Add to Cart</button>
        </div>
      </div>
      `
    );
    row.innerHTML = productCards.join("");
  }

  function sortedFuncByCategory() {
    const sortedData = [...data].sort((a, b) =>
      a.category.localeCompare(b.category)
    );
    // console.log("Sorted data by category in ascending order:", sortedData);
    displayProducts(sortedData);
  }

  function sortedFunc() {
    const sortedData = [...data].sort((a, b) => a.price - b.price);
    // console.log("Sorted data by price in ascending order:", sortedData);
    displayProducts(sortedData);
  }

  function filterByMinPrice() {
    const minPrice = parseFloat(document.getElementById("minPriceInput").value);

    const filteredData = data.filter((product) => product.price >= minPrice);
    if (filteredData.length > 0) {
      displayProducts(filteredData);
    } else {
      document.querySelector(".row").innerHTML =
        "<p class=not-found >Not Found</p>";
    }
  }

  function filterByMaxPrice() {
    const maxPrice = parseFloat(document.getElementById("minPriceInput").value);

    const filteredData = data.filter((product) => product.price >= maxPrice);
    if (filteredData.length < 0) {
      displayProducts(filteredData);
    } else {
      document.querySelector(".row").innerHTML =
        "<p class=not-found >Not Found</p>";
    }
  }

  displayProducts(data);

  window.sortedFunc = sortedFunc;
  window.sortedFuncByCategory = sortedFuncByCategory;
  window.filterByMinPrice = filterByMinPrice;
  window.filterByMaxPrice = filterByMaxPrice;
}

fetchData();
