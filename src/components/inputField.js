import React from "react";

export default function inputField({ input, setInput, setIndexOnKeyPress }) {
  return (
    <>
      <input
        id="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search users by ID, address, pincode, items"
        onKeyDown={setIndexOnKeyPress}
      />
    </>
  );
}
