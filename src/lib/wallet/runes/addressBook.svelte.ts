
import { dbStore, getElement,addElement, editElement,removeElement, type AddressEntry,type Account} from '$lib/wallet/common';


class AddressBook {
    scanedAddress = $state('');
    selectedEntry = $state<AddressEntry|Account|null>(null);
    addressBook = $state<AddressEntry[]>([]);

    async getAddressBook() {
        this.addressBook = (await getElement(dbStore.AddressBook.name, "all")) as AddressEntry[];
    }

    addAddressEntry(newEntry: AddressEntry) {
        const existingAddress = this.addressBook.find(a => a.address === newEntry.address);
        if (existingAddress) {
            throw new Error('Address Already Exists');
        }
        this.addressBook.push(newEntry);
        addElement(dbStore.AddressBook.name, newEntry);
    }
    removeAddressEntry(newEntry: AddressEntry) {
		this.addressBook = this.addressBook.filter(a => a.address !== newEntry.address);
		removeElement(dbStore.AddressBook.name, newEntry.address);
	}
    editAddressEntry(newEntry: AddressEntry) {
        const index = this.addressBook.findIndex(a => a.address === newEntry.address);
        this.addressBook[index] = newEntry;
        editElement(dbStore.AddressBook.name, newEntry);
    }

}
export const addressBook = new AddressBook();
