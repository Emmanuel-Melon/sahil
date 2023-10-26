import { create } from 'zustand';

type OrderItem = {
    productId: string;
    quantity: number;
};

type OrderItemsStore = {
    orderItems: OrderItem[];
    addOrderItem: (item: OrderItem) => void;
    removeOrderItem: (item: OrderItem) => void;
    updateOrderItem: (item: OrderItem) => void;
};

const INITIAL_STATE = {
    products: [],
    isLoading: false,
    error: null,
}

export const useOrderItemsStore = create<OrderItemsStore>((set) => ({
    orderItems: [],
    addOrderItem: (item) =>
        set((state) => {
            const existingItem = state.orderItems.find((i) => i.productId === item.productId);
            if (existingItem) {
                // If the item already exists, update its quantity
                const updatedItems = state.orderItems.map((i) => {
                    if (i.productId === item.productId) {
                        return { ...i, quantity: i.quantity + item.quantity };
                    }
                    return i;
                });
                return { orderItems: updatedItems };
            } else {
                // If the item is not in the orderItems, add it
                return { orderItems: [...state.orderItems, item] };
            }
        }),
    removeOrderItem: (item) =>
        set((state) => {
            const updatedItems = state.orderItems.filter((i) => i.productId !== item.productId);
            return { orderItems: updatedItems };
        }),
    updateOrderItem: (item) =>
        set((state) => {
            const existingItem = state.orderItems.find((i) => i.productId === item.productId);
            if (existingItem) {
                // If the item already exists, update its quantity
                const updatedItems = state.orderItems.map((i) => {
                    if (i.productId === item.productId) {
                        return { ...i, quantity: item.quantity };
                    }
                    return i;
                });
                return { orderItems: updatedItems };
            } else {
                // If the item is not in the orderItems, do nothing
                return state;
            }
        })
}));
