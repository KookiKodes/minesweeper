import stamp from "tp-stampit";
import { ElementHandler } from "../View/ElementHandler";
import { Cell } from "./Cell";
import { Instance } from "./Instance";
import { Graph } from "./Graph";

export const Board = stamp(ElementHandler, Instance, Graph, {
  props: {
    element: "ul",
    size: [10, 10],
    nodeValueTypes: [],
    nodeType: Cell,
    cellSize: 25,
  },
  init({
    size = this.size,
    nodeValueTypes = this.nodeValueTypes,
    nodeType = this.nodeType,
    cellSize = this.cellSize,
  }) {
    this.size = size;
    this.nodeValueTypes = nodeValueTypes;
    this.nodeType = nodeType;
    this.cellSize = cellSize;

    console.log(this.edgeDirection);

    this.addAttr(["id", `board-${this.instanceIndex}`]);

    const [rows, cols] = this.size;

    this.style({ width: `${cols * this.cellSize}px` });
    this.style({ height: `${rows * this.cellSize}px` });
  },
  methods: {
    async generateBoard(
      genNewCellValue: (valueTypes) => any,
      determineAdjacent: () => any
    ) {
      const [rows, cols] = this.size;
      for (let i = 0; i < rows * cols; i++) {
        const newCellValue = genNewCellValue(this.nodeValueTypes);
        const newCell = this.addVertex({
          value: newCellValue,
          size: this.cellSize,
          element: "li",
          className: "cell",
        });
        this.appendElem(newCell);
      }
      determineAdjacent.call(this);
    },
  },
  propertyDescriptors: {
    name: { value: "board" },
  },
});
