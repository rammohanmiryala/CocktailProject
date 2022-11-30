import React, { useState, useEffect } from "react";
// Import the `useParams()` hook from React Router
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Figure from "react-bootstrap/Figure";
import ListGroup from "react-bootstrap/ListGroup";
import "../../stylesheets/body.css";

// material UI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

function SingleReview() {
  const [details, setDetails] = useState([]);
  const [filter, setfilter] = useState([]);

  const [value, setValue] = React.useState(2);
  let { id } = useParams(); // use the use params we are taking the id of the drink from url and fetching the data with another url




  const singleDrink = async ()=>{
    var requestUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Fetch Response \n-------------');
      console.log(data);
        setDetails(data.drinks);
        setfilter(data.drinks);
    });

  }
  useEffect(() => {
    singleDrink({ id }); // use effect is to run the function with the parameter
  });

  return (
    <>
      <div>
        {details.map((drink) => (
          <Container>
            <Row className="justify-content-md-around">
              <Col xs={6} lg={6}>
                <Figure>
                  <Figure.Image
                    width={500}
                    height={180}
                    className="rounded mx-auto d-block"
                    alt="171x180"
                    src={drink.strDrinkThumb}
                  />
                  <Figure.Caption>
                    <b>Category</b>: {drink.strCategory}
                  </Figure.Caption>
                </Figure>
                {/* <Card.Img variant="top" src={drink.strDrinkThumb} /> */}
              </Col>
              <Col xs={6} lg={6}>
                <h1>{drink.strDrink}</h1>
                <Box
                  sx={{
                    "& > legend": { mt: 2 },
                  }}
                >
                  <Rating
                    name="simple-controlled"
                    value={null}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
                <p>
                  <b>Category</b>: {drink.strCategory}
                </p>
                <ListGroup variant="flush">
                  <h4>Instructions</h4>
                  <p>{drink.strInstructions}</p>
                </ListGroup>
                <Row variant="flush">
                  <h4>Ingredient</h4>
                  <Col className="Ingredient_table">{drink.strIngredient1}</Col>

                  <Col className="Ingredient_table">{drink.strIngredient2}</Col>

                  {/* <Col className="Ingredient_table">{drink.strIngredient3}</Col>

                  <Col className="Ingredient_table">{drink.strIngredient4}</Col>

                  <Col className="Ingredient_table">{drink.strIngredient5}</Col> */}
                </Row>
              </Col>
            </Row>

            <h3>Review</h3>
          </Container>
        ))}
      </div>
    </>
  );
}

export default SingleReview;
