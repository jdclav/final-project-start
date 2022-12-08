import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { tileItem } from "./interfaces";
<<<<<<
// import tileList from "./images/tileList";

=======
>>>>>>
const xIndex = 0;
const yIndex = 1;

type listProps = {
    tile: tileItem | null;
    tileList: tileItem[];
    resetMiddle: () => void;
    changeTile: (tile: tileItem) => void;
<<<<<<
    // changeTag: (tile: tileItem) => void;
    updateSourceTile: (tile: tileItem[]) => void;
    sourceTile: tileItem[];
    //deleteTile: (index: number) => void;
    // updateTag: (tile: tileItem) => void;
=======
>>>>>>
};

const TileEdit: React.FC<listProps> = (props) => {
    const {
        tile,
        tileList,
        resetMiddle,
        changeTile,
        updateSourceTile,
        sourceTile
    } = props;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
<<<<<<
    const [newTag, setNewTag] = useState<string>("");
    const updatePositionX = (event: React.ChangeEvent<HTMLInputElement>) => {
=======
    const [snap, setSnap] = useState<string>("free");
    const [tempX, setTempX] = useState<number>(0);
    const [tempY, setTempY] = useState<number>(0);
    const [tempOrientation, setTempOrientation] = useState<number>(0);

    const updateTempX = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (tile !== null) {
            let value = parseInt(event.target.value);
            if (isNaN(value)) {
                value = 0;
            }
            setTempX(value);
        }
    };
    const updateTempY = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (tile !== null) {
            let value = parseInt(event.target.value);
            if (isNaN(value)) {
                value = 0;
            }
            setTempY(value);
        }
    };
    const updateTempOrientation = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
>>>>>>
        if (tile !== null) {
            let value = parseInt(event.target.value);
            if (isNaN(value)) {
                value = 0;
            }
            setTempOrientation(value);
        }
    };

    const updatePositionX = () => {
        if (tile !== null) {
            let value = tempX;
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
    const updatePositionY = () => {
        if (tile !== null) {
            let value = tempY;
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
    const updateOrientation = () => {
        if (tile !== null) {
            let value = tempOrientation;
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
<<<<<<

    const updateNewTag = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag(event.target.value);
    };

    const changeTag = () => {
        const value = newTag;
        // const value = { updateNewTag };
        if (tile !== null) {
            const index = sourceTile.findIndex(
                (o: tileItem): boolean => o.src === tile.src
            );

            const newTile: tileItem = {
                ...tileList[index],
                tags: [...tileList[index].tags, value]
            };
            sourceTile.map(
                (o: tileItem): tileItem => (o.src === newTile.src ? newTile : o)
            );
        }
        updateSourceTile(sourceTile);
    };

=======
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
>>>>>>
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
                <div>
                    <p>X: {tileList[currentIndex].position[xIndex]}</p>
                    <p>Y: {tileList[currentIndex].position[yIndex]}</p>
                    {snap === "free" && (
                        <p>Size: {tileList[currentIndex].scale}</p>
                    )}
                    <p>Orientation: {tileList[currentIndex].orientation}</p>
                </div>
                <Form.Group>
                    <Form.Label>X Coordinate</Form.Label>
                    <Form.Control
                        type="number"
                        value={tempX}
                        onChange={updateTempX}
                    />
                    <div>
                        <Button className="setX" onClick={updatePositionX}>
                            Enter
                        </Button>
                    </div>

                    <Form.Label>Y Coordinate</Form.Label>
                    <Form.Control
                        type="number"
                        value={tempY}
                        onChange={updateTempY}
                    />
                    <div>
                        <Button className="setY" onClick={updatePositionY}>
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
<<<<<<
                    <Form.Control
                        type="number"
                        value={tileList[currentIndex].orientation}
                        onChange={updateOrientation}
                    />
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                        type="string"
                        value={newTag}
                        onChange={updateNewTag}
                    />
                    <Button onClick={changeTag}>add Tags</Button>
=======
                    {snap === "free" && (
                        <div>
                            <Form.Control
                                type="number"
                                value={tempOrientation}
                                onChange={updateTempOrientation}
                            />
                            <Button
                                className="set_orientation"
                                onClick={updateOrientation}
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
>>>>>>
                </Form.Group>
            </div>
        </div>
    );
};

export default TileEdit;
