import React from "react";
import { Button } from "react-bootstrap";

type screenProps = {
    updatePage: (newPage: number) => void;
};

const OpenScreen: React.FC<screenProps> = (props) => {
    return (
        <div>
            <header className="App-header">
                Table Top Map Editor for CISC275
            </header>
            <div>Justin Clavette</div>
            <div>Wenhan Ying</div>
            <div>Junnan Bai</div>
            <Button
                className="setup_page_button"
                onClick={() => {
                    props.updatePage(1);
                }}
            >
                Create New Map
            </Button>
        </div>
    );
};
export default OpenScreen;
