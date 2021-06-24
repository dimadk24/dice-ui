export class URLUtils {
  static getHashParam(name: string): string {
    const hashParams = new URLSearchParams(window.location.hash.slice(1))
    return hashParams.get(name) || ''
  }
}
