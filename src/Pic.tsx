import React, { Fragment } from "react";
import { useDrag } from "react-dnd";
import { tileItem } from "./interfaces";

type ObjectProp = {
    tile: tileItem;
    //position: [number, number];
    //orientation: number;
    //size: number;
    //texture: string;
    //type: string;
};

const Pic: React.FC<ObjectProp> = (props) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: props.tile.snap, tile: props.tile },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging
        })
    });

    return (
        <Fragment>
            <div
                ref={drag}
                style={{
                    opacity: isDragging ? 1 : 0.5,
                    fontSize: 10,
                    fontWeight: "bold",
                    cursor: "move",
                    textAlign: "center"
                }}
            >
                {props.tile.color}
                <img
                    src={require("./images/rocks.png")}
                    width="100%"
                    height="100%"
                />
            </div>
        </Fragment>
    );
};

export default Pic;
