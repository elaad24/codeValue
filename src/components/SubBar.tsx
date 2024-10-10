import React, { useState } from "react";
import text from "../text.json";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";

export interface subburInterface {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  additem: () => void;
}
export default function SubBar({
  onSearch,
  onSelect,
  additem,
}: subburInterface) {
  return (
    <div className="subBar">
      <button className="Btn" onClick={() => additem()}>
        {text.add}
      </button>
      <SearchBar setState={onSearch} />
      <Dropdown options={[text.name, text.reacentAdded]} onSelect={onSelect} />
    </div>
  );
}
