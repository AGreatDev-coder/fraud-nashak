import { GRAPH_NODES, GRAPH_EDGES } from '../data/mockGraphData.js';

export const getGraphTopology = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        nodes: GRAPH_NODES,
        edges: GRAPH_EDGES,
        syndicateCount: 1,
        totalNodes: GRAPH_NODES.length,
        totalEdges: GRAPH_EDGES.length
      }
    });
  } catch (error) {
    next(error);
  }
};
