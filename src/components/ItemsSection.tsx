import React from "react";
import SubBar, { subburInterface } from "./SubBar";
import ProductItem from "./ProductItem";
export interface productInterface {
  ID: number;
  img: string;
  name: string;
  description: string | null;
  price: number;
  creationDate: string;
}

interface itemSectionInterface {
  products: productInterface[];
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  setEditItemOpen: () => void;
  setItemToOpen: React.Dispatch<React.SetStateAction<productInterface | null>>;
  additem: () => void;
}
export default function ItemsSection({
  products,
  onSearch,
  onSelect,
  setEditItemOpen,
  setItemToOpen,
  additem,
}: itemSectionInterface) {
  return (
    <div className="itemsSection">
      <SubBar onSearch={onSearch} onSelect={onSelect} additem={additem} />
      <>
        {products !== null
          ? products.map((prod, index) => {
              return (
                <>
                  <ProductItem
                    key={prod.ID}
                    ID={prod.ID}
                    img={prod.img}
                    name={prod.name}
                    description={prod.description}
                    price={prod.price}
                    creationDate={prod.creationDate}
                    openEdithItem={setEditItemOpen}
                    setItemToOpen={setItemToOpen}
                  />
                  {index < products.length - 1 && <div className="hr"></div>}
                </>
              );
            })
          : ""}
      </>
    </div>
  );
}
