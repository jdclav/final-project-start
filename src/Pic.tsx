import React, { Fragment } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";

type ObjectProp = {
    color: string;
    //orientation: number;
    //size: number;
    //texture: string;
    //type: string;
};

const Pic: React.FC<ObjectProp> = (props) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.PIC },
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
                {props.color}
                <img
                    src={require("./bosun_tally.jpg")}
                    width="100%"
                    height="100%"
                />
            </div>
        </Fragment>
    );
};

export default Pic;
