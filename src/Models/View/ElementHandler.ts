import stamp from "tp-stampit";
import { InstanceCounter } from "../Helpers/InstanceCounter";

export const ElementHandler = stamp(InstanceCounter, {
  props: {
    element: null,
  },
  init({ element = this.element, className = null }) {
    if (element !== null) {
      this.element = document.createElement(element);
    }
    if (className !== null) {
      this.element.className += className;
    }
  },
  methods: {
    renderElem(rootElement: HTMLElement): void {
      rootElement.append(this.element);
    },
    appendElem(child: typeof stamp): void {
      this.element.append(child.element);
    },
    removeElem(child: typeof stamp): void {
      this.element.removeChild(child.element);
    },
    addClass(...args: string[]): void {
      args.forEach((className: string) => {
        this.element.classList.add(className);
      });
    },
    remClass(...args: string[]): void {
      args.forEach((className: string) => {
        this.element.classList.remove(className);
      });
    },
    addAttr(...args: [string, any][]): void {
      args.forEach(([key, value]) => {
        this.element.setAttribute(key, value);
      });
    },
    remAttr(...args: string[]): void {
      args.forEach((key) => {
        this.element.removeAttribute(key);
      });
    },
    hasAttr(key: string): boolean {
      return this.element.hasAttribute(key) ? true : false;
    },
    addText(text: string): void {
      this.element.textContent = text;
    },
    remText() {
      this.element.textContent = "";
    },
    hasElem(child: typeof stamp): boolean {
      for (let node of this.element.children) {
        if (node === child.element) return true;
      }
      return false;
    },
    style(props: { [key: string]: string | number }): void {
      Object.assign(this.element.style, props);
    },
  },
});
