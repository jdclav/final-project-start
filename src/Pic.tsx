/* eslint-disable no-extra-parens */
import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { tileItem } from "./interfaces";
import "./css/Button.css";
// import tileList from "./images/tileList";

type ObjectProp = {
    tile: tileItem;
    scale: number;
    updateSelectTile: (tile: tileItem) => void;
    changeTile: (tile: tileItem) => void;
    tileList: tileItem[];
};

const Pic: React.FC<ObjectProp> = (props) => {
    const { tile, scale, updateSelectTile, changeTile, tileList } = props;
    const [totalScale, setTotalScale] = useState<number>(100);
    const [rotation, setRotation] = useState<string>("rotate(0deg)");
<<<<<<
    // const [tileLists] = useState<tileItem[]>(tileList);
    tile.counter += 0.5;
=======
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
    const [prevWindowSize, setPrevWindowSize] = useState<number>(
        window.innerWidth
    );
    const [width, setWidth] = useState<number>(500 / scale);
    const [prevWidth, setPrevWidth] = useState<number>(500 / scale);
    const [scaleString, setScaleString] = useState<string>("");
>>>>>>
    const [{ isDragging }, drag] = useDrag({
        item: { type: tile.snap, tile: tile },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging
        })
    });
    const update = (event: React.MouseEvent) => {
        if (event.button === 1 && tile.id >= 0) {
            event.preventDefault();
            updateSelectTile(tile);
        }
    };

    useEffect(() => {
        if (tile.id >= 0) {
            const updateWindowWidth = () => {
                setWindowSize(window.innerWidth);
            };
            window.addEventListener("resize", updateWindowWidth);
            setTotalScale(
                scale * tile.scale * tile.constScale * (windowSize / 1200)
            );
            if (tile.snap === "free") {
                setRotation("rotate(" + tile.orientation.toString() + "deg)");
                setScaleString(totalScale.toString() + "px");
            } else {
                setRotation(
                    "rotate(" + (tile.orientation * 90).toString() + "deg)"
                );
                setScaleString("100%");
            }
            setWidth(500 / scale);
            setPrevWindowSize(windowSize);
        }
    });
    useEffect(() => {
        if (tile.snap === "free") {
            const xPosition = tile.position[0];
            const yPosition = tile.position[1];
            const xPositionNew = (xPosition * prevWidth) / width;
            const yPositionNew = (yPosition * prevWidth) / width;
            const index = tileList.findIndex(
                (o: tileItem): boolean => o.id === tile.id
            );
            const newTile: tileItem = {
                ...tileList[index],
                position: [xPositionNew, yPositionNew]
            };
            changeTile(newTile);
            setPrevWidth(width);
        }
    }, [width]);

    useEffect(() => {
        if (tile.snap === "free") {
            const xPosition = tile.position[0];
            const yPosition = tile.position[1];
            const xPositionNew = (xPosition * windowSize) / prevWindowSize;
            const yPositionNew = (yPosition * windowSize) / prevWindowSize;
            const index = tileList.findIndex(
                (o: tileItem): boolean => o.id === tile.id
            );
            const newTile: tileItem = {
                ...tileList[index],
                position: [xPositionNew, yPositionNew]
            };
            changeTile(newTile);
            setPrevWidth(width);
        }
    }, [windowSize]);

    return (
        <div
            ref={drag}
            onMouseDown={update}
            style={{
                opacity: isDragging ? 1 : 0.5,
                fontSize: 10,
                fontWeight: "bold",
                cursor: "move",
                textAlign: "center",
                transform: rotation,
                width: scaleString,
                height: scaleString
            }}
        >
            <img src={require("" + tile.src)} width="100%" height="100%" />
        </div>
    );
};
export default Pic;
