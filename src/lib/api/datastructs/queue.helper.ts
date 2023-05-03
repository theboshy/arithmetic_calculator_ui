import { toast } from "react-toastify";
import { TOAST_OPTIONS } from "../../toast.config/toast.config";

export class QueueHelper<T> {
    private data: T[] = [];

    enqueue(item: T) {
        this.data.push(item);
    }

    dequeue(): T | undefined {
        return this.data.shift();
    }

    isEmpty(): boolean {
        return this.data.length === 0;
    }

    peek(): T | undefined {
        return !this.isEmpty() ? this.data[0] : undefined;
    }

    size(): number {
        return this.data.length;
    }

    toArray(): T[] {
        return [...this.data];
    }
}


export interface QueueItem {
    id: string;
    items: any[] | undefined;
}

export const getElementInQueue = (queue: any, id: string, direction: string = "next"): QueueItem | null => {
    let item: QueueItem | null = null;
    try {
        const index = queue.findIndex((item: any) => item.id === id);
        if (index !== -1) {
            if (direction === 'next' && index < queue.length - 1) {
                item = queue[index + 1];
            } else if (direction === 'previous' && index > 0) {
                item = queue[index - 1];
            } else {
                toast.error('internal error occurred', TOAST_OPTIONS);
            }
        } else {
            toast.error('internal error occurred', TOAST_OPTIONS);
        }
    } catch (error) {
        toast.error('internal error occurred', TOAST_OPTIONS);
    }
    return item;
}