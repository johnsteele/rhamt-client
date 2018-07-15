import { RhamtService } from './rhamtService';

export * from './model';

export enum METHOD {
    start,
    stop
}

export interface IRhamtRunConfiguration {
    rhamtCli: string;
    port: number;
    javaHome: string;
    serverMonitor: IServerMonitor;
}

export interface IRhamtEventHandler {
}

export interface IRhamtProgressMonitor {
    logMessage(message: string);
    beginTask(task: string, total: number);
    done();
    isCancelled(): boolean;
    setCancelled();
    setTaskName(task: string);
    subTask(task: string);
    worked(worked: number);
    isDone();
}

export interface IRhamtClient {
    start(config: IRhamtRunConfiguration): Promise<any>;
    stop(): Promise<any>;
    analyze(monitor: IRhamtProgressMonitor): Promise<any>;
    isRunning(): boolean;
}

export interface IServerMonitor {
    onStopServerRequested: () => void;
    stop(): void;
    isStopServerRequested(): boolean;
}

export class ServerMonitor implements IServerMonitor {

    private stopServerRequested: boolean = false;

    public onStopServerRequested: () => void;

    public stop() {
        if (!this.stopServerRequested) {
            this.stopServerRequested = true;
            this.onStopServerRequested();
        }
    }

    public isStopServerRequested(): boolean {
        return this.stopServerRequested;
    }
}

export class RhamtClient implements IRhamtClient {

    private rhamtService: RhamtService;

    constructor() {
        this.rhamtService = new RhamtService();
    }

    public start(config: IRhamtRunConfiguration): Promise<any> {   
        return this.rhamtService.start(config);
    }

    public stop(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    }

    public analyze(monitor: IRhamtProgressMonitor): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    }

    public isRunning(): boolean {
        return true;
    }
}

export class RhamtRunConfiguration implements IRhamtRunConfiguration {
    constructor (
        public rhamtCli: string, 
        public port: number = 8080, 
        public javaHome: string, 
        public serverMonitor: IServerMonitor) {
    }
}

export class RhamtProgressMonitor implements IRhamtProgressMonitor {

    public logMessage(message: string) {

    }

    public beginTask(task: string, total: number) {

    }
    
    public done() {
    }

    public isCancelled(): boolean {
        return false;
    }

    public setCancelled() {

    }

    public setTaskName(task: string) {

    }

    public subTask(task: string) {

    }

    public worked(worked: number) {

    }

    public isDone() {
        return true;
    }
}
