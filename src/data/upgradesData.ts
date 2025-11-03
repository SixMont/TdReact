export const upgradesData = {
  add: {
    price: 50,
    description: "Add a slot to your turrets inventory."
  },
  damage: {
    price: 20,
    description: "Increase the damage of your turrets."
  },
  heart: {
    price: 25,
    description: "Increase the health of your turrets."
  },
  precision: {
    price: 10,
    description: "Increase the accuracy of your turrets."
  },
  rate: {
    price: 20,
    description: "Increase the fire rate of your turrets."
  },
  speed: {
    price: 10,
    description: "Increase the projectile speed of your turrets."
  }
} as const

export type UpgradesKey = keyof typeof upgradesData
