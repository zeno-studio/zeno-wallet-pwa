
import { startFromWorker } from "polkadot-api/smoldot/from-worker"
import SmWorker from "polkadot-api/smoldot/worker?worker"

// Starting smoldot on a Worker (strongly recommended)
export const smoldot = startFromWorker(new SmWorker())