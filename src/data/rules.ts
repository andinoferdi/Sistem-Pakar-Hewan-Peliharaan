export interface Rule {
  id: string
  condition: (facts: Record<string, boolean>) => boolean
  conclusion: string
  description: string
}

export const rules: Rule[] = [
  {
    id: "Z1",
    condition: (facts) => facts.hasFur === true,
    conclusion: "isMammal",
    description: "Jika hewan memiliki bulu, maka hewan tersebut adalah mamalia",
  },
  {
    id: "Z2",
    condition: (facts) => facts.givesMilk === true,
    conclusion: "isMammal",
    description: "Jika hewan menghasilkan susu, maka hewan tersebut adalah mamalia",
  },
  {
    id: "Z3",
    condition: (facts) => facts.hasWings === true,
    conclusion: "isBird",
    description: "Jika hewan memiliki sayap, maka hewan tersebut adalah burung",
  },
  {
    id: "Z4",
    condition: (facts) => facts.swims === true && facts.hasScales === true,
    conclusion: "isFish",
    description: "Jika hewan berenang dan memiliki sisik, maka hewan tersebut adalah ikan",
  },
  {
    id: "Z5",
    condition: (facts) => facts.isMammal === true && facts.eatsMeat === true,
    conclusion: "isCarnivore",
    description: "Jika hewan adalah mamalia dan memakan daging, maka hewan tersebut adalah karnivora",
  },
  {
    id: "Z6",
    condition: (facts) => facts.isBird === true && facts.sings === true,
    conclusion: "isSongbird",
    description: "Jika hewan adalah burung dan bernyanyi/berkicau, maka hewan tersebut adalah burung penyanyi",
  },
  {
    id: "Z7",
    condition: (facts) => facts.isMammal === true && facts.hasLongEars === true && facts.hops === true,
    conclusion: "isRabbit",
    description:
      "Jika hewan adalah mamalia, memiliki telinga panjang, dan melompat, maka hewan tersebut adalah kelinci",
  },
  {
    id: "Z8",
    condition: (facts) => facts.isFish === true && facts.isColorful === true,
    conclusion: "isOrnamentalFish",
    description: "Jika hewan adalah ikan dan berwarna-warni, maka hewan tersebut adalah ikan hias",
  },
  {
    id: "Z9",
    condition: (facts) => facts.isCarnivore === true && facts.meows === true,
    conclusion: "isCat",
    description: "Jika hewan adalah karnivora dan mengeong, maka hewan tersebut adalah kucing",
  },
  {
    id: "Z10",
    condition: (facts) => facts.isCarnivore === true && facts.barks === true,
    conclusion: "isDog",
    description: "Jika hewan adalah karnivora dan menggonggong, maka hewan tersebut adalah anjing",
  },
  {
    id: "Z11",
    condition: (facts) => facts.isSongbird === true && facts.livesInCage === true,
    conclusion: "isPetBird",
    description:
      "Jika hewan adalah burung penyanyi dan tinggal di sangkar, maka hewan tersebut adalah burung peliharaan",
  },
  {
    id: "Z12",
    condition: (facts) => facts.isFish === true && facts.livesInAquarium === true,
    conclusion: "isPetFish",
    description: "Jika hewan adalah ikan dan hidup di akuarium, maka hewan tersebut adalah ikan peliharaan",
  },
  {
    id: "Z13",
    condition: (facts) => facts.isRabbit === true && facts.hasSoftFur === true,
    conclusion: "isPetRabbit",
    description:
      "Jika hewan adalah kelinci dan memiliki bulu yang lembut, maka hewan tersebut adalah kelinci peliharaan",
  },
  {
    id: "Z14",
    condition: (facts) => facts.isMammal === true && facts.isLoyalToHuman === true,
    conclusion: "isPetDog",
    description: "Jika hewan adalah mamalia dan setia kepada manusia, maka hewan tersebut adalah anjing peliharaan",
  },
]
