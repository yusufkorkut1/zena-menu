export const menu = {
  hot: {
    title: "☕ Sıcak Kahveler",
    products: [
      {
        id: 1,
        name: "Espresso",
        description: "Yoğun espresso",
        price: 120,
      },
      {
        id: 2,
        name: "Americano",
        description: "Sıcak su ile hazırlanır",
        price: 140,
      },
      {
        id: 3,
        name: "Latte",
        description: "Espresso ve süt",
        price: 165,
      },
      {
        id: 4,
        name: "Cappuccino",
        description: "Bol süt köpüğü",
        price: 165,
      },
    ],
  },

  cold: {
    title: "🧊 Soğuk Kahveler",
    products: [
      {
        id: 1,
        name: "Ice Latte",
        description: "Soğuk süt ile hazırlanır",
        price: 175,
      },
      {
        id: 2,
        name: "Ice Americano",
        description: "Buzlu Americano",
        price: 165,
      },
      {
        id: 3,
        name: "Ice Mocha",
        description: "Çikolatalı buzlu kahve",
        price: 185,
      },
    ],
  },

  dessert: {
    title: "🧇 Waffle & Tatlı",
    products: [
      {
        id: 1,
        name: "Belçika Waffle",
        description: "Meyveli ve çikolatalı",
        price: 290,
      },
      {
        id: 2,
        name: "San Sebastian",
        description: "Yanık cheesecake",
        price: 240,
      },
    ],
  },

  snack: {
    title: "🥐 Atıştırmalıklar",
    products: [
      {
        id: 1,
        name: "Croissant",
        description: "Tereyağlı",
        price: 120,
      },
      {
        id: 2,
        name: "Cookie",
        description: "Damla çikolatalı",
        price: 90,
      },
    ],
  },

  drink: {
    title: "🥤 Soğuk İçecekler",
    products: [
      {
        id: 1,
        name: "Limonata",
        description: "Ev yapımı",
        price: 140,
      },
      {
        id: 2,
        name: "Ice Tea",
        description: "Şeftali aromalı",
        price: 95,
      },
    ],
  },

  vitamin: {
    title: "🍊 Vitamin Bar",
    products: [
      {
        id: 1,
        name: "Portakal Suyu",
        description: "Taze sıkılmış",
        price: 170,
      },
      {
        id: 2,
        name: "Karışık Meyve Suyu",
        description: "Mevsim meyveleri",
        price: 190,
      },
    ],
  },
} as const;
