const productList = document.getElementById("productList");
const formModal = document.getElementById("formModal");
const openForm = document.getElementById("openForm");
const closeForm = document.getElementById("closeForm");
const productForm = document.getElementById("productForm");
const searchInput = document.getElementById("search");

let products = JSON.parse(localStorage.getItem("products") || "[]");

function renderProducts(filter = "") {
  productList.innerHTML = "";

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    productList.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      ${p.image ? `<img src="${p.image}" alt="${p.title}"/>` : ""}
      <h3>${p.title}</h3>
      <p><strong>R$ ${p.price}</strong></p>
      <p>${p.category}</p>
      <p>${p.description}</p>
    `;
    productList.appendChild(card);
  });
}

openForm.addEventListener("click", () => formModal.classList.remove("hidden"));
closeForm.addEventListener("click", () => formModal.classList.add("hidden"));

productForm.addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const price = parseFloat(document.getElementById("price").value);
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const imageInput = document.getElementById("image");
  const reader = new FileReader();

  const product = { title, price, category, description };

  if (imageInput.files.length > 0) {
    reader.onload = function (e) {
      product.image = e.target.result;
      saveProduct(product);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveProduct(product);
  }
});

function saveProduct(product) {
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
  productForm.reset();
  formModal.classList.add("hidden");
}

searchInput.addEventListener("input", e => {
  renderProducts(e.target.value);
});

renderProducts();
