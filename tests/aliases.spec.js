import process from "node:process";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto(`file://${process.cwd()}/tests/assets/generic.html`);
    await page.evaluate(() => {
        window.hotkeyTriggered = false;
    });
});

test("should trigger when using 'Esc' alias for Escape", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Esc", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.press("Escape");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'Del' alias for Delete", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Del", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.press("Delete");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'Ins' alias for Insert", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ins", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.press("Insert");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'PgUp' alias for PageUp", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "PgUp", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.press("PageUp");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'PgDn' alias for PageDown", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "PgDn", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.press("PageDown");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'Ctrl+,' literal character alias", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ctrl+,", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.press(",");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'Ctrl+.' literal character alias", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ctrl+.", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.press(".");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'Ctrl+/' literal character alias", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ctrl+/", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.press("/");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'Ctrl+\\' literal character alias", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ctrl+\\", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.press("\\");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'Ctrl+;' literal character alias", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ctrl+;", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.press(";");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'Ctrl+=' literal character alias", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ctrl+=", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.press("=");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'Ctrl+`' literal character alias", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ctrl+`", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.press("`");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'Ctrl+]' literal character alias", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ctrl+]", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.press("]");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when using 'Ctrl+[' literal character alias", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ctrl+[", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.press("[");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});
