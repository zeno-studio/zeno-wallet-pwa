import { type Transaction, type Nft } from '$lib/wallet/provider';
class QueriedData {
	ankrNftBalances: Nft[] | null = $state(null);
	ankrActivities: Transaction[] | null = $state(null);
}

export const queriedData = new QueriedData();
