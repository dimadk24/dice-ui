export class Utils {
  static isProductionMode = process.env.NODE_ENV === 'production'

  static generateRandom(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  static changeSignRandomly(number: number): number {
    return Utils.generateRandom(0, 1) === 0 ? -number : number
  }

  static generateRandomWithRandomSign(min: number, max: number): number {
    return Utils.changeSignRandomly(Utils.generateRandom(min, max))
  }
}
