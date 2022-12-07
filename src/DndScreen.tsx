/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import Board from ".//Board";
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchRef
} from "react-zoom-pan-pinch";

import Rightbar from "./Rightbar";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import TileEdit from "./TileEdit";
import tileList from "./images/tileList";
import { tileItem } from "./interfaces";

type screenProps = {
    changeXSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
    changeYSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
    xSize: number;
    ySize: number;
};

const DndScreen: React.FC<screenProps> = (props) => {
    const { xSize, ySize, changeXSize, changeYSize } = props;
    const [tiles, setTiles] = useState<tileItem[]>([]);
    const [scale, setScale] = useState<number>(1);
    const [middleClick, setMiddleClick] = useState<boolean>(false);
    const [selectTile, setSelectTile] = useState<tileItem | null>(null);
    const [sourceTile, setSourceTile] = useState<tileItem[]>(tileList);
    const deleteTile = (index: number) => {
        setTiles(tiles.filter((tile: tileItem): boolean => tile.id !== index));
    };

    const resetMiddle = () => {
        setMiddleClick(false);
    };

    const updateSelectTile = (tile: tileItem) => {
        setSelectTile(tile);
        setMiddleClick(true);
    };

    const changeTile = (tile: tileItem) => {
        if (tile.id < 0) {
            setTiles((oldArray: tileItem[]) => [
                ...oldArray,
                { ...tile, id: oldArray.length }
            ]);
        } else {
            setTiles(
                tiles.map((o: tileItem): tileItem => {
                    if (o.id === tile.id) {
                        return tile;
                    } else {
                        return o;
                    }
                })
            );
        }
    };
    return (
        <div className="dndpage">
            <DndProvider backend={HTML5Backend}>
                <div className="fullgrid">
                    <TransformWrapper
                        wheel={{ activationKeys: ["Shift"] }}
                        panning={{ activationKeys: ["Shift"] }}
                        onZoom={(ref: ReactZoomPanPinchRef) =>
                            setScale(ref.state.scale)
                        }
                    >
                        <TransformComponent>
                            <div
                                className="grid"
                                id="map"
                                style={{
                                    border: "1px solid gray",
                                    width: 80 + "vw",
                                    height: 80 * (ySize / xSize) + "vw"
                                }}
                            >
                                <Board
                                    tile={tiles}
                                    changeTile={changeTile}
                                    x={xSize}
                                    y={ySize}
                                    scale={scale}
                                    updateSelectTile={updateSelectTile}
                                />
                            </div>
                        </TransformComponent>
                    </TransformWrapper>
                </div>
                <div className="rightbar">
                    {(!middleClick && (
                        <Rightbar
                            setSourceTiles={setSourceTile}
                            sourceTiles={sourceTile}
                            deleteTile={deleteTile}
                            updateSelectTile={updateSelectTile}
                            changeXSize={changeXSize}
                            changeYSize={changeYSize}
                            xSize={xSize}
                            ySize={ySize}
                            changeTile={changeTile}
                            tileList={tiles}
                        ></Rightbar>
                    )) ||
                        (middleClick && (
                            <TileEdit
                                tile={selectTile}
                                tileList={tiles}
                                resetMiddle={resetMiddle}
                                changeTile={changeTile}
                            />
                        ))}
                </div>
            </DndProvider>
        </div>
    );
};
export default DndScreen;
