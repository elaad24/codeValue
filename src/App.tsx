import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ItemsSection, { productInterface } from "./components/ItemsSection";
import text from "./text.json";
import mockdata from "./mockData.json";
import usePagination from "./hooks/usePagination";
import { nGramSearch } from "./utils/ngram";
import EditItemSection from "./components/EdithItemSection";
import { useDispatch, useSelector } from "react-redux";
import { init, updateProducts } from "./redux/slices/productSlice";
import { RootState } from "./redux/store";
import AddItemSection from "./components/AddItemSection";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  const fullData = mockdata;
  const [data, setdata] = useState<productInterface[]>(products || []);
  const [editItemOpen, setEditItemOpen] = useState<boolean>(false);
  const [itemToOpen, setItemToOpen] = useState<productInterface | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");
  const [createItem, setCreateItem] = useState<boolean>(false);
  const {
    currentItems,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination({
    data: data,
    itemsPerPage: 4,
  });

  useEffect(() => {
    dispatch(init(fullData));
  }, []);
  useEffect(() => {
    if (products) {
      setdata(products);
    }
  }, [products]);

  useEffect(() => {
    if (data.length) {
      if (searchText !== "") {
        dispatch(updateProducts(nGramSearch(fullData, searchText)));
      } else {
        dispatch(updateProducts(fullData));
      }

      if (filterBy === "") {
        dispatch(updateProducts([...data].sort((a, b) => a.ID - b.ID)));
      } else if (filterBy === text.name) {
        dispatch(
          updateProducts([
            ...[...data].sort((a, b) => {
              const valueA = a.name.toLowerCase();
              const valueB = b.name.toLowerCase();

              if (valueA < valueB) {
                return -1;
              } else return 0;
            }),
          ])
        );
      } else if (filterBy === text.reacentAdded) {
        dispatch(
          updateProducts([
            ...[...data].sort((a, b) => {
              const dateA = new Date(a.creationDate);
              const dateB = new Date(b.creationDate);

              return dateA.getTime() - dateB.getTime();
            }),
          ])
        );
      }

      goToPage(1);
      setEditItemOpen(false);
      setItemToOpen(null);
    }
  }, [filterBy, searchText]);

  return (
    <div className="app">
      <>
        <Navbar />
        <div className="sections">
          <div>
            <ItemsSection
              setEditItemOpen={() => setEditItemOpen(true)}
              setItemToOpen={setItemToOpen}
              products={currentItems}
              onSearch={setSearchText}
              onSelect={setFilterBy}
              additem={() => setCreateItem(true)}
            />
            <div className="pagination">
              <button
                className="Btn"
                onClick={prevPage}
                disabled={currentPage === 1}
                style={currentPage === 1 ? { cursor: "not-allowed" } : {}}
              >
                {text.prevPage}
              </button>
              <div className="txt">
                {currentPage} {text.of} {totalPages}
              </div>
              <button
                className="Btn"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                style={
                  currentPage === totalPages ? { cursor: "not-allowed" } : {}
                }
              >
                {text.nextPage}
              </button>
            </div>
          </div>

          <div>
            {editItemOpen && itemToOpen !== null && createItem === false && (
              <EditItemSection
                onClose={() => setEditItemOpen(false)}
                ID={itemToOpen.ID}
                name={itemToOpen.name}
                description={itemToOpen.description}
                price={itemToOpen.price}
                creationDate={itemToOpen.creationDate}
                img={itemToOpen.img}
              />
            )}
            {editItemOpen == false && createItem === true && (
              <AddItemSection
                onClose={() => setCreateItem(false)}
                ID={0}
                name={""}
                description={""}
                price={1}
                creationDate={""}
                img={""}
              />
            )}
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
