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
import CountTimer from "./Timer";

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
    const [oldTile, setOldTile] = useState<tileItem[]>([]);

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
            let lowestId = -1;
            const tileCopy = [...tiles];
            tileCopy.sort((a, b) => (a.id > b.id ? 1 : -1));
            for (let i = 0; i < tiles.length; ++i) {
                if (tileCopy[i].id !== i) {
                    lowestId = i;
                    break;
                }
            }
            if (lowestId === -1) {
                lowestId = tiles.length;
            }

            setTiles((oldArray: tileItem[]) => [
                ...oldArray,
                { ...tile, id: lowestId }
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

    const totalImg = tiles.length;

    const updateCounter = (tile: tileItem) => {
        if (oldTile.length > tiles.length || oldTile.length === tiles.length) {
            return sourceTile;
        } else {
            // setOldTile(sourceTile.filter((o: tileItem) => o.src === tile.src));
            const index = tileList.findIndex(
                (o: tileItem): boolean => o.id === tile.id
            );
            updateSourceTile(
                sourceTile.map((o: tileItem): tileItem => {
                    if (tileList[index].src === o.src) {
                        return { ...o, counter: o.counter + 1 };
                    } else {
                        return o;
                    }
                })
            );
            setOldTile([...oldTile, tiles[tiles.length - 1]]);
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
                        <div className="totalImg">Total Drop: {totalImg}</div>
                        <div>
                            <CountTimer hours={0} minutes={0} seconds={0} />
                        </div>
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
                            updateSourceTile={updateSourceTile}
                            sourceTiles={sourceTile}
                            deleteTile={deleteTile}
                            updateSelectTile={updateSelectTile}
                            changeXSize={changeXSize}
                            changeYSize={changeYSize}
                            xSize={xSize}
                            ySize={ySize}
                            changeTile={changeTile}
                            tileList={tiles}
                            updateCounter={updateCounter}
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
