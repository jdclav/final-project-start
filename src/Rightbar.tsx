/* eslint-disable no-extra-parens */
import React from "react";
import DeleteBin from "./DeleteBin";
import ImageDownload from "./ImageDownload";
import { tileItem } from "./interfaces";
import Search from "./Search";
import SortName from "./SortName";
import SortSnap from "./SortSnap";
import tileList from "./images/tileList";
// import History from "./history";

type listProps = {
    setSourceTiles: (newTile: tileItem[]) => void;
    sourceTiles: tileItem[];
    deleteTile: (index: number) => void;
    updateSelectTile: (tile: tileItem) => void;
};

const Rightbar: React.FC<listProps> = (props) => {
    const { setSourceTiles, sourceTiles, deleteTile, updateSelectTile } = props;
    const total = -tileList[35].id;
    const counter = sourceTiles[0].counter;
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
                {/* <History tile={currentTile}></History> */}
                <Search
                    updateSelectTile={updateSelectTile}
                    sourceTiles={sourceTiles}
                ></Search>
                Total tail: {total}
                <p>Total Step: {counter}</p>
            </div>
        </div>
    );
};

export default Rightbar;
