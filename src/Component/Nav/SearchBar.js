import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("http://localhost:5080/api/v1/doctor").then((res) => res.json())
  );
  if (isLoading) {
    return (
      <>
        <input
          type="text"
          id="search-input"
          className="serach-input"
          placeholder="Search"
        />
        <i className="fas fa-search search-icon icon"></i>
      </>
    );
  }
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name?.toLowerCase().includes(searchWord?.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <>
      <input
        type="text"
        id="search-input"
        className="serach-input"
        value={wordEntered}
        placeholder="Search"
        onChange={handleFilter}
      />
      <i className="fas fa-search search-icon icon"></i>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((el, ind) => (
            <Link key={el._id} to={`/doctor/${el?.slug}`}>
              <p>
                {el?.name} <br />
                <span>{el.tobTitle}</span>
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
