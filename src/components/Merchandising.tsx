type MerchItem = {
  id: string;
  type: string;
  title: string;
  price: string;
  imageSrc: string;
  availableForSale: boolean;
  handle: string;
};

interface SectionBProps {
  merchItems: MerchItem[];
  showOrderCart: () => void;
  incrementItemQuantity: (itemId: string) => void;
  
}

const formatPrice = (price: string) => {
  const numPrice = parseFloat(price);
  // Verificar si el precio es un número entero
  if (Number.isInteger(numPrice)) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      // Especificar que no queremos decimales si el número es entero
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      // Aquí podrías especificar el número de dígitos decimales si el número no es entero
      minimumFractionDigits: 2,
    }).format(numPrice);
  }
};

const Merchandising: React.FC<SectionBProps> = ({
  merchItems
}) => {

  const openMyShopify = (handle: string) => {
    const nuevaPestaña = window.open(`https://shopjoudy.myshopify.com/products/${handle}`, "_blank", "noopener,noreferrer");
    if (nuevaPestaña) nuevaPestaña.opener = null;
  }
  return (
    <div className="sectionB-container">
      <div className="container">
        <h1 className="container-title">MERCHANDISING</h1>
        <div className="merch">
          {merchItems.map((item) => (
            <div key={item.id} className="merch-item">
              <div className="image-merch">
                <img src={item.imageSrc} alt={item.title} />
              </div>
              <div className="product-info">
                <span className="product-type">{item.type}</span>
                <span className="product-title">{item.title}</span>
                <span className="product-price">{formatPrice(item.price)}</span>
                <button
                  className="button-buy"
                  {...(item.availableForSale ? {} : { disabled: true })}
                  onClick={() => {
                    openMyShopify(item.handle);
                  }}
                >
                  {item.availableForSale ? "BUY" : "SOLD OUT"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Merchandising;