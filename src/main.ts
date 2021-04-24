import "./styles/global.css";
import { MineSweeper } from "./Models/Game/MineSweeper";

const app = document.querySelector(".app");

const minesweeper = MineSweeper({ className: "minesweeper" });

minesweeper.renderElem(app);
