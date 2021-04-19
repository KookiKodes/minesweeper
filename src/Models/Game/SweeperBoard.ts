import stamp from "tp-stampit";
import { Board } from "../Helpers/Board";
import { SweeperCell } from "./SweeperCell";
import { Mine } from "./Mine";
import { Adjacent } from "./Adjacent";
import { Graph } from "../Helpers/Graph";
import "../../styles/board.css";

export const SweeperBoard = stamp(Board, {
  props: {
    nodeValueTypes: [Adjacent, Mine],
    nodeType: SweeperCell,
    edgeDirection: Graph.UNDIRECTED,
  },
  init() {
    this.generateBoard((cellValueType) => {
      const [rows, cols] = this.size;
      const rand = Math.floor(Math.random() * 100);
      if (rand >= 85) {
        return cellValueType[1]();
      }
      return cellValueType[0]();
    }, this.determineAdjacent);

    this.updateMineAdjacents();
  },
  methods: {
    updateMineAdjacents() {
      const mines = Mine.getAllInstances();
      for (let mine of mines) {
        const { parent } = mine;
        const adjacents = parent.getAdjacents();
        for (let adj of adjacents) {
          if (adj.value.name !== "mine") {
            adj.value.increment();
          }
        }
      }
    },
    isValid(min, max, dir): boolean {
      const [rows, cols] = this.size;
      if (dir < 0 || dir >= rows * cols) return false;
      return dir >= min && max >= dir;
    },
    determineAdjacent() {
      const cells = SweeperCell.getAllInstances();
      const [rows, cols] = this.size;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = row * cols + col,
            cell = cells[index],
            nw = index - cols - 1,
            n = index - cols,
            ne = index - cols + 1,
            w = index - 1,
            e = index + 1,
            sw = index + cols - 1,
            s = index + cols,
            se = index + cols + 1;

          if (cell.value.name === "mine") {
            cell.value.setParent(cell);
          }

          if (this.isValid(row * cols - cols, row * cols - 1, nw)) {
            const adjCell = cells[nw];
            this.addEdge({ value: cell.value }, { value: adjCell.value });
          }
          if (this.isValid(row * cols - cols, row * cols - 1, n)) {
            const adjCell = cells[n];
            this.addEdge({ value: cell.value }, { value: adjCell.value });
          }
          if (this.isValid(row * cols - cols, row * cols - 1, ne)) {
            const adjCell = cells[ne];
            this.addEdge({ value: cell.value }, { value: adjCell.value });
          }
          if (this.isValid(row * cols, row * cols + cols - 1, w)) {
            const adjCell = cells[w];
            this.addEdge({ value: cell.value }, { value: adjCell.value });
          }
          if (this.isValid(row * cols, row * cols + cols - 1, e)) {
            const adjCell = cells[e];
            this.addEdge({ value: cell.value }, { value: adjCell.value });
          }
          if (
            this.isValid(row * cols + cols, row * cols + cols + cols - 1, sw)
          ) {
            const adjCell = cells[sw];
            this.addEdge({ value: cell.value }, { value: adjCell.value });
          }
          if (
            this.isValid(row * cols + cols, row * cols + cols + cols - 1, s)
          ) {
            const adjCell = cells[s];
            this.addEdge({ value: cell.value }, { value: adjCell.value });
          }
          if (
            this.isValid(row * cols + cols, row * cols + cols + cols - 1, se)
          ) {
            const adjCell = cells[se];
            this.addEdge({ value: cell.value }, { value: adjCell.value });
          }
        }
      }
      console.log(SweeperCell.getAllInstances());
    },
  },
});
