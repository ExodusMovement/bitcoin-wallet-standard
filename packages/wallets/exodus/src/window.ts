export interface ExodusEvent {
    /** TODO: Add events. */
}

export interface ExodusEventEmitter {
    on<E extends keyof ExodusEvent>(event: E, listener: ExodusEvent[E], context?: any): void;
    off<E extends keyof ExodusEvent>(event: E, listener: ExodusEvent[E], context?: any): void;
}

export interface Exodus extends ExodusEventEmitter {
    /** TODO: Define API. */
}
