
import * as assert from "assert";

import { RhamtClient, RhamtConfiguration, RhamtProgressMonitor } from '../src/main';

describe("Rhamt Client", () => {
    it("start, stop", () => {
        let config = new RhamtConfiguration(
            "",
            ""
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
        let config = new RhamtConfiguration(
            "",
            ""
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
