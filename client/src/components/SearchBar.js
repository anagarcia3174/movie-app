import React, { useState } from 'react'
import  Button  from 'react-bootstrap/Button'
import { FaSearch } from "react-icons/fa";
import Form from 'react-bootstrap/Form'
import axios from '../services/axios'

const SearchBar = () => {

    const [input, setInput] = useState("");

    const searchMovie = async (e) => {
        e.preventDefault();
        const keyword = input;

        try{
            const request = await axios.get(`/search?keyword=${keyword}`)
            console.log(request.data)
        }catch(e){
            console.log(e);
        }
    }

  return (
    <>
    <Form onSubmit={(e) => searchMovie(e)} className="d-flex justify-content-center flex-grow-1">
            <Form.Control 
                placeholder='Search' 
                className='w-25'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button type='submit' variant="outline-secondary">
                <FaSearch size={19} />
            </Button>
        </Form>
        
    </>
  )
}

export default SearchBar