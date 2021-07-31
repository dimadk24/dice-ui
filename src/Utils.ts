import { MathUtils } from 'three'

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

  static getFovSize({
    cameraFov,
    cameraAspect,
    xDistance = 0,
    yDistance = 0,
    zDistance = 0,
  }: {
    cameraFov: number
    cameraAspect: number
    xDistance?: number
    yDistance?: number
    zDistance?: number
  }): number {
    const vFOV = MathUtils.degToRad(cameraFov) // convert vertical fov to radians
    // camera distance from the point
    const distance = Math.sqrt(xDistance ** 2 + yDistance ** 2 + zDistance ** 2)
    const height = 2 * Math.tan(vFOV / 2) * distance // visible height
    return height * cameraAspect // visible width
  }
}
