import React from "react";
import { Form } from "react-bootstrap";

type ObjectProp = {
    changeXSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
    changeYSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const GridEdit: React.FC<ObjectProp> = (props) => {
    const { changeXSize, changeYSize } = props;

    return (
        <div>
            <div>Change Grid size</div>
            <Form.Group controlId="formShortAnswer">
                <Form.Label>X:</Form.Label>
                <Form.Control type="number" onChange={changeXSize} />
                <Form.Label>Y:</Form.Label>
                <Form.Control type="number" onChange={changeYSize} />
            </Form.Group>
        </div>
    );
};

export default GridEdit;
