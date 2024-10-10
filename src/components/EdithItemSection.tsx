import React, { useState } from "react";
import { productInterface } from "./ItemsSection";
import { useDispatch } from "react-redux";
import { editProduct } from "../redux/slices/productSlice";
import { formatDate } from "../utils/dateFormat";

interface EditItemSectionInterface extends productInterface {
  onClose: () => void;
}
export default function EditItemSection({
  ID,
  name,
  description,
  price,
  img,
  onClose,
}: EditItemSectionInterface) {
  const [productName, setProductName] = useState<string>(name);
  const [productDescription, setProductDescription] = useState<string>(
    description || ""
  );
  const [imgurl, setimgurl] = useState<string>(img || "");
  const [productPrice, setProductPrice] = useState<number>(price);
  const dispatch = useDispatch();

  const handleSave = () => {
    const updatedProduct: productInterface = {
      ID,
      name: productName,
      description: productDescription,
      price: productPrice,
      img,
      creationDate: formatDate(new Date()),
    };
    dispatch(editProduct(updatedProduct));
    onClose();
  };

  return (
    <div className="edithItemSection">
      <div className="container">
        <div className="header">
          <button className="Btn closebtn" onClick={onClose}>
            close
          </button>
          <h2>Product {ID} Details</h2>
        </div>

        <div className="content">
          <img src={img} alt="Product" className="image" />
          <div>
            <label>Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="input"
              required
              minLength={2}
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="textarea"
              maxLength={200}
            />
          </div>
          <div>
            <label>img url</label>
            <textarea
              value={imgurl}
              onChange={(e) => setimgurl(e.target.value)}
              className="input"
              maxLength={200}
            />
          </div>

          <div className="priceContainer">
            <label>Price</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(parseFloat(e.target.value))}
              className="styles.input"
              required
              min={1}
            />
            <span>$</span>
          </div>

          <button onClick={handleSave} className="Btn button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// CSS-in-JS styles for the component
const styles = {
  header: {
    backgroundColor: "#b3c7e6",
    padding: "10px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  input: {
    padding: "8px",
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    padding: "8px",
    width: "100%",
    height: "60px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
