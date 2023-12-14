export type Purpose = 'payment' | 'ordinals';

export type Account = {
    address: string;
    publicKey: string;
    purpose: Purpose;
};
