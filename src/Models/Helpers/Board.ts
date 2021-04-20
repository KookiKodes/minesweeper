import stamp from "tp-stampit";
import { EventHandler } from "./EventHandler";
import { Cell } from "./Cell";
import { Instance } from "./Instance";

export const Board = stamp(EventHandler, Instance, {
	props: {
		element: "ul",
		size: [10, 10],
		cellValueTypes: [],
		cellType: Cell,
		cellSize: 25,
	},
	init({
		size = this.size,
		cellValueTypes = this.cellValueTypes,
		cellType = this.cellType,
		cellSize = this.cellSize,
	}) {
		this.size = size;
		this.cellValueTypes = cellValueTypes;
		this.cellType = cellType;
		this.cellSize = cellSize;

		this.addAttr(["id", `board-${this.instanceIndex}`]);

		const [rows, cols] = this.size;

		this.style({ width: `${cols * this.cellSize}px` });
		this.style({ height: `${rows * this.cellSize}px` });
	},
	methods: {
		async generateBoard(
			genNewCellValue: (valueTypes) => Promise<any>,
			determineAdjacent?: () => Promise<void>
		) {
			const [rows, cols] = this.size;
			for (let i = 0; i < rows * cols; i++) {
				const newCellValue = await genNewCellValue(this.cellValueTypes);
				const newCell = this.cellType({
					value: newCellValue,
					size: this.cellSize,
					element: "li",
					className: "cell",
				});
				this.appendElem(newCell);
			}
			if (determineAdjacent) determineAdjacent.call(this);
		},
	},
	propertyDescriptors: {
		name: { value: "board" },
	},
});
