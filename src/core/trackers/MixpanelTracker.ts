import mixpanel from 'mixpanel-browser'
import { createTracker, TrackerInterface } from './tracker-utils'
import { URLUtils } from '../../URLUtils'

const MIXPANEL_ID = process.env.REACT_APP_MIXPANEL_ID as string
const MIXPANEL_PROXY_HOST = process.env.REACT_APP_MIXPANEL_PROXY_HOST as string

export const MixpanelTracker: TrackerInterface = createTracker({
  async init() {
    mixpanel.init(MIXPANEL_ID, { api_host: MIXPANEL_PROXY_HOST })
  },

  async identify(vkId: number): Promise<void> {
    const userParams = {
      'utm source': URLUtils.getHashParam('utm_source'),
    }
    mixpanel.identify(String(vkId))
    mixpanel.people.set_once(userParams)
    mixpanel.register_once(userParams)
  },

  async reachGoal(
    name: string,
    params?: Record<string, unknown>
  ): Promise<void> {
    mixpanel.track(name, params)
  },
})
