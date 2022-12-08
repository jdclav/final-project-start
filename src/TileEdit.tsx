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
    const [snap, setSnap] = useState<string>("free");

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
            let value = parseFloat(event.target.value) / 20;
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
    const updateOrientationSnap = (facing: number) => {
        if (tile !== null) {
            const index = tileList.findIndex(
                (o: tileItem): boolean => o.id === tile.id
            );
            const newTile: tileItem = {
                ...tileList[index],
                orientation: facing
            };

            changeTile(newTile);
        }
    };
    useEffect(() => {
        if (tile !== null) {
            const test = tile.id;
            const index = tileList.findIndex(
                (o: tileItem): boolean => o.id === test
            );
            setCurrentIndex(index);
            setSnap(tile.snap);
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
                    <div>
                        <Button className="setX" onClick={resetMiddle}>
                            Enter
                        </Button>
                    </div>

                    <Form.Label>Y Coordinate</Form.Label>
                    <Form.Control
                        type="number"
                        value={tileList[currentIndex].position[yIndex]}
                        onChange={updatePositionY}
                    />
                    <div>
                        <Button className="setY" onClick={resetMiddle}>
                            Enter
                        </Button>
                    </div>
                    {snap === "free" && (
                        <div>
                            <Form.Label>Size</Form.Label>
                            <div>
                                <input
                                    width="200%"
                                    type="range"
                                    defaultValue={20}
                                    onChange={updateScale}
                                    min="1"
                                />
                            </div>
                            <p>{tileList[currentIndex].scale}</p>
                        </div>
                    )}

                    <Form.Label>Orientation</Form.Label>
                    {snap === "free" && (
                        <div>
                            <Form.Control
                                type="number"
                                value={tileList[currentIndex].orientation}
                                onChange={updateOrientation}
                            />
                            <Button
                                className="set_orientation"
                                onClick={resetMiddle}
                            >
                                Enter
                            </Button>
                        </div>
                    )}
                    {snap === "snap" && (
                        <div className="orientation_buttons">
                            <div>
                                <Button
                                    className="up"
                                    onClick={() => {
                                        updateOrientationSnap(0);
                                    }}
                                >
                                    Up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="left"
                                    onClick={() => {
                                        updateOrientationSnap(3);
                                    }}
                                >
                                    Left
                                </Button>
                                <Button
                                    className="right"
                                    onClick={() => {
                                        updateOrientationSnap(1);
                                    }}
                                >
                                    Right
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="down"
                                    onClick={() => {
                                        updateOrientationSnap(2);
                                    }}
                                >
                                    Down
                                </Button>
                            </div>
                        </div>
                    )}
                </Form.Group>
            </div>
        </div>
    );
};

export default TileEdit;
