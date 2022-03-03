import React, { useState, useEffect } from "react";
import RecipeCardMUI from "../../components/RecipeCard/RecipeCardMUI";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import "./SearchResultsPage.css";
import key from "weak-key";
import { useLocation, useOutletContext } from "react-router-dom";

const SearchResults = (props) => {
  const [searchData, setSearchData] = useState();

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  return (
    <div>
      <SearchBar />

      <>
        {searchData ? (
          <>
            <div className="recipe-container">
              {searchData.map((recipe) => (
                <RecipeCardMUI
                  // searchdata={searchData}
                  key={key(recipe)}
                  id={key(recipe)}
                  url={recipe.recipe.images.REGULAR.url}
                  title={recipe.recipe.label}
                  ingredients={recipe.recipe.ingredients.map((e) => e.food)}
                  quantity={recipe.recipe.ingredients.map((e) => e.quantity)}
                  measure={recipe.recipe.ingredients.map((e) => e.measure)}
                  protein={recipe.recipe.totalNutrients.PROCNT.quantity}
                  fats={recipe.recipe.totalNutrients.FAT.quantity}
                  carbs={recipe.recipe.totalNutrients.CHOCDF.quantity}
                  calories={recipe.recipe.totalNutrients.ENERC_KCAL.quantity}
                  instructions={recipe.recipe.url}
                  // handleAdd={handleAdd}
                  // handleRemove={handleRemove}
                />
              ))}
            </div>
          </>
        ) : (
          <div></div>
        )}
      </>
    </div>
  );
};

export default SearchResults;

// url: res.data.hits[0].recipe.images.REGULAR.url,
// title: res.data.hits[0].recipe.label,
// ingredients: res.data.hits[0].recipe.ingredients.map((e) => e.food),
// quantity: res.data.hits[0].recipe.ingredients.map((e) => e.quantity),
// measure: res.data.hits[0].recipe.ingredients.map((e) => e.measure),
// protein: res.data.hits[0].recipe.totalNutrients.PROCNT.quantity,
// fats: res.data.hits[0].recipe.totalNutrients.FAT.quantity,
// carbs: res.data.hits[0].recipe.totalNutrients.CHOCDF.quantity,
// calories: res.data.hits[0].recipe.totalNutrients.ENERC_KCAL.quantity,