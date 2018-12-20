export interface IHistoryEntry {
    path: string;
    fullStatePath: string;
    index?: number;
    title?: string;
    data?: Object;
}
export interface IHistoryOptions {
    callback?: Function;
}
export interface INavigationFlags {
    isFirst?: boolean;
    isNew?: boolean;
    isRefresh?: boolean;
    isForward?: boolean;
    isBack?: boolean;
    isReplace?: boolean;
    isCancel?: boolean;
}
export interface INavigationInstruction extends IHistoryEntry, INavigationFlags {
}
export declare class HistoryBrowser {
    currentEntry: IHistoryEntry;
    historyEntries: IHistoryEntry[];
    historyOffset: number;
    replacedEntry: IHistoryEntry;
    history: History;
    location: Location;
    private activeEntry;
    private options;
    private isActive;
    private lastHistoryMovement;
    private cancelRedirectHistoryMovement;
    private isCancelling;
    private isReplacing;
    private isRefreshing;
    constructor();
    activate(options?: IHistoryOptions): Promise<void>;
    deactivate(): void;
    goto(path: string, title?: string, data?: Object): void;
    replace(path: string, title?: string, data?: Object): void;
    redirect(path: string, title?: string, data?: Object): void;
    refresh(): void;
    back(): void;
    forward(): void;
    cancel(): void;
    setState(key: string | Object, value?: Object): void;
    getState(key: string): Object;
    setEntryTitle(title: string): void;
    replacePath(path: string, fullStatePath: string): void;
    setHash(hash: string): void;
    readonly titles: string[];
    pathChanged: () => void;
    private getPath;
    private setPath;
    private callback;
}
//# sourceMappingURL=history-browser.d.ts.map