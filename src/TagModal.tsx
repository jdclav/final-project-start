import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

type ObjectProp = {
    show: boolean;
    updateShow: (showing: boolean) => void;
    allTags: string[];
    tags: string[];
    updateTags: (newTags: string[]) => void;
};

const TagModal: React.FC<ObjectProp> = (props) => {
    const { show, updateShow } = props;

    const close = () => updateShow(false);
    const saveClose = () => {
        updateShow(false);
    };

    return (
        <div>
            <Modal show={show} onHide={close} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Tag Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="tag_select"></Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={saveClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default TagModal;
