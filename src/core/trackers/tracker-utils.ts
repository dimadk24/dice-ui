export interface TrackerInterface {
  AUTOMATIC_OPERATIONS: Array<string>
  init: () => Promise<void>
  identify: (vkId: number) => Promise<void>
  reachGoal: (name: string, params?: Record<string, unknown>) => Promise<void>
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

type TrackerInput = Optional<TrackerInterface, 'AUTOMATIC_OPERATIONS'>

export const createTracker = (tracker: TrackerInput): TrackerInterface => ({
  AUTOMATIC_OPERATIONS: ['*'],
  ...tracker,
})
