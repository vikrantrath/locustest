import React from "react";

export default function inputField({ input, setInput }) {
  return (
    <>
      <input
        id="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placholder="Search users by ID, address, pincode, items"
      />
    </>
  );
}
