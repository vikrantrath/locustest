import React from "react";

export default function searchResultItem({
  id,
  name,
  items,
  address,
  pincode,
  index,
  searchTerm,
  selectedIndex,
  setSelectedIndex,
}) {
  function getHighlightedText(text, searchTerm) {
    if (text.length > 45) {
      text = text.substring(0, 45).concat("...");
    }
    return text.replaceAll(
      searchTerm,
      `<span style="color:blue">${searchTerm}</span>`
    );
  }

  function checkItemsContainsTerm(items, searchTerm) {
    return items.some((e) => e.includes(searchTerm));
  }

  console.log(selectedIndex);

  return (
    <div
      className={
        selectedIndex == index ? "res_item highlighted_item" : "res_item"
      }
      onMouseEnter={() => setSelectedIndex(index)}
      onMouseLeave={() => setSelectedIndex(-1)}
    >
      <div
        className="res_item_id"
        dangerouslySetInnerHTML={{ __html: getHighlightedText(id, searchTerm) }}
      />
      <div
        className="res_item_name"
        dangerouslySetInnerHTML={{
          __html: getHighlightedText(name, searchTerm),
        }}
      />
      {checkItemsContainsTerm(items, searchTerm) && (
        <div className="res_item_itemfound">
          {`"${searchTerm}" found in items`}{" "}
        </div>
      )}
      <div
        className="res_item_address"
        dangerouslySetInnerHTML={{
          __html: getHighlightedText(`${address} ${pincode}`, searchTerm),
        }}
      />
    </div>
  );
}