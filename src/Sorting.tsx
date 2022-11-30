import React from "react";
import { Button } from "react-bootstrap";
import { tileItem } from "./interfaces";
export function SortingItems({
    setSourceTile,
    sourceTile
}: {
    setSourceTile: (newTile: tileItem[]) => void;
    sourceTile: tileItem[];
}): JSX.Element {
    return (
        <Button
            onClick={() => {
                const copyTile = [...sourceTile];
                setSourceTile(
                    copyTile.sort((a, b) => a.name.localeCompare(b.name))
                );
            }}
        >
            Sort By Name
        </Button>
    );
}
