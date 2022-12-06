import React from "react";
import { Form } from "react-bootstrap";

type ObjectProp = {
    changeXSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
    changeYSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
    xSize: number;
    ySize: number;
};

const GridEdit: React.FC<ObjectProp> = (props) => {
    const { changeXSize, changeYSize, xSize, ySize } = props;

    return (
        <div>
            <div>Change Grid size</div>
            <Form.Group controlId="formShortAnswer">
                <Form.Label>X:</Form.Label>
                <Form.Control
                    type="number"
                    value={xSize}
                    onChange={changeXSize}
                />
                <Form.Label>Y:</Form.Label>
                <Form.Control
                    type="number"
                    value={ySize}
                    onChange={changeYSize}
                />
            </Form.Group>
        </div>
    );
};

export default GridEdit;
