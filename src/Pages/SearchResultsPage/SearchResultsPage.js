import React, { useState, useEffect, useContext } from "react";
import RecipeCardBSAdd from "../../components/RecipeCard/RecipeCardBSAdd";
import { Col, Row } from "react-bootstrap";
import SearchBarBS from "../../components/SearchBar/SearchBarBS";
import axios from "axios";
// import "./SearchResultsPage.css";
import styles from "./SearchResultsPage.module.css";
import key from "weak-key";
import { useLocation } from "react-router-dom";
import { BackgroundStylesContext } from '../../contexts/BackgroundStylesContext';

const SearchResults = (props) => {
  const [searchData, setSearchData] = useState();
  const { backgroundStyles, setBackgroundStyles } = useContext(BackgroundStylesContext);

  //TO GET PARAMS FROM URL
  const location = useLocation(); // to check if url is updated
  const params = new URLSearchParams(window.location.search);
  const q = params.get("search");

  //const [individualRecipe, setIndividualRecipe] = useState({});
  //SHOW DETAILS OF INDIVIDUAL RECIPE
  // const handleShow = (item) => {
  //   setIndividualRecipe(item);
  // };

  //AXIOS CALL
  const appId = "e07457e3";
  const appKey = "126c04352c3086f78d428c7ce21556d0";
  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${appId}&app_key=${appKey}`
      )
      .then((res) => {
        setSearchData(res.data.hits);
        if (backgroundStyles?.opacity !== '50%') {
          setBackgroundStyles({
            ...backgroundStyles,
            opacity: '50%',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location, backgroundStyles, setBackgroundStyles, q]);
  console.log(styles.altbackground);
  return (
    <div>
      <SearchBarBS />
      <div className="altbackground">
        <div className="cardRow" style={{ position: "relative", top: "5px" }}>
          <Row xs={1} md={3} lg={4} className="g-3">
            {searchData ? (
              <>
                {searchData.map((recipe, index) => (
                  <Col key={index}>
                    <RecipeCardBSAdd
                      // searchdata={searchData}
                      key={key(recipe)}
                      id={key(recipe)}
                      url={recipe.recipe.images.REGULAR.url}
                      title={recipe.recipe.label}
                      ingredients={recipe.recipe.ingredients.map((e) => e.food)}
                      quantity={recipe.recipe.ingredients.map(
                        (e) => e.quantity
                      )}
                      measure={recipe.recipe.ingredients.map((e) => e.measure)}
                      protein={recipe.recipe.totalNutrients.PROCNT.quantity}
                      fats={recipe.recipe.totalNutrients.FAT.quantity}
                      carbs={recipe.recipe.totalNutrients.CHOCDF.quantity}
                      calories={
                        recipe.recipe.totalNutrients.ENERC_KCAL.quantity
                      }
                      ingredientLines={recipe.recipe.ingredientLines}
                      instructions={recipe.recipe.url}
                    />
                  </Col>
                ))}
              </>
            ) : (
              <div></div>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
