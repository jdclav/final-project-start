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
import "./css/DndScreen.css";

type screenProps = {
    xSize: number;
    ySize: number;
};

const DndScreen: React.FC<screenProps> = (props) => {
    const { xSize, ySize } = props;
    const [tiles, setTiles] = useState<tileItem[]>([]);
    const [scale, setScale] = useState<number>(1);
    const [middleClick, setMiddleClick] = useState<boolean>(false);
    const [selectTile, setSelectTile] = useState<tileItem | null>(null);
    const [sourceTile, setSourceTile] = useState<tileItem[]>(tileList);
    // const [setCounter] = useState<number | null>(selectTile.counter)

    const deleteTile = (index: number) => {
        setTiles(tiles.filter((tile: tileItem): boolean => tile.id !== index));
    };

    const updateSourceTile = (tile: tileItem[]) => {
        setSourceTile(tile);
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

    // const updateCounter = (tile: tileItem) => {};

    const totalImg = tiles.length;

    // const updateCounter = (tile: tileItem) => {
    //     sourceTile.map(
    //         (o: tileItem): tileItem =>
    //             o.src === tile.src ? { ...o, counter: o.counter + 1 } : o
    //     );
    // };

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
                        <div className="totalImg">Total Drop: {totalImg}</div>
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
                    {/* New tile :{updateCounter} */}
                    {/* {sourceTile.map((tile: tileItem): number => tile.counter)} */}
                    {(!middleClick && (
                        <Rightbar
                            setSourceTiles={setSourceTile}
                            sourceTiles={sourceTile}
                            deleteTile={deleteTile}
                            updateSelectTile={updateSelectTile}
                        ></Rightbar>
                    )) ||
                        (middleClick && (
                            <TileEdit
                                tile={selectTile}
                                tileList={tiles}
                                resetMiddle={resetMiddle}
                                changeTile={changeTile}
                                sourceTile={sourceTile}
                                updateSourceTile={updateSourceTile}
                            />
                        ))}
                </div>
            </DndProvider>
        </div>
    );
};
export default DndScreen;
