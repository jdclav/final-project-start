import React, { /*MouseEvent,*/ useState } from "react";
import "./App.css";
import Board from "./Board";
import GridEdit from "./GridEdit";
import "./background.css";
import ImageDownload from "./ImageDownload";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { observeItem } from "./interfaces";

const App: React.FC = (): JSX.Element => {
    const [xSize, setXSize] = useState<number>(5);
    const [ySize, setYSize] = useState<number>(5);
    const [tiles, setTiles] = useState<tileItem[]>([]);
    const [sourceTile /*, setSourceTile*/] = useState<tileItem[]>([
        { id: -1, position: [0, 0], color: "red" },
        { id: -2, position: [0, 0], color: "green" },
        { id: -3, position: [0, 0], color: "yellow" },
        { id: -4, position: [0, 0], color: "blue" }

    ]);

    const changeObject = (index: number, location: [number, number]) => {
        if (index > objects.length - 1) {
            setObjects((oldArray) => [
                ...oldArray,
                { id: index, position: location }
            ]);
        } else {
            setObjects(
                objects.map((o: observeItem): observeItem => {
                    if (o.id === index) {
                        return { ...o, position: location };
                    } else {
                        return o;
                    }
                })
            );
        }
    };
    //const [pan, setPan] = useState<boolean>(false);

    const changeXSize = (x: number) => setXSize(x);
    const changeYSize = (y: number) => setYSize(y);

    /* Working on middle mouse panning
    const handleMiddleDown = (event: React.MouseEvent) => {
        if (event.button === 1) {
            setPan(true);
        }
    };

    const handleMiddleUp = (event: React.MouseEvent) => {
        if (event.button === 1) {
            setPan(false);
        }
    };

     disabled: !pan, 

    onMouseDown={handleMiddleDown}
    onMouseUp={handleMiddleUp}
    */
    return (
        <div className="App">
            <header className="App-header">
                Table Top Map Editor for CISC275
            </header>
            <div>Justin Clavette</div>
            <div>Wenhan Ying</div>
            <div>Junnan Bai</div>
            <ImageDownload></ImageDownload>
            <GridEdit changeX={changeXSize} changeY={changeYSize}></GridEdit>
            <TransformWrapper panning={{ activationKeys: ["Shift"] }}>
                <TransformComponent>
                    <div
                        className="container"
                        id="map"
                        style={{
                            width: "1000px",
                            height: "1000px",
                            border: "1px solid gray"
                        }}
                    >
                        <Board
                            object={objects}
                            changeObject={changeObject}
                            x={xSize}
                            y={ySize}
                        />
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

export default App;
