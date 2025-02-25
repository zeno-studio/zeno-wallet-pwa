
export type Toast = {
    id: string;
    title: string;
    message: string;
};

export class ToastState {
    toasts = $state<Toast[]>([]);
    private toastToTimeoutMap = new Map<string, number>();

    constructor() {
        window.addEventListener('beforeunload', () => this.cleanup());
    }

    private cleanup() {
        for (const timeout of this.toastToTimeoutMap.values()) {
            clearTimeout(timeout);
        }
        this.toastToTimeoutMap.clear();
    }

    add(title: string, message: string, durationMs = 5000) {
        const id = crypto.randomUUID();
        this.toasts = [...this.toasts, { id, title, message }];

        const timeoutId = window.setTimeout(() => {
            this.remove(id);
        }, durationMs);

        this.toastToTimeoutMap.set(id, timeoutId);
        return id;
    }

    remove(id: string) {
        const timeoutId = this.toastToTimeoutMap.get(id);
        if (timeoutId) {
            clearTimeout(timeoutId);
            this.toastToTimeoutMap.delete(id);
        }
        this.toasts = this.toasts.filter(toast => toast.id !== id);
    }

    clear() {
        this.cleanup();
        this.toasts = [];
    }
}

export const toastState = new ToastState();