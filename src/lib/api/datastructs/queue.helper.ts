export class QueueHelper {
    private data: QueueItem[] = [];
    private ids: Set<string> = new Set();

    constructor(initialData: any) {
        initialData.forEach((item: any) => this.enqueue(item, item.id));
    }

    enqueue(items: any, id: string) {
        if (this.ids.has(id)) {
            throw new Error(`ID ${id} already exists in the queue`);
        }
        this.data.push({ id, items });
        this.ids.add(id);
    }

    dequeue(): any | undefined {
        const item = this.data.shift();
        if (item) {
            const id = this.getId(item);
            this.ids.delete(id);
        }
        return item;
    }

    isEmpty(): boolean {
        return this.data.length === 0;
    }

    peek(): any | undefined {
        return !this.isEmpty() ? this.data[0] : undefined;
    }

    size(): number {
        return this.data.length;
    }

    toArray(): any[] {
        return [...this.data];
    }

    getLastItem(): any | undefined {
        return this.data[this.data.length - 1];
    }

    private getId(item: any): string {
        // This assumes that the ID is stored in a property called "id"
        // Modify this function if the ID is stored elsewhere
        return (item as any).id;
    }
}


export type QueueItem = {
    id: string;
    items: [any];
};

export const getElementInQueue = (
    queue: QueueHelper,
    id: string,
    direction: string = "next"
): QueueItem | null => {
    let item: QueueItem | any;
    try {
        const items = queue.toArray();
        const index = items.findIndex((item: any) => item.id === id);
        if (index !== -1) {
            if (direction === "next" && index < items.length - 1) {
                item = items[index + 1];
            } else if (direction === "previous" && index > 0) {
                item = items[index - 1];
            }
        }
    } catch (error) {
        //todo: handle local
        console.log(error);
    }
    return item;
};