import React from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Button } from "react-bootstrap";
import CountTimer from "./Timer";

const ImageDownload = () => {
    const printScreen = () => {
        const map = document.getElementById("map");
        if (map !== null) {
            html2canvas(map).then(function (canvas) {
                canvas.toBlob(function (blob) {
                    if (blob !== null) {
                        saveAs(blob, "pretty image.png");
                    }
                });
            });
        }
    };

    return (
        <div>
            <Button
                className="image_button"
                onClick={() => {
                    printScreen();
                }}
            >
                Save Map
            </Button>
            <CountTimer hours={0} minutes={0} seconds={0} />
        </div>
    );
};

export default ImageDownload;
