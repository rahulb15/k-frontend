// Your Search component file
import * as React from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSearchFocus } from 'src/features/searchSlice';
import { Input } from "./Input";

const Search = () => {
    const inputRef = useRef(null);
    const isSearchFocused = useSelector(state => state.search?.isSearchFocused);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSearchFocused && inputRef.current) {
            inputRef.current.focus();
            dispatch(setSearchFocus(false)); // Reset the focus state
        }
    }, [isSearchFocused, dispatch]);

    return (
        <div className="example-container">
            <Input ref={inputRef} />
        </div>
    );
};

export default Search;