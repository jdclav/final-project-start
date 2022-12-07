/* eslint-disable no-extra-parens */
import React, { /*MouseEvent,*/ useState } from "react";

import "./css/App.css";
import OpenScreen from "./OpenScreen";
import CreateScreen from "./CreateScreen";

import DndScreen from "./DndScreen";

const App: React.FC = (): JSX.Element => {
    const [xSize, setXSize] = useState<number>(5);
    const [ySize, setYSize] = useState<number>(5);
    const [page, setPage] = useState<number>(0);

    const changeXSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setXSize(parseInt(event.target.value));
    };
    const changeYSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYSize(parseInt(event.target.value));
    };
    const updatePage = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="App">
            {(page === 0 && <OpenScreen updatePage={updatePage} />) ||
                (page === 1 && (
                    <CreateScreen
                        updatePage={updatePage}
                        changeXSize={changeXSize}
                        changeYSize={changeYSize}
                        xSize={xSize}
                        ySize={ySize}
                    />
                )) ||
                (page === 2 && (
                    <DndScreen
                        changeXSize={changeXSize}
                        changeYSize={changeYSize}
                        xSize={xSize}
                        ySize={ySize}
                    />
                ))}
        </div>
    );
};

export default App;
