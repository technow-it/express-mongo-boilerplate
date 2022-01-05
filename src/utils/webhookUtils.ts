import config from '@/config'

type WEBHOOK = 'ERROR' | 'LOGGER'

const WEBHOOK_URLS = {
  ERROR: config.errorWebhookUrl,
  LOGGER: config.loggerWebhookUrl,
}
import axios from 'axios'
export interface Webhook {
  content: string
}

class WebhookUtils {
  constructor() {}

  public async sendWebhook(type: WEBHOOK, message: string) {
    const webhook_url = WEBHOOK_URLS[type]
    if (webhook_url === undefined) return console.log('Webhook url not configured ' + type)

    const webhook: Webhook = { content: message }
    try {
      axios.post(webhook_url, webhook, { headers: { 'Content-Type': 'application/json' } })
    } catch (e) {
      console.log('failing send webhook ' + type)
    }
    return true
  }
}

export default new WebhookUtils()
