import { Utils } from '../../Utils'
import { LocalTracker } from './LocalTracker'
import { MixpanelTracker } from './MixpanelTracker'

const registeredTrackers = Utils.isProductionMode
  ? [MixpanelTracker]
  : [LocalTracker]

function call(method: string, ...args: Array<unknown>) {
  registeredTrackers.forEach((tracker) => {
    if (
      tracker.AUTOMATIC_OPERATIONS[0] === '*' ||
      tracker.AUTOMATIC_OPERATIONS.includes(method)
    ) {
      // @ts-ignore
      const fn = tracker[method]
      if (typeof fn !== 'function') {
        throw new Error(`Invalid tracker method: ${method}`)
      }
      fn(...args)
    }
  })
}

export const trackers = {
  identify(vkId: number): void {
    call('identify', vkId)
  },

  init(): void {
    call('init')
  },

  reachGoal(name: string, params?: Record<string, unknown>): void {
    call('reachGoal', name, params)
  },
}
