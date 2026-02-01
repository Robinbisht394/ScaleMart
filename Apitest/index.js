// test auth API
const APIButton = document.getElementById("api-btn");
console.log(APIButton);
// signup
const baseUrl = "http://localhost:5000/api/v1/";

const signupMockData = {
  name: "rohan",
  email: "rohan@gmail.com",
  password: "rohan123@",
  role: "admin",
};

const loginMockData = {
  email: "abcd@gmail.com",
  // password: "abcd1@",
};

const callloginUp = async () => {
  try {
    const response = await fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginMockData),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const callSignUp = async () => {
  try {
    const response = await fetch(`${baseUrl}auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(signupMockData),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const changePassword = async () => {
  try {
    const response = await fetch(`${baseUrl}user/changepassword`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        password: "abc1234@",
        id: "697c4f71c6a64b2ea595b8f5",
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const getAllUsers = async () => {
  try {
    const response = await fetch(`${baseUrl}user/`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// categories data
const getAllCategories = async () => {
  try {
    const response = await fetch(`${baseUrl}categories/`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const createCategory = async () => {
  try {
    const response = await fetch(`${baseUrl}categories/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "Toy",
        slug: "toy",
        description:
          "It is collection of modern tech devices and machines that make the work easier for humans. ensures that there time is saved",
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const deleteCategory = async () => {
  try {
    const response = await fetch(
      `${baseUrl}categories/697c7f3b4ad74843ea80cf14`,
      {
        method: "DELETE",
      },
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const updateCategory = async () => {
  try {
    const response = await fetch(
      `${baseUrl}categories/697c7f3b4ad74843ea80cf14`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: "Toy",
          slug: "toy",
          description:
            "It is collection of toys for children and few dolls for girl child",
        }),
      },
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// product API

const productMockData = [
  {
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    description: "Apple iPhone 15 Pro with A17 chip and titanium body",
    price: 129999,
    discountedPrice: 4000,
    category: "697c78ba12bfa9901311676e",
    brand: "Apple",
    images: [
      {
        url: "https://example.com/iphone15-front.jpg",
        alt: "iPhone 15 Pro Front",
      },
      {
        url: "https://example.com/iphone15-back.jpg",
        alt: "iPhone 15 Pro Back",
      },
    ],
    stock: 25,
    sku: "APL-IP15P-001",
    attributes: [
      { key: "Color", value: "Titanium Black" },
      { key: "Storage", value: "256GB" },
    ],
    ratings: { average: 4.8, count: 320 },
    isFeatured: true,
    createdBy: "697c4f71c6a64b2ea595b8f5",
  },

  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    description: "Samsung flagship phone with Snapdragon processor",
    price: 119999,
    discountedPrice: 114999,
    category: "697c78ba12bfa9901311676e",
    brand: "Samsung",
    images: [
      { url: "https://example.com/s24-front.jpg", alt: "Galaxy S24 Front" },
    ],
    stock: 40,
    sku: "SMS-S24U-002",
    attributes: [
      { key: "Color", value: "Phantom Black" },
      { key: "Storage", value: "512GB" },
    ],
    ratings: { average: 4.7, count: 210 },
    isFeatured: true,
    createdBy: "697c4f71c6a64b2ea595b8f5",
  },

  {
    name: "MacBook Air M2",
    slug: "macbook-air-m2",
    description: "Apple MacBook Air powered by M2 chip",
    price: 114999,
    discountedPrice: 109999,
    category: "697c78ba12bfa9901311676e",
    brand: "Apple",
    images: [
      { url: "https://example.com/macbook-air.jpg", alt: "MacBook Air M2" },
    ],
    stock: 15,
    sku: "APL-MBA-M2-003",
    attributes: [
      { key: "RAM", value: "16GB" },
      { key: "Storage", value: "512GB SSD" },
    ],
    ratings: { average: 4.9, count: 150 },
    isFeatured: true,
    createdBy: "697c6397bfb4d2d9c2dab929",
  },

  {
    name: "Sony WH-1000XM5 Headphones",
    slug: "sony-wh-1000xm5-headphones",
    description: "Noise cancelling wireless headphones",
    price: 34999,
    discountedPrice: 31999,
    category: "697c78ba12bfa9901311676e",
    brand: "Sony",
    images: [
      { url: "https://example.com/sony-xm5.jpg", alt: "Sony WH-1000XM5" },
    ],
    stock: 60,
    sku: "SNY-XM5-004",
    attributes: [{ key: "Color", value: "Black" }],
    ratings: { average: 4.6, count: 500 },
    isFeatured: false,
    createdBy: "697c6397bfb4d2d9c2dab929",
  },

  {
    name: "Dell XPS 13",
    slug: "dell-xps-13",
    description: "Compact and powerful ultrabook",
    price: 99999,
    discountedPrice: 94999,
    category: "697c78ba12bfa9901311676e",
    brand: "Dell",
    images: [{ url: "https://example.com/dell-xps13.jpg", alt: "Dell XPS 13" }],
    stock: 20,
    sku: "DEL-XPS13-005",
    attributes: [
      { key: "RAM", value: "16GB" },
      { key: "Processor", value: "Intel i7" },
    ],
    ratings: { average: 4.5, count: 180 },
    createdBy: "697c6397bfb4d2d9c2dab929",
  },

  {
    name: "Apple Watch Series 9",
    slug: "apple-watch-series-9",
    description: "Smartwatch with advanced health tracking",
    price: 45999,
    discountedPrice: 42999,
    category: "697c78ba12bfa9901311676e",
    brand: "Apple",
    images: [
      {
        url: "https://example.com/apple-watch-9.jpg",
        alt: "Apple Watch Series 9",
      },
    ],
    stock: 35,
    sku: "APL-WAT9-006",
    attributes: [
      { key: "Size", value: "45mm" },
      { key: "Color", value: "Midnight" },
    ],
    ratings: { average: 4.7, count: 290 },
    isFeatured: true,
    createdBy: "697c6397bfb4d2d9c2dab929",
  },

  {
    name: "Canon EOS R10 Camera",
    slug: "canon-eos-r10-camera",
    description: "Mirrorless camera for photography enthusiasts",
    price: 87999,
    discountedPrice: 83999,
    category: "697c78ba12bfa9901311676e",
    brand: "Canon",
    images: [
      { url: "https://example.com/canon-r10.jpg", alt: "Canon EOS R10" },
    ],
    stock: 10,
    sku: "CAN-R10-007",
    attributes: [{ key: "Sensor", value: "APS-C" }],
    ratings: { average: 4.6, count: 95 },
    createdBy: "697c6397bfb4d2d9c2dab929",
  },

  {
    name: "Logitech MX Master 3S Mouse",
    slug: "logitech-mx-master-3s",
    description: "Advanced ergonomic wireless mouse",
    price: 9999,
    discountedPrice: 8999,
    category: "697c78ba12bfa9901311676e",
    brand: "Logitech",
    images: [
      {
        url: "https://example.com/mx-master-3s.jpg",
        alt: "MX Master 3S Mouse",
      },
    ],
    stock: 100,
    sku: "LOG-MX3S-008",
    attributes: [{ key: "Color", value: "Graphite" }],
    ratings: { average: 4.8, count: 640 },
    createdBy: "697c6397bfb4d2d9c2dab929",
  },

  {
    name: "Nike Air Zoom Pegasus",
    slug: "nike-air-zoom-pegasus",
    description: "Comfortable running shoes for daily training",
    price: 12999,
    discountedPrice: 11999,
    category: "697c77ea1b73f1d619a33189",
    brand: "Nike",
    images: [
      {
        url: "https://example.com/nike-pegasus.jpg",
        alt: "Nike Pegasus Shoes",
      },
    ],
    stock: 50,
    sku: "NKE-PEG-009",
    attributes: [
      { key: "Size", value: "9" },
      { key: "Color", value: "White" },
    ],
    ratings: { average: 4.4, count: 210 },
    createdBy: "697c6397bfb4d2d9c2dab929",
  },

  {
    name: "Adidas Originals Backpack",
    slug: "adidas-originals-backpack",
    description: "Stylish and durable backpack for everyday use",
    price: 4999,
    discountedPrice: 4499,
    category: "697c77ea1b73f1d619a33189",
    brand: "Adidas",
    images: [
      {
        url: "https://example.com/adidas-backpack.jpg",
        alt: "Adidas Backpack",
      },
    ],
    stock: 80,
    sku: "ADI-BAG-010",
    attributes: [{ key: "Capacity", value: "25L" }],
    ratings: { average: 4.3, count: 170 },
    createdBy: "697c6397bfb4d2d9c2dab929",
  },
];

// module.exports = productMockData;

const createProduct = async () => {
  try {
    const response = await fetch(`${baseUrl}products/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productMockData[10]),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const updateProduct = async () => {
  try {
    const response = await fetch(
      `${baseUrl}products/697c8c9eab0d4f30fa3b9fc7`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          isFeatured: true,
        }),
      },
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const getAllProducts = async () => {
  try {
    const response = await fetch(`${baseUrl}products/`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const getProductByID = async () => {
  try {
    const response = await fetch(
      `${baseUrl}products/697c8c9eab0d4f30fa3b9fc7`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const deleteProductByID = async () => {
  try {
    const response = await fetch(
      `${baseUrl}products/697c8c9eab0d4f30fa3b9fc7`,
      {
        method: "DELETE",
      },
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

async function fetchProducts(filters = {}) {
  const queryParams = new URLSearchParams(filters).toString();

  const response = await fetch(`${baseUrl}products/search?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  } else {
    const data = await response.json();
    console.log(data);
  }

  // return await response.json();
}

const addToCart = async () => {
  const cartData = [
    {
      user: "697c4f71c6a64b2ea595b8f5",
      cartItems: [
        {
          product: "697c8aa2c9bc84459aec6617",
          quantity: 2,
        },
        {
          product: "697c8bd0df33f58de1c5d791",
          quantity: 1,
        },
      ],
    },
    {
      user: "697c4f71c6a64b2ea595b8f5",
      cartItems: [
        {
          product: "697c8bf79528a0f0b52c7947",
          quantity: 3,
        },
      ],
    },
    {
      user: "697c61ce0b24889e965a5cea",
      cartItems: [
        {
          product: "697c8c0cc026ab30c18cfd41",
          quantity: 1,
        },
        {
          product: "697c8c2214107e8af9603246",
          quantity: 4,
        },
      ],
    },
  ];

  try {
    const response = await fetch(`${baseUrl}cart/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: "697c61ce0b24889e965a5cea",
        productId: "697c8c0cc026ab30c18cfd41",
        quantity: 1,
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const getCart = async () => {
  try {
    const response = await fetch(`${baseUrl}cart/697c4f71c6a64b2ea595b8f5`, {
      method: "GET",
    });

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const deleteCart = async () => {
  try {
    const response = await fetch(
      `${baseUrl}cart/removeCart/697c8c0cc026ab30c18cfd41`,
      {
        method: "DELETE",
      },
    );

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const updateQuantityCart = async () => {
  try {
    const response = await fetch(
      `${baseUrl}cart/updatequantity/697c8bf79528a0f0b52c7947`,
      {
        method: "PUT",
      },
    );

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const clearCart = async () => {
  try {
    const response = await fetch(`${baseUrl}cart/clearcart`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// order routes

const createOrder = async () => {
  try {
    const response = await fetch(`${baseUrl}order/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        shippingAdress: {
          fullName: "Sanju singh",
          phone: "8178206127",
          addressLine: "c-244/13",
          city: "Mandawali",
          state: "Delhi",
          pincode: "110092",
        },
        paymentMethod: "COD",
        id: "",
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const cancelOrder = async () => {
  try {
    const response = await fetch(
      `${baseUrl}order/cancel/697dd69ab245126c1add7176`,
      {
        method: "DELETE",
      },
    );

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const getOrders = async () => {
  try {
    const response = await fetch(`${baseUrl}order/`);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const statusUpdate = async () => {
  try {
    const response = await fetch(
      `${baseUrl}order/statusupdate/697dd69ab245126c1add7176`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: "pending" }),
      },
    );
  } catch {
    console.error(err);
  }
};
APIButton.addEventListener("click", (e) => {
  const search = {
    brand: "Dell",
    page: 1,
    limit: 3,
    minPrice: 100,
    maxPrice: 500000,
  };
  // fetchProducts(search);
  statusUpdate();
});
