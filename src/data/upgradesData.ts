export const upgradesData = {
  add: {
    price: 50,
    description: "Add a slot to your turrets inventory.",
    children: ["rate", "damage"],
  },
  damage: {
    price: 20,
    description: "Increase the damage of your turrets.",
    children: ["precision"],
  },
  rate: {
    price: 20,
    description: "Increase the fire rate of your turrets.",
    children: ["speed"],
  },
  precision: {
    price: 10,
    description: "Increase the accuracy of your turrets.",
    children: ["heart"],
  },
  speed: {
    price: 10,
    description: "Increase the projectile speed of your turrets.",
    children: ["heart"],
  },
  heart: {
    price: 25,
    description: "Increase the health of your turrets.",
    children: [],
  },
} as const

export type UpgradesKey = keyof typeof upgradesData
