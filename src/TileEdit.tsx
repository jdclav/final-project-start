import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { tileItem } from "./interfaces";
// import tileList from "./images/tileList";

const xIndex = 0;
const yIndex = 1;

type listProps = {
    tile: tileItem | null;
    tileList: tileItem[];
    resetMiddle: () => void;
    changeTile: (tile: tileItem) => void;
    // changeTag: (tile: tileItem) => void;
    updateSourceTile: (tile: tileItem[]) => void;
    sourceTile: tileItem[];
    //deleteTile: (index: number) => void;
    // updateTag: (tile: tileItem) => void;
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
    const [newTag, setNewTag] = useState<string>("");
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
                tags: [...sourceTile[index].tags, value]
            };
            sourceTile.map(
                (o: tileItem): tileItem => (o.src === newTile.src ? newTile : o)
            );
        }
        updateSourceTile(sourceTile);
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
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                        type="string"
                        value={newTag}
                        onChange={updateNewTag}
                    />
                    <Button onClick={changeTag}>add Tags</Button>
                </Form.Group>
            </div>
        </div>
    );
};

export default TileEdit;
