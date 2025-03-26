
import { dbStore, getElement,addElement, editElement,removeElement, type Settings,type AddressBook} from '$lib/wallet/common';
import { SvelteMap } from 'svelte/reactivity';

class AddressBookState {
    selectedAddress = $state<AddressBook|null>(null);
    addressBookAll = $state(new SvelteMap<string, AddressBook>());

    async getAddressBook(address:string) {
        const addressBook = (await getElement(dbStore.AddressBook.name, address)) as AddressBook | null;
        if (addressBook) {
            this.selectedAddress = addressBook;
        }
        
    } 

    async getAllAddressBook() {
        const addressBookList = (await getElement(dbStore.AddressBook.name, "all")) as AddressBook[];
        this.addressBookAll = new SvelteMap(addressBookList.map((addressBook) => [addressBook.address, addressBook]));
    }

    updateAddressBook(addressBook: AddressBook) {
        this.selectedAddress = addressBook;
        editElement(dbStore.AddressBook.name, addressBook);
        this.updateAddressBookAll(addressBook);
    }

    updateAddressBookAll(addressBook: AddressBook) {
        this.addressBookAll.set(addressBook.address, addressBook);
    }

    removeAddressBook(address: string) {
        removeElement(dbStore.AddressBook.name, address);
        this.addressBookAll.delete(address);
    }

    addAddressBook(addressBook: AddressBook) {
        addElement(dbStore.AddressBook.name, addressBook);
        this.addressBookAll.set(addressBook.address, addressBook);
    }


}

export const addressBookState = new AddressBookState();
