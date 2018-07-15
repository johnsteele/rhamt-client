import * as cp from 'child_process';
import { resolve } from 'path';
import { IRhamtProgressMonitor, IRhamtRunConfiguration, IServerMonitor } from './main';
import * as waitOn from 'wait-on';

export class RhamtService {

    private activeRunConfiguration: IRhamtRunConfiguration;

    public start(config: IRhamtRunConfiguration): Promise<any> {
        this.activeRunConfiguration = config;
        return this.doStart(config);
    }
    
    public stop(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if(this.isRunning()) {
                //this.activeRunConfiguration.serverMonitor.onStopServerRequested();
            }
        });
    }

    public analyze(monitor: IRhamtProgressMonitor): Promise<any> {
        return new Promise<any>((resolve, reject) => {

        });
    }
    
    public isRunning(): boolean {
        if (this.activeRunConfiguration) {
            return this.activeRunConfiguration.serverMonitor.isStopServerRequested();
        }
        return false;
    }

    private doStart(config: IRhamtRunConfiguration): Promise<void> {
        return new Promise((resolve, reject) => {
            const dispose = config.serverMonitor.onStopServerRequested = () => {
                serverProcess.kill('SIGKILL');
                reject("rhamt-cli server process has been cancelled.");
            };
            let location = ['tcp', 'localhost', String(config.port)].join(':');
            const serverProcess = this.spawn(config);
            waitOn({ resources: location }, () =>  {
                console.log('rhamt-cli server started.');
                resolve() 
            });
            serverProcess.stdout.on('data', data =>
                console.log('rhamt-cli message: ' + data)
            );
            serverProcess.stderr.on('data', data =>
                console.log('rhamt-cli message: ' + data)
            );
            serverProcess.on('close', (code, signal) => {
                dispose();
                if (code !== 0) {
                    reject(new Error(`rhamt-cli server process failed, code: ${code}, signal: ${signal}`));
                } else {
                    resolve();
                }
            });
            serverProcess.once('error', err => {
                dispose();
                reject(new Error(`rhamt-cli server process failed, the error: ${err}`));
            });
        });
    }

    private spawn(config: IRhamtRunConfiguration): cp.ChildProcess {
		Object.keys(config).forEach((key: string) => {
			console.log('rhamt-client using ' + key + " : " + config[key]);
		 });
        return cp.spawn(config.rhamtCli, ["--startServer", String(config.port)]);
    }
}