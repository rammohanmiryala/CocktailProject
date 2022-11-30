import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../../stylesheets/Searchbar.css";

const SearchCard = ({ drinksData }) => {

  

  
  

  return (
    <>
      <div className="drink_card">
        {drinksData.map((drink) => (
          <Card key={drink.idDrink} style={{ width: "16rem", margin: "1.5em" }}>
            <Card.Img
              variant="top"
              src={drink.strDrinkThumb}
              style={{ hight: "20px" }}
            />
            <Card.Body>
              <Card.Title> {drink.strDrink}</Card.Title>
              <Card.Text>
              {drink.strInstructionsIT.slice(0,40)} {/* writing javascript in render */}
              
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
