import React, { useEffect, useState } from "react";
import { tileItem } from "./interfaces";
import Pic from "./Pic";
import { Button, Form } from "react-bootstrap";
import "./css/Search.css";
import TagModal from "./TagModal";

const getTags = (tiles: tileItem[]): string[] => {
    let output: string[] = [];
    tiles.map((tile: tileItem) => {
        output = [...output, ...tile.tags];
        output = output.filter(
            (tag: string, index: number) => output.indexOf(tag) === index
        );
    });
    return output;
};

type listProps = {
    updateSelectTile: (tile: tileItem) => void;
    sourceTiles: tileItem[];
    changeTile: (tile: tileItem) => void;
    tileList: tileItem[];
    updateCounter: (tile: tileItem) => void;
};
const Search: React.FC<listProps> = (props) => {
    const {
        updateSelectTile,
        sourceTiles,
        changeTile,
        tileList,
        updateCounter
    } = props;
    const [search, setSearch] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [allTags, setAllTags] = useState<string[]>(getTags(sourceTiles));
    const [tags, setTags] = useState<string[]>([]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const updateShow = (showing: boolean) => setShow(showing);
    const updateTags = (newTags: string[]) => {
        setTags(newTags);
    };
    useEffect(() => {
        setAllTags(getTags(sourceTiles));
    }, [sourceTiles]);
    return (
        <div>
            <Button
                className="modal_button"
                onClick={() => {
                    updateShow(true);
                }}
            >
                Tag Filter
            </Button>
            <TagModal
                show={show}
                updateShow={updateShow}
                allTags={allTags}
                tags={tags}
                updateTags={updateTags}
            />
            <Form.Group className="search" controlId="searchbar">
                <Form.Control
                    value={search}
                    onChange={handleChange}
                    type="text"
                    placeholder="Search..."
                />
            </Form.Group>
            <div className="list">
                {sourceTiles.map((sortTile: tileItem, key: number) => {
                    updateCounter(sortTile);
                    if (
                        (search === "" ||
                            sortTile.name
                                .toLowerCase()
                                .includes(search.toLowerCase())) &&
                        (tags.every((r) => sortTile.tags.indexOf(r) !== -1) ||
                            tags.length === 0)
                    ) {
                        return (
                            <div
                                key={key}
                                style={{
                                    display: "inline-block",
                                    width: "50%"
                                }}
                            >
                                <p>{sortTile.name}</p>
                                {/* <p>{sortTile.counter}</p> */}
                                <Pic
                                    tile={sortTile}
                                    scale={100}
                                    updateSelectTile={updateSelectTile}
                                    changeTile={changeTile}
                                    tileList={tileList}
                                />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Search;
