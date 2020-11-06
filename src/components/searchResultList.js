import React from "react";
import SearchResultItem from "./searchResultItem";

export default function searchResultList({
  listOfItems,
  searchTerm,
  selectedIndex,
  setSelectedIndex,
  setIndexOnKeyPress,
}) {
  return (
    <ul className="res_list" onKeyDown={setIndexOnKeyPress} tabIndex="0">
      {listOfItems.map((item, index) => (
        <SearchResultItem
          {...item}
          index={index}
          searchTerm={searchTerm}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      ))}
    </ul>
  );
}
