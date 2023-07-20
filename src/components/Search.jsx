import React, { useState } from "react";
import { RingLoader } from "react-spinners";
const Search = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSearch(val);
  };

  const url = "https://www.googleapis.com/books/v1/volumes?q=";
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (search === "") {
        console.log("Please enter a book title");
        const title = "Please enter a book title";
        return <h3>{title}</h3>;
      } else {
        setIsLoading(true);
        const response = await fetch(url + search);
        const data = await response.json();
        //I could also use setData ([data, setData]) to set the data and render it in the return block
        const resData = data.items;
        setIsLoading(false);
        setData(resData);
        setSearch("");
      }
    } catch (error) {
      console.log("An error occured" + error);
    }
    // console.log(resData);
    // console.log(resData[5].volumeInfo.description.length);
  };

  return (
    <div>
      <form className="form-label-group">
        <input
          type="text"
          id="text"
          className="form-control shadow-none text-center;"
          placeholder="Search..."
          onChange={handleSearch}
          value={search}
        />
        <button
          onClick={handleClick}
          className="search-btn btn rounded-end-circle border border-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </form>
      <div></div>
      <div className="content">
        {isLoading ? (
          <RingLoader className="spinner" color="#3498db" />
        ) : (
          data &&
          data.map((items) => (
            <div key={items.id} className="card" style={{ width: "18rem" }}>
              <img
                src={
                  items.volumeInfo.imageLinks
                    ? items.volumeInfo.imageLinks.thumbnail
                    : "/src/assets/img1.jpg"
                }
                loading="lazy"
                className="card-img-top"
                alt={items.volumeInfo.title}
              />
              <div className="card-body">
                <h5 className="card-title">{items.volumeInfo.title}</h5>
                <p className="card-text">
                  {/* {items.volumeInfo.description.length > 150
                    ? items.volumeInfo.description.substring(0, 250) + "..."
                    : items.volumeInfo.description} */}
                  {/* {items.volumeInfo} */}
                </p>
                <a
                  href={items.volumeInfo.previewLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  Read More
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
// {
//   data && ( data.items.map((items) => (
//     <div key={items.id}  className="card" style={{width: "18rem"}}>
//     <img src="" className="card-img-top" alt="..."/>
//     <div className="card-body">
//       <h5 className="card-title">Card title</h5>
//       <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
//       <a href="#" className="btn btn-primary">Go somewhere</a>
//     </div>

//   </div>
//   )

//   ))
// }
// JSON.stringify(items.volumeInfo.description.stringify)
//                       .length >
{
  /* <RingLoader color="#36d7b7" /> */
}
