/* eslint-disable no-extra-parens */
import React, { /*MouseEvent,*/ useState } from "react";
import Board from ".//Board";
import GridEdit from "./GridEdit";
import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchRef
} from "react-zoom-pan-pinch";
import { tileItem } from "./interfaces";
import Rightbar from "./Rightbar";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import TileEdit from "./TileEdit";
import tileList from "./images/tileList";
import "./css/App.css";
import OpenScreen from "./OpenScreen";

const App: React.FC = (): JSX.Element => {
    const [xSize, setXSize] = useState<number>(5);
    const [ySize, setYSize] = useState<number>(5);
    const [tiles, setTiles] = useState<tileItem[]>([]);
    const [scale, setScale] = useState<number>(1);
    const [middleClick, setMiddleClick] = useState<boolean>(false);
    const [selectTile, setSelectTile] = useState<tileItem | null>(null);
    const [sourceTile, setSourceTile] = useState<tileItem[]>(tileList);
    const [page, setPage] = useState<number>(0);

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

    const changeXSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setXSize(parseInt(event.target.value));
    };
    const changeYSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYSize(parseInt(event.target.value));
    };
    const updatePage = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="App">
            <OpenScreen updatePage={updatePage} />
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
                                    changeTile={changeTile}
                                />
                            ))}
                    </div>
                </DndProvider>
            </div>
        </div>
    );
};

export default App;
