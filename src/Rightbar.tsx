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

type listProps = {
    setSourceTiles: (newTile: tileItem[]) => void;
    sourceTiles: tileItem[];
    deleteTile: (index: number) => void;
    updateSelectTile: (tile: tileItem) => void;
    changeXSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
    changeYSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
    xSize: number;
    ySize: number;
};

const Rightbar: React.FC<listProps> = (props) => {
    const {
        setSourceTiles,
        sourceTiles,
        deleteTile,
        updateSelectTile,
        changeXSize,
        changeYSize,
        xSize,
        ySize
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
            )}
        </div>
    );
};

export default Rightbar;
