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
  const nodes: Array<{
    id: string
    type: string
    position: { x: number; y: number }
    data: { upgrade: UpgradesKey }
  }> = []
  
  const HORIZONTAL_SPACING = 200
  const VERTICAL_SPACING = 150
  
  // Construire la structure de l'arbre par niveau
  const levels: Map<number, UpgradesKey[]> = new Map()
  const nodeLevel: Map<UpgradesKey, number> = new Map()
  const parents: Map<UpgradesKey, UpgradesKey[]> = new Map()
  
  // Trouver tous les parents de chaque node
  upgradeKeys.forEach((key) => {
    const upgrade = upgradesData[key]
    const children = 'children' in upgrade && upgrade.children ? upgrade.children : []
    children.forEach((child) => {
      const childKey = child as UpgradesKey
      if (!parents.has(childKey)) {
        parents.set(childKey, [])
      }
      parents.get(childKey)!.push(key)
    })
  })
  
  // Assigner les niveaux avec BFS
  const queue: Array<{ key: UpgradesKey; level: number }> = []
  const visited = new Set<UpgradesKey>()
  
  // Trouver les racines (nodes sans parents)
  upgradeKeys.forEach((key) => {
    if (!parents.has(key) || parents.get(key)!.length === 0) {
      queue.push({ key, level: 0 })
    }
  })
  
  while (queue.length > 0) {
    const { key, level } = queue.shift()!
    
    if (visited.has(key)) continue
    visited.add(key)
    
    nodeLevel.set(key, level)
    
    if (!levels.has(level)) {
      levels.set(level, [])
    }
    levels.get(level)!.push(key)
    
    const upgrade = upgradesData[key]
    const children = 'children' in upgrade && upgrade.children ? upgrade.children : []
    children.forEach((child) => {
      const childKey = child as UpgradesKey
      if (!visited.has(childKey)) {
        queue.push({ key: childKey, level: level + 1 })
      }
    })
  }
  
  // Calculer les positions niveau par niveau
  const nodePositions = new Map<UpgradesKey, { x: number; y: number }>()
  const sortedLevels = Array.from(levels.keys()).sort((a, b) => a - b)
  
  sortedLevels.forEach((level) => {
    const nodesAtLevel = levels.get(level)!
    
    nodesAtLevel.forEach((key) => {
      const upgrade = upgradesData[key]
      const children = 'children' in upgrade && upgrade.children ? upgrade.children : []
      const nodeParents = parents.get(key) || []
      
      if (nodeParents.length === 0) {
        // Racine : position de base
        if (!nodePositions.has(key)) {
          // Calculer la position en fonction des enfants
          if (children.length === 0) {
            nodePositions.set(key, { x: 0, y: level * VERTICAL_SPACING })
          } else if (children.length === 1) {
            nodePositions.set(key, { x: 0, y: level * VERTICAL_SPACING })
          } else {
            // Plusieurs enfants : on centre le parent
            const totalChildWidth = (children.length - 1) * HORIZONTAL_SPACING
            nodePositions.set(key, { 
              x: totalChildWidth / 2, 
              y: level * VERTICAL_SPACING 
            })
          }
        }
      } else if (nodeParents.length === 1) {
        // Un seul parent
        const parent = nodeParents[0]
        const parentUpgrade = upgradesData[parent]
        const siblings = 'children' in parentUpgrade && parentUpgrade.children ? parentUpgrade.children : []
        
        if (siblings.length === 1) {
          // Enfant unique : centré sous le parent
          const parentPos = nodePositions.get(parent)!
          nodePositions.set(key, { x: parentPos.x, y: level * VERTICAL_SPACING })
        } else {
          // Plusieurs enfants : répartis horizontalement
          const parentPos = nodePositions.get(parent)!
          const siblingIndex = (siblings as readonly UpgradesKey[]).indexOf(key)
          const totalWidth = (siblings.length - 1) * HORIZONTAL_SPACING
          const startX = parentPos.x - totalWidth / 2
          nodePositions.set(key, { 
            x: startX + siblingIndex * HORIZONTAL_SPACING, 
            y: level * VERTICAL_SPACING 
          })
        }
      } else {
        // Plusieurs parents : centré entre eux
        const parentPositions = nodeParents.map(p => nodePositions.get(p)!.x)
        const minX = Math.min(...parentPositions)
        const maxX = Math.max(...parentPositions)
        const centerX = (minX + maxX) / 2
        nodePositions.set(key, { x: centerX, y: level * VERTICAL_SPACING })
      }
    })
  })
  
  // Créer les nodes
  nodePositions.forEach((position, key) => {
    nodes.push({
      id: key,
      type: "treeButton",
      position,
      data: { upgrade: key as UpgradesKey },
    })
  })
  
  return nodes
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
    <div style={{ width: "100%", height: "600px" }}>
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
        <Background />
      </ReactFlow>
    </div>
  )
}
