
import * as assert from "assert";

import { RhamtClient, RhamtRunConfiguration, RhamtProgressMonitor, ServerMonitor } from '../src/main';

describe("Rhamt Client", () => {
    it("start, stop", () => {
        let config = new RhamtRunConfiguration(
            "test",
            0,
            "test",
            new ServerMonitor()
        );
        let client = new RhamtClient();
        client.start(config).then(() => {
            assert.equal(client.isRunning(), true);
        });
        client.stop().then(() => {
            assert.equal(client.isRunning(), true);
        });
    });

    it("analyze", () => {
        let config = new RhamtRunConfiguration(
            "test",
            0,
            "test",
            new ServerMonitor()
        );
        let client = new RhamtClient();
        client.start(config).then(() => {
            assert.equal(client.isRunning(), true);
        });
        let monitor = new RhamtProgressMonitor();
        client.analyze(monitor).then(() => {
            assert.equal(monitor.isDone(), true);
        });
        client.stop().then(() => {
            assert.equal(client.isRunning(), true);
        });
    });
});
