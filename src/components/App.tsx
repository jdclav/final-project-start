/* eslint-disable no-extra-parens */
import React, { /*MouseEvent,*/ useState } from "react";

import Board from "./Board";
import GridEdit from "./GridEdit";
import ImageDownload from "./ImageDownload";
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchRef
} from "react-zoom-pan-pinch";
import { tileItem } from "../interfaces";
import Rightbar from "./Rightbar";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import TileEdit from "./TileEdit";
import SortName from "./SortName";
import tileList from "../images/tileList";

import "../css/App.css";
const App: React.FC = (): JSX.Element => {
    const [xSize, setXSize] = useState<number>(5);
    const [ySize, setYSize] = useState<number>(5);
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
    const updateSourceTile = (tiles: tileItem[]) => {
        setSourceTile(tiles);
    };

    const changeTile = (
        index: number,
        location: [number, number],
        name: string,
        tags: string[],
        snap: string,
        src: string
    ) => {
        if (index < 0) {
            setTiles((oldArray) => [
                ...oldArray,
                {
                    id: oldArray.length,
                    position: location,
                    name: name,
                    tags: tags,
                    snap: snap,
                    src: src
                }
            ]);
        } else {
            setTiles(
                tiles.map((o: tileItem): tileItem => {
                    if (o.id === index) {
                        return { ...o, position: location };
                    } else {
                        return o;
                    }
                })
            );
        }
    };

    const updateTile = (tile: tileItem) => {
        setTiles(
            tiles.map((o: tileItem): tileItem => {
                if (o.id === tile.id) {
                    return tile;
                } else {
                    return o;
                }
            })
        );
    };

    const changeXSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setXSize(parseInt(event.target.value));
    };
    const changeYSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYSize(parseInt(event.target.value));
    };

    return (
        <div className="App">
            <header className="App-header">
                Table Top Map Editor for CISC275
            </header>
            <div>Justin Clavette</div>
            <div>Wenhan Ying</div>
            <div>Junnan Bai</div>
            <ImageDownload></ImageDownload>
            <SortName
                buttonName="Sort by Name"
                updatelistTiles={updateSourceTile}
                listTiles={sourceTile}
            ></SortName>
            <GridEdit
                changeXSize={changeXSize}
                changeYSize={changeYSize}
            ></GridEdit>
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
                            ></Rightbar>
                        )) ||
                            (middleClick && (
                                <TileEdit
                                    tile={selectTile}
                                    tileList={tiles}
                                    resetMiddle={resetMiddle}
                                    updateTile={updateTile}
                                />
                            ))}
                    </div>
                </DndProvider>
            </div>
        </div>
    );
};

export default App;
