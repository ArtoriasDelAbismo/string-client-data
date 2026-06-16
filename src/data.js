export const caliberOptions = [1.15, 1.18, 1.20, 1.23, 1.24, 1.25, 1.28, 1.30, 1.35];

export const racketOptions = [];
export const stringsOptions = [];
export const tensionOptions = Array.from({ length: 60 - 11 + 1 }, (_, i) =>
  (60 - i)
);

export const demosOptions = [
  {
    "brand": "Volkl",
    "models": ["Vostra v9 305g", "Vostra v8 300g", "Vostra v8 265g", "Vostra v6 275g"]
  },
  {
    "brand": "Head",
    "models": ["Gravity MP", "Extreme MP", "Speed MP", "Boom MP", "Boom Team"]
  },
  {
    "brand": "Wilson",
    "models": ["Blade 98 16x19", "Blade 100", "Pro Staff 97", "Shift 99", "Ultra 100"]
  },
  {
    "brand": "Babolat",
    "models": ["Pure Drive", "Pure Drive 98", "Pure Strike 100"]
  },
  {
    "brand": "Yonex",
    "models": ["Vcore 98"]
  }
]