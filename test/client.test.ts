
import * as assert from "assert";

import { RhamtClient } from '../src/main';
import { RhamtModel, RhamtModelService, RuntimeConfiguration } from 'rhamt-core';
import { ProgressMonitor } from "../lib/progressMonitor";

describe("Rhamt Client", () => {
    it("start, stop", () => {
        let model = new RhamtModel();
        let modelService = new RhamtModelService(model);
        let config = modelService.createConfiguration();
        config.runtime = new RuntimeConfiguration();
        let client = new RhamtClient(config.runtime);
        client.start().then(() => {
            assert.equal(client.isRunning(), true);
        });
        client.stop().then(() => {
            assert.equal(client.isRunning(), true);
        });
    });

    it("analyze", () => {
        let model = new RhamtModel();
        let modelService = new RhamtModelService(model);
        let config = modelService.createConfiguration();
        config.runtime = new RuntimeConfiguration();
        let client = new RhamtClient(config.runtime);
        client.start().then(() => {
            assert.equal(client.isRunning(), true);
        });
        let monitor = new ProgressMonitor(null, null);
        client.analyze(config).then(() => {
            assert.equal(monitor., true);
        });
        client.stop().then(() => {
            assert.equal(client.isRunning(), true);
        });
    });
});
