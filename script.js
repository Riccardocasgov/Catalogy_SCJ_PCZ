const products = [
  {
    name: "Audífonos Inalámbricos Pro",
    category: "Tecnología",
    price: 899,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cafetera Programable",
    category: "Hogar",
    price: 1200,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mochila Urbana",
    category: "Moda",
    price: 650,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Lámpara LED de Escritorio",
    category: "Hogar",
    price: 420,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Smartwatch Active",
    category: "Tecnología",
    price: 1999,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Set de Botellas Térmicas",
    category: "Deportes",
    price: 540,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
  },
];

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const maxPriceRange = document.querySelector("#maxPrice");
const priceValue = document.querySelector("#priceValue");
const productGrid = document.querySelector("#productGrid");
const emptyState = document.querySelector("#emptyState");

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

function buildCategoryOptions() {
  const categories = [...new Set(products.map((product) => product.category))].sort();

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  });
}

function createCard(product) {
  return `
    <article class="card">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="card-content">
        <h3>${product.name}</h3>
        <p class="meta"><span>${product.category}</span><span class="price">${formatCurrency(product.price)}</span></p>
      </div>
    </article>
  `;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;
  const maxPrice = Number(maxPriceRange.value);

  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;

    return matchesQuery && matchesCategory && matchesPrice;
  });

  productGrid.innerHTML = filteredProducts.map(createCard).join("");
  emptyState.classList.toggle("hidden", filteredProducts.length > 0);
}

function updatePriceLabel() {
  priceValue.textContent = formatCurrency(Number(maxPriceRange.value));
}
