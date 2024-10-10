import React from "react";
import text from "../text.json";
import { productInterface } from "./ItemsSection";
import { useDispatch } from "react-redux";
import { removeProductById } from "../redux/slices/productSlice";

interface productItemPageInterface extends productInterface {
  openEdithItem: () => void;
  setItemToOpen: React.Dispatch<React.SetStateAction<productInterface | null>>;
}

export default function ProductItem({
  ID,
  img,
  name,
  description,
  price,
  creationDate,
  openEdithItem,
  setItemToOpen,
}: productItemPageInterface) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeProductById(ID));
  };
  const handleOpenEdit = () => {
    openEdithItem();
    setItemToOpen({
      ID,
      img,
      name,
      description,
      price,
      creationDate,
    });
  };

  return (
    <div className="productItem">
      <div className="textPart" onClick={handleOpenEdit}>
        <img className="thumbnail" src={img} alt={name} />
        <div className="text">
          <div className="title">{name}</div>
          <div className="subtitle">{description}</div>
        </div>
      </div>

      <button className="Btn deleteBtn" onClick={handleDelete}>
        {text.delete}
      </button>
    </div>
  );
}
