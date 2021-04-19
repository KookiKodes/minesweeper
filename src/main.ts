import "./styles/global.css";
import { SweeperBoard } from "./Models/Game/SweeperBoard";
import { Timer } from "./Models/Game/Timer";
import { Text } from "./Models/View/Text";
import { Button } from "./Models/View/Button";
import { start } from "node:repl";

const app = document.querySelector(".app");
const board = SweeperBoard({
  size: [10, 10],
  cellSize: 70,
  className: "board",
});
board.renderElem(app);
