import {tilecategories} from "./tileCategories.js";
import {tilesetmap} from "./tilesetmap.js";
const dataMap = {
    "mapWidth": 40,
    "mapHeight": 25,
    "minTileId": 1,
    "maxTileId": 132,
    "tileMap": [
        [2, 1, 3, 1, 2, 2, 2, 1, 2, 1, 3, 2, 1, 1, 3, 1, 3, 2, 1, 5, 3, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 3],
        [1, 1, 3, 2, 1, 1, 1, 2, 1, 2, 2, 3, 1, 1, 5, 3, 3, 2, 2, 17, 1, 4, 1, 1, 2, 1, 2, 2, 1, 1, 2, 2, 3, 1, 2, 1, 1, 2, 2, 2],
        [1, 2, 2, 49, 50, 52, 50, 52, 51, 3, 1, 1, 5, 4, 17, 1, 5, 1, 4, 1, 5, 16, 2, 1, 2, 1, 2, 53, 56, 54, 54, 54, 55, 2, 45, 82, 46, 82, 47, 2],
        [1, 2, 1, 61, 62, 64, 62, 64, 63, 1, 2, 30, 17, 16, 107, 1, 17, 1, 16, 5, 17, 5, 2, 2, 3, 1, 1, 65, 66, 68, 66, 68, 67, 3, 60, 13, 14, 15, 60, 1],
        [2, 3, 1, 73, 74, 86, 74, 85, 76, 3, 8, 1, 2, 2, 5, 1, 4, 1, 2, 17, 95, 17, 2, 2, 1, 1, 1, 77, 78, 90, 78, 89, 80, 2, 60, 25, 26, 27, 60, 1],
        [2, 1, 1, 6, 6, 44, 6, 6, 6, 19, 20, 21, 2, 4, 17, 5, 16, 5, 29, 1, 1, 3, 8, 2, 1, 93, 2, 3, 3, 44, 3, 3, 3, 1, 60, 37, 38, 39, 60, 1],
        [1, 2, 2, 2, 2, 44, 3, 1, 2, 3, 32, 3, 5, 16, 1, 17, 1, 17, 2, 2, 5, 19, 20, 21, 1, 105, 1, 1, 2, 44, 1, 1, 1, 1, 69, 82, 70, 82, 71, 1],
        [1, 1, 1, 2, 1, 44, 1, 2, 1, 1, 1, 2, 17, 2, 5, 1, 28, 5, 30, 5, 17, 1, 32, 1, 1, 2, 2, 3, 2, 44, 1, 1, 1, 2, 1, 3, 44, 1, 2, 1],
        [1, 1, 1, 1, 2, 44, 1, 2, 2, 2, 2, 5, 1, 29, 17, 30, 5, 17, 2, 17, 1, 11, 107, 5, 1, 2, 2, 1, 1, 44, 44, 44, 44, 44, 44, 44, 44, 2, 1, 2],
        [1, 1, 1, 3, 2, 44, 1, 1, 2, 2, 1, 17, 4, 107, 11, 2, 17, 4, 1, 1, 22, 23, 24, 17, 2, 1, 3, 2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 3, 1, 2],
        [1, 2, 3, 2, 1, 44, 44, 44, 1, 2, 1, 2, 16, 22, 23, 24, 2, 16, 5, 2, 1, 35, 4, 2, 3, 1, 2, 1, 1, 1, 1, 2, 1, 2, 3, 2, 2, 1, 2, 3],
        [1, 2, 2, 1, 2, 1, 1, 44, 2, 1, 1, 1, 1, 2, 35, 2, 5, 2, 17, 1, 1, 2, 16, 2, 2, 2, 2, 1, 1, 41, 1, 2, 1, 2, 1, 1, 1, 2, 2, 3],
        [2, 2, 1, 2, 1, 2, 3, 44, 44, 44, 2, 2, 2, 2, 1, 2, 17, 1, 1, 2, 1, 3, 2, 2, 1, 2, 2, 2, 3, 43, 1, 1, 1, 1, 1, 1, 2, 3, 1, 2],
        [1, 1, 1, 2, 1, 1, 2, 2, 1, 44, 3, 2, 1, 1, 84, 44, 1, 1, 1, 1, 2, 1, 3, 2, 1, 2, 2, 1, 1, 42, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1],
        [2, 3, 2, 2, 2, 2, 1, 2, 1, 44, 44, 44, 44, 44, 44, 44, 2, 2, 2, 3, 1, 1, 40, 42, 43, 41, 40, 41, 42, 41, 40, 42, 2, 1, 1, 1, 1, 3, 3, 2],
        [2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 44, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3, 2, 2, 1, 3, 2, 1, 2, 2, 41, 2, 1, 2, 2, 2, 2, 1, 1],
        [2, 1, 1, 2, 3, 1, 1, 2, 1, 2, 2, 2, 44, 2, 3, 2, 1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 2, 2, 2, 1, 1, 1, 2],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 3, 2, 2, 44, 1, 53, 56, 54, 54, 54, 56, 55, 45, 82, 46, 82, 46, 82, 46, 82, 47, 1, 2, 1, 1, 2, 2, 2, 2, 3, 1],
        [2, 1, 2, 2, 1, 2, 2, 2, 3, 1, 1, 2, 44, 1, 65, 68, 66, 68, 66, 68, 67, 57, 1, 1, 2, 2, 1, 1, 1, 59, 1, 3, 1, 1, 3, 1, 2, 2, 2, 2],
        [1, 2, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 44, 1, 77, 89, 78, 89, 78, 89, 80, 57, 3, 2, 2, 2, 1, 1, 2, 59, 1, 2, 2, 3, 2, 2, 2, 1, 1, 2],
        [1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 44, 3, 77, 78, 90, 78, 90, 78, 80, 69, 82, 70, 82, 46, 82, 46, 82, 71, 1, 2, 3, 1, 1, 2, 2, 2, 2, 2],
        [1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 2, 93, 44, 2, 2, 2, 44, 1, 44, 2, 2, 2, 1, 44, 1, 1, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1, 2, 3, 1, 3],
        [2, 1, 3, 1, 1, 3, 1, 2, 2, 2, 2, 105, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 2, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 1, 3, 3, 1, 1],
        [1, 1, 1, 2, 1, 2, 2, 3, 2, 1, 3, 1, 2, 2, 3, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 3, 2, 2, 1, 2, 2],
        [2, 3, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 3, 2, 1, 1, 2, 2, 1, 3, 2, 1, 3, 2, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1]
    ],
    "simplifiedMap": [],



};

export const tools = [
    {
        "type": "function",
        "function": {
            "name": "getFirstTileIndex",
            "description": "Gets the first location of a tile in the tilemap.",
            "parameters": {
                "type": "object",
                "properties": {
                    "tile_id": {
                        "type": "string",
                        "description": "The id of the tile to find."
                    }
                },
                "required": ["tile_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "getSimplifiedMap",
            "description": "Get the, hopefully, llm readable map as a 2D array.",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"]
                    }
                },
                "required": ["location"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "getTilesFromCategory",
            "description": "Returns an array of the coordinates of all tiles of a given category name. The coordinates are strings in the form (x, y).",
            "parameters": {
                "type": "object",
                "properties": {
                    "tileCategory": {
                        "type": "string",
                        "description": "The tile category name."
                    }
                },
                "required": ["tileCategory"]
            }
        }
    }
];






/*
 {
        "type": "function",
        "function": {
            "name": "getSimplifiedMap",
            "description": "Get the, hopefully, llm readable map as a 2D array.",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA",
                    },
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
                },
                "required": ["location"],
            },
        }
    }
*/
//Based on the current tile grid
function getSimplifiedMap() {
    if (dataMap.simplifiedMap.length === 0){
        makeSimplifiedMap();
    }
    return dataMap.simplifiedMap;
}

function makeSimplifiedMap() {
    //access as [height][width]
    const simpleMap = new Array(dataMap.mapHeight);
    for (let height = 0; height < dataMap.mapHeight; height++) {
        simpleMap[height] = new Array(dataMap.mapWidth);
    }
    for (let y = 0; y < dataMap.mapHeight; y++) {
        for (let x = 0; x < dataMap.mapWidth; x++) {
            simpleMap[y][x] = tilecategories[dataMap.tileMap[y][x]]
        }
    }
    dataMap.simplifiedMap = simpleMap;
    console.log(dataMap.simplifiedMap);
}

/*
 {
        "type": "function",
        "function": {
            "name": "getTilesFromCategory",
            "description": "Returns an array of the coordinates of all tiles of a given category name. The coordinates are strings in the form (x, y).",
            "parameters": {
                "type": "string",
                "tileCategory": {
                    "description": "The tile category name."
                },
                "required": ["tileCategory"],
            },
        }
    }
*/
export function getTilesFromCategory(tileCat) {
    let simpMap = getSimplifiedMap();
    let coords = [];
    for (let y = 0; y < dataMap.mapHeight; y++) {
        for (let x = 0; x < dataMap.mapWidth; x++) {
            if (simpMap[y][x] === tileCat) {
                coords.push(getStringCoord(x, y));
            }
        }
    }
    console.log(coords);
    
    return coords;
}

//Returns and array of arrays containing coords for each fact of the given type. E.g. if two trees are in the map, returns an array of length 2, each subarray contains the coords of each contiguous part of the tree.
function getFacts(tileCat) {
    
}

function getStringCoord(x, y){
    return `(${x+1},${y+1})`;
}

export function getFirstTileIndex(tileId) {
    const tileIdNumber = Number(tileId);
    console.log("looking for " + tileIdNumber);
    for (let y = 0; y < dataMap.mapHeight; y++) {
        for (let x = 0; x < dataMap.mapWidth; x++) {
            if (dataMap.tileMap[y][x] === tileIdNumber) {
                return getStringCoord(x, y);
            }
        }
    }
    return "Tile not found";
}


export {getSimplifiedMap};
export { dataMap };