/* eslint-disable no-extra-parens */
import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { tileItem } from "./interfaces";
import "./css/Button.css";

type ObjectProp = {
    tile: tileItem;
    scale: number;
    updateSelectTile: (tile: tileItem) => void;
    changeTile: (tile: tileItem) => void;
};

const Pic: React.FC<ObjectProp> = (props) => {
    const { tile, scale, updateSelectTile } = props;
    const [totalScale, setTotalScale] = useState<number>(100);
    const [rotation, setRotation] = useState<string>("rotate(0deg)");
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
            setTotalScale(scale * tile.scale * tile.constScale);
            if (tile.snap === "free") {
                setRotation("rotate(" + tile.orientation.toString() + "deg)");
            } else {
                setRotation(
                    "rotate(" + (tile.orientation * 90).toString() + "deg)"
                );
            }
        }
    });

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
                transform: rotation
            }}
        >
            <img
                src={require("" + tile.src)}
                width={totalScale + "%"}
                height={totalScale + "%"}
            />
        </div>
    );
};

export default Pic;
