import React from "react";
import InputField from "./components/inputField";
import NoInputCard from "./components/noInputCard";
import SearchResultList from "./components/searchResultList";
import { data } from "./data.js";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [selectedIndex, setIndexSelected] = React.useState(-1);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (searchTerm) {
      const resData = data.filter((ele) =>
        JSON.stringify(ele).includes(searchTerm)
      );
      setSearchResult(resData);
      setIndexSelected(-1);
    }
  }, [searchTerm]);

  function setSelectedIndex(index, event) {
    if (event.clientX != mousePosition.x && event.clientY != mousePosition.y) {
      document.getElementById(`item_${index}`).tabIndex = "-1";
      document.getElementById(`item_${index}`).focus();
      setIndexSelected(index);
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  }

  function resetIndex(event) {
    if (event.clientX != mousePosition.x && event.clientY != mousePosition.y) {
      setIndexSelected(-1);
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function setIndexOnKeyPress(event) {
    event.persist();
    if (event.keyCode == 40 && searchResult.length > 0) {
      if (selectedIndex + 1 > searchResult.length - 1) {
        setIndexSelected(0);
        if (!isInViewport(document.querySelector(`#item_0`))) {
          document.querySelector(`#item_0`).scrollIntoView();
        }
      } else {
        setIndexSelected(selectedIndex + 1);
        if (
          !isInViewport(document.querySelector(`#item_${selectedIndex + 1}`))
        ) {
          document.querySelector(`#item_${selectedIndex + 1}`).scrollIntoView();
        }
      }
    }

    if (event.keyCode == 38 && searchResult.length > 0) {
      if (selectedIndex - 1 < 0) {
        document
          .querySelector(`#item_${searchResult.length - 1}`)
          .scrollIntoView();
        setIndexSelected(searchResult.length - 1);
      } else {
        setIndexSelected(selectedIndex - 1);
        if (
          !isInViewport(document.querySelector(`#item_${selectedIndex - 1}`))
        ) {
          document.querySelector(`#item_${selectedIndex - 1}`).scrollIntoView();
        }
      }
    }
  }

  console.log(selectedIndex);
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
            resetIndex={resetIndex}
            setIndexOnKeyPress={setIndexOnKeyPress}
          />
        ))}
    </div>
  );
}

export default App;
