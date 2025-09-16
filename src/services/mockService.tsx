type MerchItem = {
  id: number;
  type: string;
  title: string;
  price: string;
  imageSrc: string;
};

type Service = {
  verifyToken: (token: string) => Promise<boolean>;
  fetchMerchItems: () => Promise<MerchItem[]>;
};

export const service: Service = {
  verifyToken: async (token: string) => {
    /*simulemos un fetch*/
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (token !== "1234") {
      return false;
    }

    return true;
  },
  fetchMerchItems: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      {
        id: 1,
        type: "Vynil LP",
        title: "Destroy all Monsters",
        price: "$35",
        imageSrc: "/images/dam-artwork.jpg",
      },
      {
        id: 2,
        type: "Vynil EP",
        title: "El Despertar",
        price: "$20",
        imageSrc: "/images/despertar-artwork.jpg",
      },
      {
        id: 3,
        type: "Vynil EP",
        title: "Mastery",
        price: "$20",
        imageSrc: "/images/mastery-artwork.jpg",
      },
      {
        id: 4,
        type: "Vynil EP",
        title: "Tail End",
        price: "$20",
        imageSrc: "/images/tailend-artwork.jpg",
      },
    ];
  },
};
