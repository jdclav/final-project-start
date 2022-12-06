import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { tileItem } from "./interfaces";

const xIndex = 0;
const yIndex = 1;

type listProps = {
    tile: tileItem | null;
    tileList: tileItem[];
    resetMiddle: () => void;
    changeTile: (tile: tileItem) => void;
    //deleteTile: (index: number) => void;
};

const TileEdit: React.FC<listProps> = (props) => {
    const { tile, tileList, resetMiddle, changeTile } = props;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const updatePositionX = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (tile !== null) {
            let value = parseInt(event.target.value);
            if (isNaN(value)) {
                value = 0;
            }
            const index = tileList.findIndex(
                (o: tileItem): boolean => o.id === tile.id
            );
            const newTile: tileItem = {
                ...tileList[index],
                position: [value, tileList[index].position[yIndex]]
            };

            changeTile(newTile);
        }
    };
    const updatePositionY = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (tile !== null) {
            let value = parseInt(event.target.value);
            if (isNaN(value)) {
                value = 0;
            }
            const index = tileList.findIndex(
                (o: tileItem): boolean => o.id === tile.id
            );
            const newTile: tileItem = {
                ...tileList[index],
                position: [tileList[index].position[xIndex], value]
            };

            changeTile(newTile);
        }
    };
    const updateScale = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (tile !== null) {
            let value = parseFloat(event.target.value);
            if (isNaN(value)) {
                value = 0;
            }
            const index = tileList.findIndex(
                (o: tileItem): boolean => o.id === tile.id
            );
            const newTile: tileItem = {
                ...tileList[index],
                scale: value
            };

            changeTile(newTile);
        }
    };
    const updateOrientation = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (tile !== null) {
            let value = parseInt(event.target.value);
            if (isNaN(value)) {
                value = 0;
            }
            const index = tileList.findIndex(
                (o: tileItem): boolean => o.id === tile.id
            );
            const newTile: tileItem = {
                ...tileList[index],
                orientation: value
            };

            changeTile(newTile);
        }
    };
    useEffect(() => {
        if (tile !== null) {
            console.log(tile.id);
            const test = tile.id;
            const index = tileList.findIndex(
                (o: tileItem): boolean => o.id === test
            );
            console.log(index);
            setCurrentIndex(index);
        }
    });
    return (
        <div>
            <div
                style={{
                    display: "inline-block",
                    width: "100%",
                    height: "10vw"
                }}
            >
                <Button className="resetMiddle" onClick={resetMiddle}>
                    Done
                </Button>
                <Form.Group>
                    <Form.Label>X Coordinate</Form.Label>
                    <Form.Control
                        type="number"
                        value={tileList[currentIndex].position[xIndex]}
                        onChange={updatePositionX}
                    />
                    <Form.Label>Y Coordinate</Form.Label>
                    <Form.Control
                        type="number"
                        value={tileList[currentIndex].position[yIndex]}
                        onChange={updatePositionY}
                    />
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                        type="number"
                        value={tileList[currentIndex].scale}
                        onChange={updateScale}
                    />
                    <Form.Label>Orientation</Form.Label>
                    <Form.Control
                        type="number"
                        value={tileList[currentIndex].orientation}
                        onChange={updateOrientation}
                    />
                </Form.Group>
            </div>
        </div>
    );
};

export default TileEdit;
