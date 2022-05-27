import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncAuthors } from "../../store/authorSlice";
import { searchBooksByAuthorId } from '../../store/bookSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { FormControl } from 'react-bootstrap';

const DropdownAuthors = () => {
    const dispatch = useDispatch();
    const authors = useSelector((state) => state.authors.authors);

    useEffect(() => {                
        dispatch(fetchAsyncAuthors());
    }, [dispatch]);

    const handleSearch = id => {
        dispatch(searchBooksByAuthorId(id));
    };

    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        >
        {children}
        &#x25be;
        </a>   
    ));
    
    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');

            return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <FormControl
                autoFocus
                className="mx-3 my-2 w-auto"
                placeholder="Type to filter..."
                onChange={(e) => setValue(e.target.value)}
                value={value}
                />
                <ul className="list-unstyled" style={{ display: 'block' }}>
                {React.Children.toArray(children).filter(
                    (child) =>
                    !value || child.props.children.toLowerCase().includes(value),
                )}
                </ul>
            </div>
            );
        },
    );

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">AUTHORS</Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
            {authors.map(author => {
                return (
                    <Dropdown.Item eventKey="2" key={author.id} id={author.id} value={author.lastName} data={author.lastName} 
                        onClick={ (event) => {
                            handleSearch(event.target.id);
                        } }>
                        {author.firstName + " " + author.lastName}
                    </Dropdown.Item>
                )
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownAuthors;

