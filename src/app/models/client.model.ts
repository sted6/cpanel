import { Address } from './address';
import { AccountEvent } from './account-event';

export interface Client {
    firstName: string,
    lastName: string,
    phoneNumber: any,
    email: string,
    balance?: number,
    address?: Address,
    id?: string;
    accountRep?: string,
    accountEvents: AccountEvent[],
    socialSecurity?: any,
    birthday?: Date
}
