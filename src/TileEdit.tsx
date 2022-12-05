import React from "react";
import { Button, Form } from "react-bootstrap";
import { tileItem } from "./interfaces";

type listProps = {
    tile: tileItem | null;
    tileList: tileItem[];
    resetMiddle: () => void;
    changeTile: (tile: tileItem) => void;
    //deleteTile: (index: number) => void;
};

const TileEdit: React.FC<listProps> = (props) => {
    //const { tile, tileList, resetMiddle, changeTile } = props;
    return (
        <div>
            <div
                style={{
                    display: "inline-block",
                    width: "100%",
                    height: "10vw"
                }}
            >
                <Button className="resetMiddle" onClick={props.resetMiddle}>
                    Done
                </Button>
                <Form.Group>
                    <Form.Label></Form.Label>
                </Form.Group>
            </div>
        </div>
    );
};

export default TileEdit;
