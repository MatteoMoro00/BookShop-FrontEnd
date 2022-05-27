import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncGenres } from "../../store/genreSlice";
import { bookActions, advancedSearchBooks } from '../../store/bookSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';

const DropdownGenre = () => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres.genres);
    const searchGenreConfig = useSelector((state) => state.books.searchResult);

    useEffect(() => {                 
        dispatch(fetchAsyncGenres());
    }, [dispatch]);

    return (
        <DropdownButton variant='none' id="dropdown-item-button" title="GENRE">
            <Dropdown.ItemText>Select a genre</Dropdown.ItemText>
            {genres.map(genre => {
                return (
                    <Dropdown.Item as="button" key={genre.id} value={genre.genreName} onClick={(event) => {
                        var newConfig = {...searchGenreConfig, "genreName": event.target.value};
                        dispatch(bookActions.setParams(newConfig));
                        dispatch(advancedSearchBooks(newConfig));
                    }}>
                    {genre.genreName}
                    </Dropdown.Item>
                )
            })}
        </DropdownButton>
    )
}

export default DropdownGenre;