import React from "react";
import InputField from "./components/inputField";
import NoInputCard from "./components/noInputCard";
import SearchResultList from "./components/searchResultList";
import { data } from "./data.js";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  React.useEffect(() => {
    if (searchTerm) {
      const resData = data.filter((ele) =>
        JSON.stringify(ele).includes(searchTerm)
      );
      setSearchResult(resData);
      setSelectedIndex(-1);
    }
  }, [searchTerm]);

  function setIndexOnKeyPress(event) {
    event.persist();
    if (event.keyCode == 40 && searchResult.length > 0) {
      if (selectedIndex + 1 > searchResult.length - 1) {
        setSelectedIndex(0);
        document.querySelector(".res_list").scrollTop = 0;
      } else {
        setSelectedIndex(selectedIndex + 1);
        document.querySelector(".res_list").scrollBy(0, 100)
      }
    }

    if (event.keyCode == 38 && searchResult.length > 0) {
      if (selectedIndex - 1 < 0) {
        setSelectedIndex(searchResult.length - 1);
        document.querySelector(".res_list").scrollTop = 100*(searchResult.length - 1);
      } else {
        setSelectedIndex( selectedIndex - 1);
        document.querySelector(".res_list").scrollBy(0, -100)
      }
      // setSelectedIndex(
      //   selectedIndex - 1 < 0 ? searchResult.length - 1 : selectedIndex - 1
      // );
    }
  }

  return (
    <div className="App">
      <div>
        <InputField
          input={searchTerm}
          setInput={setSearchTerm}
          setIndexOnKeyPress={setIndexOnKeyPress}
        />
      </div>
      {searchTerm &&
        (searchResult.length === 0 ? (
          <NoInputCard />
        ) : (
          <SearchResultList
            listOfItems={searchResult}
            searchTerm={searchTerm}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        ))}
    </div>
  );
}

export default App;
