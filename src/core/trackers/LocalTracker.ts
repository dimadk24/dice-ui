/* eslint-disable no-console */
import { createTracker, TrackerInterface } from './tracker-utils'

export const LocalTracker: TrackerInterface = createTracker({
  async init(): Promise<void> {
    console.log('Init tracker')
  },

  async identify(vkId: number): Promise<void> {
    console.log(`linked session with vkId ${vkId}`)
  },

  async reachGoal(
    name: string,
    params?: Record<string, unknown>
  ): Promise<void> {
    if (!params) console.log(`Reach goal ${name}`)
    else console.log(`Reach goal ${name} with params`, params)
  },
})

/* eslint-enable no-console */
