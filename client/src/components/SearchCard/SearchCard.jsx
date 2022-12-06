import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../../stylesheets/body.css";

const SearchCard = ({ drinksData }) => {

  return (
    <>
      <div className="drink_card">
        {drinksData.map((drink) => (
          <Card key={drink.idDrink} style={{ width: "15rem", margin: "1em" }}>
            <Card.Img
              variant="top"
              src={drink.strDrinkThumb}
              style={{ hight: "20px" }}
            />
            <Card.Body>
              <Card.Title> {drink.strDrink}</Card.Title>
              <Card.Text>
              {drink.strInstructions.slice(0,30)} {/* writing javascript in render */}
              
              </Card.Text>
              <Link to={`drink/${drink.idDrink}`}>
                <Button variant="primary">More Details</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default SearchCard;
