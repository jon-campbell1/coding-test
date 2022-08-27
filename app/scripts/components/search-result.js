import React from 'react';

const SearchResult = ({ item }) => {
    return (
        <div className="result-item">
            <img src={item.picture}/>
            <div className="price">
                ${item.price}
            </div>
            {item.name}
            <p>
                {item.about}
            </p>
        </div>  
    );
}

export default SearchResult;