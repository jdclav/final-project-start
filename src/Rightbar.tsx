/* eslint-disable no-extra-parens */
import React from "react";
import DeleteBin from "./DeleteBin";
import ImageDownload from "./ImageDownload";
import { tileItem } from "./interfaces";
import Search from "./Search";
import SortName from "./SortName";
import SortSnap from "./SortSnap";

type listProps = {
    setSourceTiles: (newTile: tileItem[]) => void;
    sourceTiles: tileItem[];
    deleteTile: (index: number) => void;
    updateSelectTile: (tile: tileItem) => void;
};

const Rightbar: React.FC<listProps> = (props) => {
    const { setSourceTiles, sourceTiles, deleteTile, updateSelectTile } = props;
    return (
        <div>
            <ImageDownload />
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
                <Search
                    updateSelectTile={updateSelectTile}
                    sourceTiles={sourceTiles}
                ></Search>
            </div>
        </div>
    );
};

export default Rightbar;
