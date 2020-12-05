import React from "react";
import SearchResultItem from "./searchResultItem";

export default function searchResultList({
  listOfItems,
  searchTerm,
  selectedIndex,
  setSelectedIndex,
  setIndexOnKeyPress,
  resetIndex,
}) {
  return (
    <ul className="res_list">
      {listOfItems.map((item, index) => (
        <SearchResultItem
          {...item}
          index={index}
          searchTerm={searchTerm}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setIndexOnKeyPress={setIndexOnKeyPress}
          resetIndex={resetIndex}
        />
      ))}
    </ul>
  );
}
