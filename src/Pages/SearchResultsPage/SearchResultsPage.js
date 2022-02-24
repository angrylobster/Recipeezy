import React, { useState } from "react";
import RecipeCardMUI from "../../components/RecipeCard/RecipeCardMUI";
import SearchBar from "../../components/SearchBar/SearchBar";

const SearchResults = (props) => {
  const [searchData, setSearchData] = useState();

  return (
    <div>
      <SearchBar setSearchData={setSearchData} />
      <div>
        {searchData ? (
          <>
            <div className="recipe-container">
              {searchData.map((e) => (
                <RecipeCardMUI
                  url={e.recipe.images.REGULAR.url}
                  title={e.recipe.label}
                />
              ))}
              {/* {searchData.map((e) => (
              <RecipeCard
                url={e.recipe.images.REGULAR.url}
                title={e.recipe.label}
              />
            ))} */}
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
