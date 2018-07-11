export * from './model';

export enum METHOD {
    start,
    stop
}

export interface IRhamtConfiguration {
    executable: string;
    javaHome: string;
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

export interface IRhamtApi {
    start(config: IRhamtConfiguration): Promise<any>;
    stop(): Promise<any>;
    analyze(monitor: IRhamtProgressMonitor): Promise<any>;
    isRunning(): boolean;
}

export class RhamtApi implements IRhamtApi {

    public start(config: IRhamtConfiguration): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
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

export class RhamtConfiguration implements IRhamtConfiguration {

    constructor (public executable: string, 
        public javaHome: string) {
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
