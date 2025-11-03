export const turretsData = {
  circle: {
    center: {
      damage: 10,
      range: 10,
      fireRate: "1 shot/sec",
    },
    border: {
      multiplier: 1,
      compatibility: ["circle", "ovalHorizontal", "ovalVertical"],
      dockingPort: 4,
    },
    description: "balanced stats",
  },
  ovalHorizontal: {
    center: {
      damage: 20,
      range: 20,
      fireRate: "0.8 shot/sec",
    },
    border: {
      multiplier: 2,
      compatibility: ["circle", "ovalHorizontal", "ovalVertical"],
      dockingPort: 2,
    },
    description: "high damage and range",
  },
  ovalVertical: {
    center: {
      damage: 10,
      range: 5,
      fireRate: "2 shot/sec",
    },
    border: {
      multiplier: 2,
      compatibility: ["circle", "ovalHorizontal", "ovalVertical"],
      dockingPort: 2,
    },
    description: "high fire rate",
  },
  ovalDiagonalLeft: {
    center: {
      damage: 5,
      range: 20,
      fireRate: "1.5 shot/sec",
    },
    border: {
      multiplier: 4,
      compatibility: ["ovalDiagonalLeft", "ovalDiagonalRight"],
      dockingPort: 2,
    },
    description: "high range and fire rate",
  },
  ovalDiagonalRight: {
    center: {
      damage: 15,
      range: 15,
      fireRate: "1.2 shot/sec",
    },
    border: {
      multiplier: 4,
      compatibility: ["ovalDiagonalLeft", "ovalDiagonalRight"],
      dockingPort: 2,
    },
    description: "balanced stats",
  },
} as const

export type TurretKey = keyof typeof turretsData
