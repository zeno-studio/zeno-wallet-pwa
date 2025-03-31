
import { dbStore, getElement,addElement, editElement,removeElement, type Settings,type AddressBook} from '$lib/wallet/common';


class AddressBookState {
    selectedAddress = $state<AddressBook|null>(null);
    addressBookAll = $state<AddressBook[]>([]);

    async getAllAddressBook() {
        this.addressBookAll = (await getElement(dbStore.AddressBook.name, "all")) as AddressBook[];
    }

    async getAddressBook(address: string) {
        const addressBook = (await getElement(dbStore.AddressBook.name, address)) as AddressBook | null;
        if (addressBook) {
            this.selectedAddress = addressBook;
        }
    }

    async addAddressBook(addressBook: AddressBook) {
        addElement(dbStore.AddressBook.name, addressBook);
        this.addressBookAll.push(addressBook);
    }

    async updateAddressBook(addressBook: AddressBook) {
        editElement(dbStore.AddressBook.name, addressBook);
        this.addressBookAll = this.addressBookAll.map((addressBook) => {
            if (addressBook.address === addressBook.address) {
                return addressBook;
            }
            return addressBook;
        });
    }

    async removeAddressBook(address: string) {
        removeElement(dbStore.AddressBook.name, address);
        this.addressBookAll = this.addressBookAll.filter((addressBook) => addressBook.address !== address);
    }

    

}

export const addressBookState = new AddressBookState();
