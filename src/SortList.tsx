import React from "react";
import { Button } from "react-bootstrap";
import { tileItem } from "./interfaces";

type ObjectProp = {
    buttonName: string;
    listTiles: tileItem[];
    updatelistTiles: (tile: tileItem[]) => void;
};

const SortList: React.FC<ObjectProp> = (props) => {
    const { buttonName, listTiles, updatelistTiles } = props;
    return (
        <Button
            onClick={() => {
                const copyTile = [...listTiles];
                updatelistTiles(
                    copyTile.sort((a, b) => a.name.localeCompare(b.name))
                );
            }}
        >
            {buttonName}
        </Button>
    );
};

export default SortList;
