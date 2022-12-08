/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DeleteBin from "./DeleteBin";
import GridEdit from "./GridEdit";
import ImageDownload from "./ImageDownload";
import { tileItem } from "./interfaces";
import Search from "./Search";
import SortName from "./SortName";
import SortSnap from "./SortSnap";
import tileList from "./images/tileList";
// import History from "./history";

type listProps = {
    updateSourceTile: (newTile: tileItem[]) => void;
    sourceTiles: tileItem[];
    deleteTile: (index: number) => void;
    updateSelectTile: (tile: tileItem) => void;
    changeXSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
    changeYSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
    xSize: number;
    ySize: number;
    changeTile: (tile: tileItem) => void;
    tileList: tileItem[];
};

const Rightbar: React.FC<listProps> = (props) => {
<<<<<<
    const { setSourceTiles, sourceTiles, deleteTile, updateSelectTile } = props;
    const total = tileList.length;
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
                    // updateCounter={updateSelectTile}
                ></Search>
                Total tile: {total}
                <p>Total Step: {counter}</p>
            </div>
=======
    const {
        updateSourceTile,
        sourceTiles,
        deleteTile,
        updateSelectTile,
        changeXSize,
        changeYSize,
        xSize,
        ySize,
        changeTile,
        tileList
    } = props;
    const [gridEdit, setGridEdit] = useState<boolean>(false);
    return (
        <div>
            {gridEdit && (
                <div>
                    <Button
                        className="edit_grid_done"
                        onClick={() => {
                            setGridEdit(false);
                        }}
                    >
                        Done
                    </Button>
                    <GridEdit
                        changeXSize={changeXSize}
                        changeYSize={changeYSize}
                        xSize={xSize}
                        ySize={ySize}
                    />
                </div>
            )}
            {!gridEdit && (
                <div>
                    <ImageDownload />
                    <Button
                        className="edit_grid"
                        onClick={() => {
                            setGridEdit(true);
                        }}
                    >
                        Change Grid Size
                    </Button>
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
                            updatelistTiles={updateSourceTile}
                        ></SortName>
                        <SortSnap
                            buttonName={"Sort by Snap"}
                            listTiles={sourceTiles}
                            updatelistTiles={updateSourceTile}
                        ></SortSnap>
                        <Search
                            updateSelectTile={updateSelectTile}
                            sourceTiles={sourceTiles}
                            changeTile={changeTile}
                            tileList={tileList}
                        ></Search>
                    </div>
                </div>
            )}
>>>>>>
        </div>
    );
};

export default Rightbar;
