<script lang="ts">
import {jsonP1} from "$lib/wallet/provider/jsonProvider"

import { createClient } from "polkadot-api"
import { getSmProvider } from "polkadot-api/sm-provider"
import { smoldot } from "$lib/wallet/common"
import { AnkrProvider, type GetAccountBalanceReply } from '@ankr.com/ankr.js';
 
const provider = new AnkrProvider('https://rpc.ankr.com/multichain/a1cc506b1783ef5d0cbee73d4997f21996d1624933c09155f6e5990028f3ee7a');

/* import { wnd } from "@polkadot-api/descriptors" */
/* 
const smoldotWndChain = import("polkadot-api/chains/westend2").then(
  ({ chainSpec }) => smoldot.addChain({ chainSpec }),
)

const jsonRpcProvider = getSmProvider(smoldotWndChain)
const connection = createClient(jsonRpcProvider)
const wndApi = connection.getTypedApi(wnd)



const addr = '0xeDf074bd2c3FC10A296E7C9c52BfD80ab5d2A9E9';

let myAccount = "1489ApV6z3YdCYYP3U6dnH5G1j46nY8QC8gVPLZ5w7YSULZZ"
 */



  let data = $state <GetAccountBalanceReply>();


        const balances = async () => {
  return await provider.getAccountBalance({
    blockchain: 'eth',
    walletAddress: '0x8fF448Ed0C027DbE9F5AdD62e6fAEE439EAc0259',
  }).then((res) => data = res);
};

balances();


</script>


<div class="appContainer">
	<div class="appBody">
        <div id="itemContainer">
            
        </div>
       <img src={data?.assets[0].thumbnail} alt="">
		
	</div>
</div>

<style lang="postcss">
.appBody {
        max-width: 464px;
    }

</style>
