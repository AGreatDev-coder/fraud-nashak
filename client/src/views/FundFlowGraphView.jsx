import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  MiniMap, 
  useNodesState, 
  useEdgesState 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { INITIAL_GRAPH_NODES, INITIAL_GRAPH_EDGES } from '../data/mockGraphData';
import { getGraphTopology } from '../services/api';
import CustomAccountNode from '../components/graph/CustomAccountNode';
import GraphControlsBar from '../components/graph/GraphControlsBar';
import GraphLegend from '../components/graph/GraphLegend';
import GraphDetailDrawer from '../components/graph/GraphDetailDrawer';
import { Download } from 'lucide-react';

const nodeTypes = {
  accountNode: CustomAccountNode,
};

export default function FundFlowGraphView({ onNavigateToAccount }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_GRAPH_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_GRAPH_EDGES);

  const [searchQuery, setSearchQuery] = useState('');
  const [highlightSyndicate, setHighlightSyndicate] = useState(true);
  const [minAmountFilter, setMinAmountFilter] = useState(0);
  const [riskFilter, setRiskFilter] = useState('ALL');

  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState(null);

  // Stage 7: API integration state
  const [graphSource, setGraphSource] = useState('mock'); // 'api' | 'mock'
  const [isLoadingGraph, setIsLoadingGraph] = useState(true);
  const [graphMeta, setGraphMeta] = useState({
    totalNodes: INITIAL_GRAPH_NODES.length,
    totalEdges: INITIAL_GRAPH_EDGES.length,
    syndicateCount: 1,
  });

  // Load graph topology from backend on mount
  useEffect(() => {
    let isMounted = true;
    setIsLoadingGraph(true);

    getGraphTopology().then((data) => {
      if (!isMounted) return;

      if (data && data.nodes && data.nodes.length > 0 && data.edges && data.edges.length > 0) {
        // Map server nodes to React Flow format (server sends position + data fields)
        const apiNodes = data.nodes.map((n) => ({
          id: n.id,
          type: 'accountNode',
          position: n.position || { x: 0, y: 0 },
          data: n.data || n,
        }));

        // Map server edges preserving suspicious-path styling
        const apiEdges = data.edges.map((e) => {
          const isSuspicious = e.data?.isSuspiciousPath ?? e.isSuspiciousPath ?? false;
          return {
            id: e.id,
            source: e.source,
            target: e.target,
            animated: isSuspicious,
            style: e.style || (isSuspicious
              ? { stroke: '#EF4444', strokeWidth: 2.5 }
              : { stroke: '#94A3B8', strokeWidth: 1.5 }),
            data: e.data || {},
          };
        });

        setNodes(apiNodes);
        setEdges(apiEdges);
        setGraphSource('api');
        setGraphMeta({
          totalNodes: data.totalNodes || apiNodes.length,
          totalEdges: data.totalEdges || apiEdges.length,
          syndicateCount: data.syndicateCount || 1,
        });
      } else {
        // API offline or returned empty — keep client mock data
        setGraphSource('mock');
        setGraphMeta({
          totalNodes: INITIAL_GRAPH_NODES.length,
          totalEdges: INITIAL_GRAPH_EDGES.length,
          syndicateCount: 1,
        });
      }
      setIsLoadingGraph(false);
    });

    return () => { isMounted = false; };
  }, []);

  // Filtered nodes based on search / risk filter
  const filteredNodes = useMemo(() => {
    return nodes.filter((n) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          n.data.holderName?.toLowerCase().includes(q) ||
          n.data.bank?.toLowerCase().includes(q) ||
          n.data.accountNumber?.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (riskFilter === 'SUSPICIOUS_ONLY' && n.data.riskScore < 60) {
        return false;
      }
      return true;
    });
  }, [nodes, searchQuery, riskFilter]);

  // Filtered and styled edges
  const filteredEdges = useMemo(() => {
    const visibleNodeIds = new Set(filteredNodes.map(n => n.id));

    return edges
      .filter((e) => {
        if (!visibleNodeIds.has(e.source) || !visibleNodeIds.has(e.target)) return false;
        if (minAmountFilter > 0 && e.data?.rawAmount < minAmountFilter) return false;
        return true;
      })
      .map((e) => {
        if (highlightSyndicate && e.data?.isSuspiciousPath) {
          return {
            ...e,
            animated: true,
            style: {
              ...e.style,
              stroke: '#DC2626',
              strokeWidth: 3.5,
              filter: 'drop-shadow(0 0 6px rgba(220, 38, 38, 0.4))',
            }
          };
        }
        return e;
      });
  }, [edges, filteredNodes, minAmountFilter, highlightSyndicate]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedItem(node);
    setItemType('node');
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedItem(edge);
    setItemType('edge');
  }, []);

  const handleReset = () => {
    setSearchQuery('');
    setHighlightSyndicate(true);
    setMinAmountFilter(0);
    setRiskFilter('ALL');
    setSelectedItem(null);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Fund-Flow &amp; Relationship Graph
            </h1>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
              graphSource === 'api'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {isLoadingGraph ? '○ Loading…' : graphSource === 'api' ? '● API Connected' : '● Synthetic Fallback'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Directed financial transaction vectors, topological mule rings, and multi-hop layering paths.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Graph telemetry summary */}
          {!isLoadingGraph && (
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
              <span><strong className="text-slate-800">{graphMeta.totalNodes}</strong> Nodes</span>
              <span className="text-slate-300">|</span>
              <span><strong className="text-slate-800">{graphMeta.totalEdges}</strong> Edges</span>
              <span className="text-slate-300">|</span>
              <span className="text-red-600 font-semibold">{graphMeta.syndicateCount} Syndicate Ring{graphMeta.syndicateCount !== 1 ? 's' : ''}</span>
            </div>
          )}

          <button
            onClick={() => alert('Exporting SVG topological relationship map...')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-surface hover:bg-slate-50 border border-surface-border rounded-lg shadow-xs transition-colors self-start md:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Graph SVG</span>
          </button>
        </div>
      </div>

      {/* Floating Controls Bar */}
      <GraphControlsBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        highlightSyndicate={highlightSyndicate}
        setHighlightSyndicate={setHighlightSyndicate}
        minAmountFilter={minAmountFilter}
        setMinAmountFilter={setMinAmountFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        onReset={handleReset}
      />

      {/* React Flow Canvas Container */}
      <div className="relative w-full h-[640px] rounded-2xl border border-surface-border overflow-hidden bg-slate-50/50 shadow-inner">

        {/* Loading overlay */}
        {isLoadingGraph && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-600">Loading graph topology from API…</p>
            </div>
          </div>
        )}

        <ReactFlow
          nodes={filteredNodes}
          edges={filteredEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={1.8}
        >
          <Background color="#CBD5E1" gap={20} size={1} />
          <Controls className="bg-surface border border-slate-200 rounded-lg shadow-sm" />
          <MiniMap
            nodeColor={(n) => {
              if (n.data?.riskScore >= 80) return '#DC2626';
              if (n.data?.riskScore >= 60) return '#F59E0B';
              return '#10B981';
            }}
            className="border border-slate-200 rounded-lg shadow-sm bg-white"
          />
        </ReactFlow>

        {/* Floating Canvas Legend */}
        <div className="absolute bottom-5 left-5 z-10">
          <GraphLegend />
        </div>

        {/* Selected Node / Edge Detail Inspector Drawer */}
        <GraphDetailDrawer
          selectedItem={selectedItem}
          itemType={itemType}
          onClose={() => setSelectedItem(null)}
          onNavigateToAccount={onNavigateToAccount}
        />
      </div>
    </div>
  );
}
