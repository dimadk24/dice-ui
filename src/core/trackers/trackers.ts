import { Utils } from '../../Utils'
import { LocalTracker } from './LocalTracker'
import { MixpanelTracker } from './MixpanelTracker'
import { TrackerInterface } from './tracker-utils'

const registeredTrackers = Utils.isProductionMode
  ? [MixpanelTracker]
  : [LocalTracker]

function call<T extends keyof Omit<TrackerInterface, 'AUTOMATIC_OPERATIONS'>>(
  method: T,
  ...args: Parameters<TrackerInterface[T]>
) {
  registeredTrackers.forEach((tracker) => {
    if (
      tracker.AUTOMATIC_OPERATIONS[0] === '*' ||
      tracker.AUTOMATIC_OPERATIONS.includes(method)
    ) {
      const fn = tracker[method]
      // @ts-ignore
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
