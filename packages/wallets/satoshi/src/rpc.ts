export interface RPC {
    callMethod: <Response>(method: string, params?: any[]) => Promise<Response>;
}
