/* eslint-disable prettier/prettier */
import React from "react";
import Pic from "./Pic";
import BoardSquare from "./BoardSquare";
import { tileItem } from "./interfaces";
import { ItemTypes } from "./constants";
import { useDrop } from "react-dnd";

const renderPiece = (
    x: number,
    y: number,
    tiles: tileItem[],
    updateSelectTile: (tile: tileItem) => void
) => {
    const location = tiles.filter(
        (o: tileItem): boolean =>
            x === o.position[0] && y === o.position[1] && o.snap === "snap"
    );
    if (location.length > 0) {
        return (
            <Pic
                tile={location[0]}
                scale={100}
                updateSelectTile={updateSelectTile}
            />
        );
    }
};

const renderFree = (tiles: tileItem[]): tileItem[] =>
    tiles.filter((o: tileItem): boolean => o.snap === "free");
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
            key={((x + y) * (x + y + 1)) / 2 + x}
            style={{ width: 100 / width + "%", height: 100 / height + "%" }}
        >
            <BoardSquare x={x} y={y} changeTile={changeTile}>
                {renderPiece(x, y, tiles, updateSelectTile)}
            </BoardSquare>
        </div>
    );
};

type BoardProps = {
    tile: tileItem[];
    changeTile: (tile: tileItem) => void;
    x: number;
    y: number;
    scale: number;
    updateSelectTile: (tile: tileItem) => void;
};

const Board: React.FC<BoardProps> = (props) => {
    const squares = [];
    const freeTiles = renderFree(props.tile);
    const grid = document.getElementById("board");
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
                item.tile.position[0] === -100 &&
                item.tile.position[1] === -100 &&
                positionCurrent !== null &&
                offset !== null
            ) {
                x = positionCurrent.x - offset.x;
                y = positionCurrent.y - offset.y;
            } else if (
                positionDifference !== null &&
                positionCurrent !== null
            ) {
                x = item.tile.position[0] + positionDifference.x / props.scale;
                y = item.tile.position[1] + positionDifference.y / props.scale;
            } else {
                x = 0;
                y = 0;
            }
            props.changeTile({ ...item.tile, position: [x, y] });
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    for (let i = 0; i < props.y; i++) {
        for (let j = 0; j < props.x; j++) {
            squares.push(
                renderSquare(
                    j,
                    i,
                    props.tile,
                    props.changeTile,
                    props.x,
                    props.y,
                    props.updateSelectTile
                )
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
                            left: o.position[0],
                            top: o.position[1]
                        }}
                    >
                        <Pic
                            tile={o}
                            scale={500 / props.x}
                            updateSelectTile={props.updateSelectTile}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Board;
