import { Product } from "../types/product.types";

export const products: Product[] = [
  {
    ean: "9782070368228",
    productId: "PRD-0001",
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    publisher: "Gallimard",
    status: "AVAILABLE",
    price: 8.9,
    currency: "EUR",
    stock: 128,
    lastModified: "2026-05-10",
    productDetails: {
      PRODUCT_ID: "PRD-0001",
      EAN: "9782070368228",
      DBPGROUP: "LITTERATURE",
      DBPROVIDER: "GALLIMARD",
      PRODUCTFORM: "Paperback",
      LANGUAGE: "FR",
    },
    pricing: [
      {
        PRICETYPE: "Public price",
        PRICETTC: 8.9,
        CURRENCYCODE: "EUR",
      },
      {
        PRICETYPE: "Online price",
        PRICETTC: 7.95,
        CURRENCYCODE: "EUR",
      },
    ],
    classification: [
      {
        THEMA: "Children fiction",
        BISAC: "JUVENILE FICTION",
        CLIL: "Littérature jeunesse",
      },
    ],
    availability: [
      {
        WAREHOUSE: "Paris",
        STOCK: 128,
        STATUS: "AVAILABLE",
      },
      {
        WAREHOUSE: "Lille",
        STOCK: 42,
        STATUS: "AVAILABLE",
      },
    ],
    metadata: {
      CATALOG_LAST_MODIFIED: "2026-05-10",
      CREATED_AT: "2025-11-02",
      SOURCE: "Portfolio fake dataset",
    },
  },

  {
    ean: "9782266320481",
    productId: "PRD-0002",
    title: "1984",
    author: "George Orwell",
    publisher: "Pocket",
    status: "LOW_STOCK",
    price: 9.4,
    currency: "EUR",
    stock: 7,
    lastModified: "2026-05-04",
    productDetails: {
      PRODUCT_ID: "PRD-0002",
      EAN: "9782266320481",
      DBPGROUP: "FICTION",
      DBPROVIDER: "POCKET",
      PRODUCTFORM: "Paperback",
      LANGUAGE: "FR",
    },
    pricing: [
      {
        PRICETYPE: "Public price",
        PRICETTC: 9.4,
        CURRENCYCODE: "EUR",
      },
    ],
    classification: [
      {
        THEMA: "Dystopian fiction",
        BISAC: "FICTION / Classics",
        CLIL: "Roman étranger",
      },
    ],
    availability: [
      {
        WAREHOUSE: "Paris",
        STOCK: 7,
        STATUS: "LOW_STOCK",
      },
    ],
    metadata: {
      CATALOG_LAST_MODIFIED: "2026-05-04",
      CREATED_AT: "2025-10-14",
      SOURCE: "Portfolio fake dataset",
    },
  },

  {
    ean: "9782070413119",
    productId: "PRD-0003",
    title: "L'Étranger",
    author: "Albert Camus",
    publisher: "Gallimard",
    status: "AVAILABLE",
    price: 7.8,
    currency: "EUR",
    stock: 64,
    lastModified: "2026-05-12",
    productDetails: {
      PRODUCT_ID: "PRD-0003",
      EAN: "9782070413119",
      DBPGROUP: "CLASSIC",
      DBPROVIDER: "GALLIMARD",
      PRODUCTFORM: "Paperback",
      LANGUAGE: "FR",
    },
    pricing: [
      {
        PRICETYPE: "Public price",
        PRICETTC: 7.8,
        CURRENCYCODE: "EUR",
      },
      {
        PRICETYPE: "Library price",
        PRICETTC: 6.95,
        CURRENCYCODE: "EUR",
      },
    ],
    classification: [
      {
        THEMA: "Classic literature",
        BISAC: "FICTION / Literary",
        CLIL: "Classiques modernes",
      },
    ],
    availability: [
      {
        WAREHOUSE: "Paris",
        STOCK: 64,
        STATUS: "AVAILABLE",
      },
      {
        WAREHOUSE: "Brussels",
        STOCK: 18,
        STATUS: "AVAILABLE",
      },
    ],
    metadata: {
      CATALOG_LAST_MODIFIED: "2026-05-12",
      CREATED_AT: "2025-12-01",
      SOURCE: "Portfolio fake dataset",
    },
  },

  {
    ean: "9782253004226",
    productId: "PRD-0004",
    title: "Les Misérables",
    author: "Victor Hugo",
    publisher: "Le Livre de Poche",
    status: "OUT_OF_STOCK",
    price: 12.5,
    currency: "EUR",
    stock: 0,
    lastModified: "2026-05-02",
    productDetails: {
      PRODUCT_ID: "PRD-0004",
      EAN: "9782253004226",
      DBPGROUP: "LITTERATURE",
      DBPROVIDER: "LIVRE_DE_POCHE",
      PRODUCTFORM: "Paperback",
      LANGUAGE: "FR",
    },
    pricing: [
      {
        PRICETYPE: "Public price",
        PRICETTC: 12.5,
        CURRENCYCODE: "EUR",
      },
    ],
    classification: [
      {
        THEMA: "Historical fiction",
        BISAC: "FICTION / Classics",
        CLIL: "Roman classique",
      },
    ],
    availability: [
      {
        WAREHOUSE: "Paris",
        STOCK: 0,
        STATUS: "OUT_OF_STOCK",
      },
      {
        WAREHOUSE: "Lille",
        STOCK: 0,
        STATUS: "OUT_OF_STOCK",
      },
    ],
    metadata: {
      CATALOG_LAST_MODIFIED: "2026-05-02",
      CREATED_AT: "2025-09-21",
      SOURCE: "Portfolio fake dataset",
    },
  },
];

