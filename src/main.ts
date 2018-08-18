'use strict';

import { RhamtConfiguration } from 'rhamt-core';
export * from './rhamtClient';

export interface IRhamtClient {
    start(): Promise<any>;
    stop(): void;
    analyze(config: RhamtConfiguration): Promise<any>;
    isRunning(): boolean;
}