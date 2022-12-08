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
    const { show, updateShow, allTags, tags, updateTags } = props;

    const close = () => updateShow(false);
    const saveClose = () => {
        updateShow(false);
    };

    const checkTags = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tag = event.target.value;
        if (tags.includes(tag)) {
            updateTags(tags.filter((e) => e !== tag));
        } else {
            updateTags([...tags, tag]);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={close} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Tag Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="tag_select">
                        {allTags.map((tag: string, key: number) => {
                            return (
                                <Form.Check
                                    inline
                                    key={key}
                                    type="checkbox"
                                    id={tag}
                                    label={tag}
                                    name={tag}
                                    value={tag}
                                    checked={tags.includes(tag)}
                                    onChange={checkTags}
                                />
                            );
                        })}
                    </Form.Group>
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
