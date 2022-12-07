import React, { useState } from "react";
import { tileItem } from "./interfaces";
import Pic from "./Pic";
import { Form } from "react-bootstrap";
import "./css/Search.css";

type listProps = {
    updateSelectTile: (tile: tileItem) => void;
    sourceTiles: tileItem[];
    changeTile: (tile: tileItem) => void;
};
const Search: React.FC<listProps> = (props) => {
    const { updateSelectTile, sourceTiles, changeTile } = props;
    const [search, setSearch] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            <Form.Group className="search" controlId="searchbar">
                <Form.Control
                    value={search}
                    onChange={handleChange}
                    type="text"
                    placeholder="Search..."
                />
            </Form.Group>
            <div className="list">
                {sourceTiles.map((sortTile: tileItem, key: number) => {
                    if (
                        search === "" ||
                        sortTile.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    ) {
                        return (
                            <div
                                key={key}
                                style={{
                                    display: "inline-block",
                                    width: "50%"
                                }}
                            >
                                <p>{sortTile.name}</p>
                                <Pic
                                    tile={sortTile}
                                    scale={100}
                                    updateSelectTile={updateSelectTile}
                                    changeTile={changeTile}
                                />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Search;
