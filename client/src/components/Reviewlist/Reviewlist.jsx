import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const ReviewsList = ({ reviewData }) => {
  console.log(reviewData);

  if (reviewData.drink == null) {
    return <h1>no reviews</h1>;
  }

  return (
    <>
      <Col lg={8}>
        {reviewData.drink.reviews &&
          reviewData.drink.reviews.map((element) => (
            <Card>
              <Card.Header>Posted by : {element.reviewAuthor} </Card.Header>
              <Card.Body>
                <Card.Title>Posted Date : {element.createdAt}</Card.Title>
                <Card.Text>{element.reviewText}</Card.Text>
                <Button variant="danger">Delete</Button>
              </Card.Body>
            </Card>
          ))}
      </Col>
    </>
  );
};

export default ReviewsList;

// console.log(reviewData);
// console.log(reviewData.drink.reviews[0].reviewText);
// console.log(reviewData.drink.reviews[0].reviewAuthor);
