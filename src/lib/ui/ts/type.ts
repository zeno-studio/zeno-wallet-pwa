
export interface ModalContext {
    isModalOpen: () => boolean;
    closeModal: () => void;
    currentPage:() => number;
    updatePageTitle: (newPage: number, newTitle: string) => void;
}