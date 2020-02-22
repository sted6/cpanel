import { Timestamp } from '@firebase/firestore-types';

export interface AccountEvent {
    type: string,
    amount: number,
    date: any
}
