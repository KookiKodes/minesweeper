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
		appendElem(...args): void {
			args.forEach((child) => {
				this.element.append(child.element);
			});
		},
		removeElem(...args): void {
			args.forEach((child) => {
				try {
					this.element.removeChild(child.element);
				} catch (error) {
					console.log(
						"This is from trying to remove an child element that does not exist within the parent"
					);
				}
			});
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
		addText(...args: string[]): void {
			this.remText();
			args.forEach((text) => {
				this.element.textContent += text;
			});
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
	propertyDescriptors: {
		name: { value: "element-handler" },
	},
});
