import stamp from "tp-stampit";
import { GraphNode } from "./GraphNode";

export const Graph = stamp({
  statics: {
    DIRECTED: Symbol("DIRECTED"),
    UNDIRECTED: Symbol("UNDIRECTED"),
  },
  props: {
    nodes: null,
    edgeDirection: null,
    nodeType: GraphNode,
  },
  init({ edgeDirection = this.edgeDirection, nodeType = this.nodeType }) {
    this.nodes = new Map();
    this.edgeDirection = edgeDirection;
    this.nodeType = nodeType;
  },
  methods: {
    addVertex(props: any) {
      if (this.nodes.has(props.value)) {
        return this.nodes.get(props.value);
      }
      const vertex = this.nodeType({ ...props });
      this.nodes.set(props.value, vertex);
      return vertex;
    },
    removeVertex(value: any) {
      const current = this.nodes.get(value);
      if (current) {
        Array.from(this.nodes.values()).forEach((node: any) =>
          node.removeAdjacent(value)
        );
      }
      return this.nodes.delete(value);
    },
    addEdge(source: any, target: any) {
      const sourceNode = this.addVertex(source);
      const targetNode = this.addVertex(target);

      if (this.edgeDirection === Graph.UNDIRECTED) {
        targetNode.addAdjacent(sourceNode);
      }

      return [sourceNode, targetNode];
    },

    removeEdge(source: any, target: any) {
      const sourceNode = this.nodes.get(source);
      const targetNode = this.nodes.get(target);

      if (sourceNode && targetNode) {
        sourceNode.removeAdjacent(targetNode);
        if ((this.edgeDirection = Graph.UNDIRECTED)) {
          targetNode.removeAdjacent(sourceNode);
        }
      }
    },
  },
});
