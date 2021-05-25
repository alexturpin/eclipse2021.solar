import Bugsnag from "@bugsnag/js"
import BugsnagPluginReact from "@bugsnag/plugin-react"

Bugsnag.start({
  // @ts-expect-error
  apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
  plugins: [new BugsnagPluginReact()],
})

export { Bugsnag }
