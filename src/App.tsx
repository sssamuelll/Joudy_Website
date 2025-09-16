import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ConcertsList from "./components/ConcertsList";
import Merchandising from "./components/Merchandising";
import Footer from "./components/Footer";
import OrderCart from "./components/OrderCart";

import "./App.css";
import { useQuery, gql} from "@apollo/client";
import { useCourtain } from "./hooks/useCourtain";

type MerchItem = {
  id: string;
  type: string;
  title: string;
  price: string;
  imageSrc: string;
  availableForSale: boolean;
  handle: string;
};

type OrderItem = {
  id: string;
  type: string;
  title: string;
  price: string;
  imageSrc: string;
  quantity: number;
};

interface ProductVariantEdge {
  node: {
    availableForSale: boolean;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface ProductImageEdge {
  node: {
    originalSrc: string;
  };
}

interface ProductEdge {
  node: {
    id: string;
    title: string;
    productType: string;
    variants: {
      edges: ProductVariantEdge[];
    };
    images: {
      edges: ProductImageEdge[];
    };
    handle: string;
  };
}

interface QueryData {
  products: {
    edges: ProductEdge[];
  };
}

const GET_PRODUCTS = gql`
  query products {
    products(first: 8) {
      # Fetch the first 10 products
      edges {
        node {
          id
          title
          handle
          productType
          variants(first: 1) {
            # Get the first variant
            edges {
              node {
                priceV2 {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
          images(first: 1) {
            # Get the first image
            edges {
              node {
                originalSrc
              }
            }
          }
        }
      }
    }
  }
`;

const concerts = [
  {
    date: "02.22.24",
    city: "Nyc",
    venue: "Bowery Electric (support act for DAS DAMEN)",
    ticketUrl: "https://www.instagram.com/p/C3p8rsoOJNd/",
  },
  {
    date: "03.13.24",
    city: "Austin",
    venue: "Austin East Ciders (OWL @ SXSW)",
    ticketUrl: "https://www.instagram.com/eastciders",
  },
  {
    date: "03.15.24",
    city: "Austin",
    venue: "Tiny Van Concerts",
    ticketUrl: "https://www.instagram.com/tinyvanconcert/",
  },
  {
    date: "03.16.24",
    city: "Austin",
    venue: "Vancerts",
    ticketUrl: "https://www.instagram.com/vancertsatx/",
  },
  {
    date: "03.16.24",
    city: "Austin",
    venue: "Trash Casual official SXSW Showcase",
    ticketUrl: "https://www.instagram.com/trashcasual/",
  },
  {
    date: "3.23.24",
    city: "NYC",
    venue: "Arlenes Grocery",
    ticketUrl: "https://www.instagram.com/arlenesgrocery/",
  },
  {
    date: "3.31.24",
    city: "New Jersey",
    venue: "Live at WFMU",
    ticketUrl: "https://www.instagram.com/wfmu/",
  }
];


const App: React.FC = () => {
  const { showCurtain, hideCurtain } = useCourtain();
  const [showOrderCart, setShowOrderCart] = useState(false);
  const [orderCartItems, setOrderCartItems] = useState<OrderItem[]>([]); // [id, quantity]
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);

  const { /*loading, error,*/ data } = useQuery<QueryData>(GET_PRODUCTS);

  

  React.useEffect(() => {
    if (data) {
      setMerchItems(
        data.products.edges.map((item) => ({
          id: item.node.id,
          type: item.node.productType,
          title: item.node.title,
          price: item.node.variants.edges[0].node.priceV2.amount,
          imageSrc: item.node.images.edges[0].node.originalSrc,
          availableForSale: item.node.variants.edges[0].node.availableForSale,
          handle: item.node.handle,
        }))
      );
    }
  }, [data]);

  React.useEffect(() => {
    console.log("Merch Items:", merchItems);
    merchItems.forEach((item) => {
      console.log(`Item ID: ${item.id}, Type: ${typeof item.id}`);
    });
  }, [merchItems]);

  const handleCloseOrderCart = () => {
    hideCurtain();
    setShowOrderCart(false);
  };

  const handleShowOrderCart = () => {
    setShowOrderCart(true);
  };

  useEffect(() => {
    if (showOrderCart) {
      showCurtain(handleCloseOrderCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOrderCart]);

  const incrementItemQuantity = (itemId: string) => {
    const item = orderCartItems.find((item) => item.id === itemId);
    if (item) {
      const updatedItems = orderCartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setOrderCartItems(updatedItems);
    } else {
      const selectedItem = merchItems.find((item) => item.id === itemId);
      if (selectedItem) {
        setOrderCartItems([
          ...orderCartItems,
          { ...selectedItem, quantity: 1 },
        ]);
      }
    }
  };

  const decrementItemQuantity = (itemId: string) => {
    setOrderCartItems((prevState) => {
      const updatedItems = prevState.map((item) => {
        if (item.id === itemId && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

      return updatedItems.filter((item) => item.quantity > 0);
    });
  };

  return (
    <>
      <div className="main">
        <Header />
        <ConcertsList concerts={concerts}/>
        <Merchandising
          merchItems={merchItems}
          showOrderCart={handleShowOrderCart}
          incrementItemQuantity={incrementItemQuantity}
          
        />
        <Footer />
      </div>
      {showOrderCart && (
        <OrderCart
          closeOrderCart={handleCloseOrderCart}
          orderCartItems={orderCartItems}
          incrementItemQuantity={incrementItemQuantity}
          decrementItemQuantity={decrementItemQuantity}
        />
      )}
    </>
  );
};

export default App;
