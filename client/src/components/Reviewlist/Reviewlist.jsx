import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ReviewList = ({ reviewData }) => {
  // console.log(reviewData);
  // console.log(reviewData.drink.reviews[0].reviewText);
  // console.log(reviewData.drink.reviews[0].reviewAuthor);

  
  return (
    <>
      <div>
        {reviewData.drink.reviews.map((content) => (
          <Card>
            <Card.Header>Posted by : {content.reviewAuthor} </Card.Header>
            <Card.Body>
              <Card.Title>Posted Date : {content.createdAt}</Card.Title>
              <Card.Text>{content.reviewText}</Card.Text>
              <Button variant="danger">Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ReviewList;
