import React, { useState } from "react";
import { tileItem } from "./interfaces";
import Pic from "./Pic";
import "./css/Search.css";

type listProps = {
    updateSelectTile: (tile: tileItem) => void;
    sourceTiles: tileItem[];
};
const Search: React.FC<listProps> = (props) => {
    const { updateSelectTile, sourceTiles } = props;
    const [search, setSearch] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            <input type="text" onChange={handleChange} />
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
                                <h3>{sortTile.name}</h3>
                                <Pic
                                    tile={sortTile}
                                    scale={100}
                                    updateSelectTile={updateSelectTile}
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
