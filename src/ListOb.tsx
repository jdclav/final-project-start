/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import DeleteBin from "./DeleteBin";
import { tileItem } from "./interfaces";
import Pic from "./Pic";
import SortName from "./SortName";
import SortSnap from "./SortSnap";

type listProps = {
    setSourceTiles: (newTile: tileItem[]) => void;
    sourceTiles: tileItem[];
    deleteTile: (index: number) => void;
    updateSelectTile: (tile: tileItem) => void;
};

const ListOb: React.FC<listProps> = (props) => {
    const { setSourceTiles, sourceTiles, deleteTile, updateSelectTile } = props;
    const [search, setSearch] = useState<string>("");
    const handleChange = (e: { target: { value: string } }) => {
        setSearch(e.target.value);
    };
    return (
        <div>
            <div
                style={{
                    display: "inline-block",
                    width: "100%",
                    height: "10vw"
                }}
            >
                <DeleteBin deleteTile={deleteTile} />
            </div>
            <div>
                <SortName
                    buttonName={"Sort by Name"}
                    listTiles={sourceTiles}
                    updatelistTiles={setSourceTiles}
                ></SortName>
                <SortSnap
                    buttonName={"Sort by Snap"}
                    listTiles={sourceTiles}
                    updatelistTiles={setSourceTiles}
                ></SortSnap>
            </div>
            <div>
                <input type="text" onChange={handleChange} />
                {sourceTiles.map((sortTile) => {
                    if (
                        search === "" ||
                        sortTile.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    ) {
                        return (
                            <div
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

export default ListOb;
