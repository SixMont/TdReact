import TreeButton from "../common/TreeButton"
import { upgradesData, type UpgradesKey } from "../../data/upgradesData"
import { useCallback, useMemo } from "react"
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Edge,
  type Connection,
} from "reactflow"

export default function UpgradeTree() {
  const upgradeKeys = Object.keys(upgradesData) as UpgradesKey[]
    
    const initialNodes = useMemo(() => {
      return upgradeKeys.map((key) => ({
        id: key,
        type: "treeButton",
        position: {
          x: upgradesData[key].x,
          y: upgradesData[key].y,
        },
        data: { upgrade: key },
      }))
    }, [upgradeKeys])

  const initialEdges = useMemo(() => {
    const edges: Edge[] = []
    upgradeKeys.forEach((parent) => {
      const upgrade = upgradesData[parent]
      if ("children" in upgrade && upgrade.children) {
        const children: UpgradesKey[] =
          upgrade.children as unknown as UpgradesKey[]
        children.forEach((child: string) => {
          edges.push({
            id: `e-${parent}-${child}`,
            source: parent,
            target: child,
            animated: true,
            type: "smoothstep",
          })
        })
      }
    })
    return edges
  }, [upgradeKeys])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const nodeTypes = useMemo(() => ({ treeButton: TreeButton }), [])

  return (
    <div className="upgrade-tree">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesDraggable={false}
        nodesConnectable={false}
        fitView
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  )
}
