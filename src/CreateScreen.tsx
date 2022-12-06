import React from "react";
import { Button } from "react-bootstrap";
import GridEdit from "./GridEdit";

type screenProps = {
    updatePage: (newPage: number) => void;
    changeXSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
    changeYSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
    xSize: number;
    ySize: number;
};

const CreateScreen: React.FC<screenProps> = (props) => {
    const { updatePage, changeXSize, changeYSize, xSize, ySize } = props;
    return (
        <div>
            <GridEdit
                changeXSize={changeXSize}
                changeYSize={changeYSize}
                xSize={xSize}
                ySize={ySize}
            ></GridEdit>
            <Button
                className="setup_page_button"
                onClick={() => {
                    updatePage(2);
                }}
            >
                Create New Map
            </Button>
        </div>
    );
};
export default CreateScreen;
