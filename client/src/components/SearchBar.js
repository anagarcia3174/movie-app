import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import axios from "../services/axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [offCanvasShow, setOffCanvasShow] = useState(false);
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setOffCanvasShow(false);
  const handleShow = () => setOffCanvasShow(true);

  const searchMovie = async (e) => {
    setLoading(true);
    e.preventDefault();
    const keyword = input;

    try {
      const request = await axios.get(`/search?keyword=${keyword}`);
      setSearchResults(request.data);
      handleShow();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setSearchResults([]);
    }
  };

  return (
    <>
      <Form
        onSubmit={(e) => searchMovie(e)}
        className="d-flex justify-content-center align-items-center mt-2"
      >
        <Form.Control
          placeholder="Search"
          className=""
          style={{maxWidth: '200px'}}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="outline-secondary">
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <FaSearch size={19} />
          )}
        </Button>
      </Form>
      <Offcanvas
        data-bs-theme="dark"
        show={offCanvasShow}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search Results</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {searchResults.length === 0 ? (
              <h2>No Movies Found</h2>
            ) : (
              searchResults.map((result) => (
                <ListGroup.Item
                  onClick={() => navigate(`/movie/${result.id}`)}
                  key={result.id}
                  className="d-flex flex-row m-2 border-0 rounded"
                  action
                >
                  {result.poster_path ? (
                    <Image
                      className="mx-2 w-25"
                      src={`${baseUrl}${result?.poster_path}`}
                    ></Image>
                  ) : (
                    <></>
                  )}
                  <div>
                    <h5>
                      {result?.title || result?.name || result?.original_title}
                    </h5>
                    <h6>
                      {result?.release_date
                        ? result.release_date.slice(0, 4)
                        : ""}
                    </h6>
                  </div>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SearchBar;
