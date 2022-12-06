import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Figure from "react-bootstrap/Figure";
import "../../stylesheets/body.css";


import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';

import ReviewsList from "../Reviewslist/Reviewslist"
import ReviewFrom from "../ReviewFrom/ReviewFrom"


// import { QUERY_SINGLE_REVIEW } from '../utils/queries';


function SingleReview() {


  
  const [details, setDetails] = useState([]);

  const [value, setValue] = React.useState(2);

  let { id } = useParams(); // use the use params we are taking the id of the drink from url and fetching the data with another url
  const singleDrink = async () => {
    var requestUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setDetails(data.drinks);





        
      });
  };

  useEffect(() => {
    singleDrink({ id }); // use effect is to run the function with the parameter
  });

  const divStyle = {
    display: "none",
  };

  return (
    <>
      <div>
        {details.map((drink) => (
          <Container className="section_top_margin">
            <Row>
              {/* left section ------------------------------------------------*/}
              <Col xs={6} lg={6} className="image_center border">
                <Figure>
                  <Figure.Image
                    width={500}
                    height={180}
                    className="rounded mx-auto d-block "
                    alt="171x180"
                    src={drink.strDrinkThumb}
                  />
                  <Figure.Caption>
                    <b>Category</b>: {drink.strCategory}
                  </Figure.Caption>
                </Figure>
              </Col>
              {/* right section ------------------------------------------------*/}
              <Col xs={6} lg={6} className="justify-content-md-start border">
                <h1>{drink.strDrink}</h1>
          
                <p>
                  <b>Category</b>: {drink.strCategory}
                </p>

                <article>
                  <h5>
                    <b>Instructions</b>
                  </h5>
                  <p style={{ paddingLeft: "10px" }}>{drink.strInstructions}</p>
                </article>

                <h5>
                  <b>Ingredient</b>
                </h5>
                <Row style={{ paddingLeft: "10px" }}>
                  <Col>
                    {drink.strIngredient1 === null ? (
                      <p style={divStyle}></p>
                    ) : (
                      <p
                        className="Ingredient_table"
                        style={{ backgroundColor: "#96db20" }}
                      >
                        {drink.strIngredient1}
                      </p>
                    )}
                  </Col>

                  <Col>
                    {drink.strIngredient2 === null ? (
                      <p style={divStyle}></p>
                    ) : (
                      <p
                        className="Ingredient_table"
                        style={{ backgroundColor: "#f59595" }}
                      >
                        {drink.strIngredient2}
                      </p>
                    )}
                  </Col>
                  <Col>
                    {drink.strIngredient3 === null ? (
                      <p style={divStyle}></p>
                    ) : (
                      <p
                        className="Ingredient_table"
                        style={{ backgroundColor: "#10ddba" }}
                      >
                        {drink.strIngredient3}
                      </p>
                    )}
                  </Col>
                  <Col>
                    {drink.strIngredient4 === null ? (
                      <p style={divStyle}></p>
                    ) : (
                      <p
                        className="Ingredient_table"
                        style={{ backgroundColor: "#a7f0d4" }}
                      >
                        {drink.strIngredient4}
                      </p>
                    )}
                  </Col>
                  <Col>
                    {drink.strIngredient5 === null ? (
                      <p style={divStyle}></p>
                    ) : (
                      <p
                        className="Ingredient_table"
                        style={{ backgroundColor: "#ce969b" }}
                      >
                        {drink.strIngredient5}
                      </p>
                    )}
                  </Col>
                  <Col>
                    {drink.strIngredient6 === null ? (
                      <p style={divStyle}></p>
                    ) : (
                      <p
                        className="Ingredient_table"
                        style={{ backgroundColor: "#b8dab0" }}
                      >
                        {drink.strIngredient6}
                      </p>
                    )}
                  </Col>
                  <Col>
                    {drink.strIngredient7 === null ? (
                      <p style={divStyle}></p>
                    ) : (
                      <p
                        className="Ingredient_table"
                        style={{ backgroundColor: "#d8d0db" }}
                      >
                        {drink.strIngredient7}
                      </p>
                    )}
                  </Col>
                  <Col>
                    {drink.strIngredient8 === null ? (
                      <p style={divStyle}></p>
                    ) : (
                      <p
                        className="Ingredient_table"
                        style={{ backgroundColor: "#edbe51" }}
                      >
                        {drink.strIngredient8}
                      </p>
                    )}
                  </Col>
                  <Col>
                    {drink.strIngredient9 === null ? (
                      <p style={divStyle}></p>
                    ) : (
                      <p
                        className="Ingredient_table"
                        style={{ backgroundColor: "#33efec" }}
                      >
                        {drink.strIngredient9}
                      </p>
                    )}
                  </Col>
                  <Col>
                    {drink.strIngredient10 === null ? (
                      <p style={divStyle}></p>
                    ) : (
                      <p
                        className="Ingredient_table"
                        style={{ backgroundColor: "#ce9ef1" }}
                      >
                        {drink.strIngredient10}
                      </p>
                    )}
                  </Col>
                  <Col>
                    {drink.strIngredient11 === null ? (
                      <p style={divStyle}></p>
                    ) : (
                      <p
                        className="Ingredient_table"
                        style={{ backgroundColor: "#fb2c97" }}
                      >
                        {drink.strIngredient11}
                      </p>
                    )}
                  </Col>
                </Row>
                <ReviewFrom/>
              </Col>
              <Col lg={6} className=" border">
               <ReviewsList/>
              </Col>
            </Row>
          </Container>
        ))}
      </div>
    </>
  );
}

export default SingleReview;
