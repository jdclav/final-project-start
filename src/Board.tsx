/* eslint-disable prettier/prettier */
import React from "react";
import Pic from "./Pic";
import BoardSquare from "./BoardSquare";
import { tileItem } from "./interfaces";
import { ItemTypes } from "./constants";
import { useDrop } from "react-dnd";

const defaultScale = 100;
const xIndex = 0;
const yIndex = 1;
const sourcePosition = -100;

const genKey = (x: number, y: number): number =>
    ((x + y) * (x + y + 1)) / 2 + x;

const renderFree = (tiles: tileItem[]): tileItem[] =>
    tiles.filter((o: tileItem): boolean => o.snap === "free");

type BoardProps = {
    tile: tileItem[];
    changeTile: (tile: tileItem) => void;
    x: number;
    y: number;
    scale: number;
    updateSelectTile: (tile: tileItem) => void;
};

const Board: React.FC<BoardProps> = (props) => {
    const { tile, changeTile, x, y, scale, updateSelectTile } = props;
    const squares = [];
    const freeTiles = renderFree(tile);
    const grid = document.getElementById("board");
    const renderPiece = (
        x: number,
        y: number,
        tiles: tileItem[],
        updateSelectTile: (tile: tileItem) => void
    ) => {
        const location = tiles.filter(
            (o: tileItem): boolean =>
                x === o.position[xIndex] &&
                y === o.position[yIndex] &&
                o.snap === "snap"
        );
        if (location.length > 0) {
            return (
                <Pic
                    tile={location[0]}
                    scale={defaultScale}
                    updateSelectTile={updateSelectTile}
                    changeTile={changeTile}
                />
            );
        }
    };
    const renderSquare = (
        x: number,
        y: number,
        tiles: tileItem[],
        changeTile: (tile: tileItem) => void,
        width: number,
        height: number,
        updateSelectTile: (tile: tileItem) => void
    ) => {
        return (
            <div
                className="square"
                key={genKey(x, y)}
                style={{
                    width: defaultScale / width + "%",
                    height: defaultScale / height + "%"
                }}
            >
                <BoardSquare x={x} y={y} changeTile={changeTile}>
                    {renderPiece(x, y, tiles, updateSelectTile)}
                </BoardSquare>
            </div>
        );
    };
    const [, drop] = useDrop({
        accept: ItemTypes.free,
        canDrop: () => true,
        drop: (item: { type: string; tile: tileItem }, monitor) => {
            let x;
            let y;
            const positionDifference = monitor.getDifferenceFromInitialOffset();
            const positionCurrent = monitor.getClientOffset();
            let offset = null;
            if (grid !== null) {
                offset = grid.getBoundingClientRect();
            }
            if (
                item.tile.position[xIndex] === sourcePosition &&
                item.tile.position[yIndex] === sourcePosition &&
                positionCurrent !== null &&
                offset !== null
            ) {
                x = positionCurrent.x - offset.x;
                y = positionCurrent.y - offset.y;
            } else if (
                positionDifference !== null &&
                positionCurrent !== null
            ) {
                x = item.tile.position[xIndex] + positionDifference.x / scale;
                y = item.tile.position[yIndex] + positionDifference.y / scale;
            } else {
                x = 0;
                y = 0;
            }
            changeTile({ ...item.tile, position: [x, y] });
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            squares.push(
                renderSquare(j, i, tile, changeTile, x, y, updateSelectTile)
            );
        }
    }

    return (
        <div
            id="board"
            ref={drop}
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexWrap: "wrap"
            }}
        >
            {squares}
            {freeTiles.map((o: tileItem) => {
                return (
                    <div
                        key={o.id}
                        z-index="10"
                        style={{
                            position: "absolute",
                            left: o.position[xIndex],
                            top: o.position[yIndex]
                        }}
                    >
                        <Pic
                            tile={o}
                            scale={(5 * defaultScale) / x}
                            updateSelectTile={updateSelectTile}
                            changeTile={changeTile}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Board;
