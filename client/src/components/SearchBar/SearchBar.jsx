import React, { useState, useEffect } from "react";
import "../../stylesheets/Searchbar.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SearchCard from "../SearchCard/SearchCard";
import SingleReview from "../SingleReview/SingleReview";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [drinksData, setDrinksData] = useState([]);

  const SearchDrinks = async (e) => {
    e.preventDefault();
    console.log(query);

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`;
    console.log(url);
    try {
      const res = await fetch(url); // fetching the search
      const data = await res.json(); // covering the result to json format

      setDrinksData(data.drinks); //setting data to the drinksData
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row  xs={12} lg={12} className="search-bar-center justify-content-md-center">
        <Form  className="d-flex bg_color ">
          <Form.Control 
            type="search"
            name="query"
            placeholder="Search For a cocktail"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
          <button
            variant="outline-success"
            onClick={SearchDrinks}
            type="submit"
            className="search"
          >
            Search
          </button>
        </Form>
      </Row>
      <SearchCard drinksData={drinksData} />
      
    </>
  );
};

export default SearchBar;
