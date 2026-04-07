import process from "node:process";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto(`file://${process.cwd()}/tests/assets/generic.html`);
    await page.evaluate(() => {
        window.hotkeyTriggered = false;
    });
});

test("should trigger when Ctrl+Up is pressed on document", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ctrl + Up", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.down("ArrowUp");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when Ctrl+Up is pressed on window", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(window, "Ctrl + Up", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.down("ArrowUp");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when Ctrl+K is pressed on a specific element", async ({ page }) => {
    await page.evaluate(() => {
        const el = document.getElementById("text");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.locator("#text").focus();

    await page.keyboard.down("Control");
    await page.keyboard.down("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when Shift+K is pressed on an element matching the selector", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey("#text", "Shift + K", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.locator("#text").focus();

    await page.keyboard.down("Shift");
    await page.keyboard.down("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when Ctrl+Alt+Shift+K is pressed", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey("#text", "Ctrl+Alt+Shift+K", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.locator("#text").focus();

    await page.keyboard.down("Control");
    await page.keyboard.down("Alt");
    await page.keyboard.down("Shift");
    await page.keyboard.down("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when Alt+Shift+K is pressed", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey("#text", "Alt+Shift+K", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.locator("#text").focus();

    await page.keyboard.down("Alt");
    await page.keyboard.down("Shift");
    await page.keyboard.down("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when Alt+K is pressed", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey("#text", "Alt+K", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.locator("#text").focus();

    await page.keyboard.down("Alt");
    await page.keyboard.down("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when K is pressed without modifiers", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey("#text", "K", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.locator("#text").focus();
    await page.keyboard.press("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should not trigger hotkey when additional modifier keys are pressed", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey("#text", "Alt+K", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.locator("#text").focus();

    await page.keyboard.down("Shift");
    await page.keyboard.down("Alt");
    await page.keyboard.down("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(false);
});

test("should not trigger on elements with [data-hotkey-ignore]", async ({ page }) => {
    await page.evaluate(() => {
        const el = document.getElementById("ignored");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.locator("#ignored").focus();

    await page.keyboard.down("Control");
    await page.keyboard.down("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(false);
});

test("should not trigger when parent has [data-hotkey-ignore]", async ({ page }) => {
    await page.evaluate(() => {
        const el = document.getElementById("ignored-via-parent");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.locator("#ignored-via-parent").focus();

    await page.keyboard.down("Control");
    await page.keyboard.down("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(false);
});

test("should trigger on 'keydown'", async ({ page }) => {
    await page.evaluate(() => {
        const el = document.getElementById("text");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.locator("#text").focus();

    await page.keyboard.down("Control");
    await page.keyboard.down("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger on 'keyup'", async ({ page }) => {
    await page.evaluate(() => {
        const el = document.getElementById("text");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyTriggered = true;
        }, "keyup");
    });

    await page.locator("#text").focus();

    await page.keyboard.down("Control");
    await page.keyboard.down("K");
    await page.keyboard.up("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger on 'keyup' when using keyboard.press()", async ({ page }) => {
    await page.evaluate(() => {
        const el = document.getElementById("text");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyTriggered = true;
        }, "keyup");
    });

    await page.locator("#text").focus();

    await page.keyboard.down("Control");
    await page.keyboard.press("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should thrown when target selector is invalid", async ({ page }) => {
    await expect(page.evaluate(() => {
        window.registerHotkey("#unknown", "K", () => {
            window.hotkeyTriggered = true;
        });
    })).rejects.toThrow("No element found for selector '#unknown'");
});

test("should only trigger on trusted events when 'trusted' option is set to true", async ({ page }) => {
    await page.evaluate(() => {
        const el = document.getElementById("text");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyTriggered = true;
        }, "keydown", { trusted: true });
    });

    await page.locator("#text").focus();

    await page.keyboard.down("Control");
    await page.keyboard.down("K");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger on untrusted events when 'trusted' option is not set", async ({ page }) => {
    await page.evaluate(() => {
        const el = document.getElementById("text");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyTriggered = true;
        });

        const event = new KeyboardEvent("keydown", {
            key: "k",
            code: "KeyK",
            ctrlKey: true,
            bubbles: true
        });

        el.dispatchEvent(event);
    });

    await page.locator("#text").focus();

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger on untrusted events when 'trusted' option is false", async ({ page }) => {
    await page.evaluate(() => {
        const el = document.getElementById("text");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyTriggered = true;
        }, "keydown", { trusted: false });

        const event = new KeyboardEvent("keydown", {
            key: "k",
            code: "KeyK",
            ctrlKey: true,
            bubbles: true
        });

        el.dispatchEvent(event);
    });

    await page.locator("#text").focus();

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should not trigger on untrusted events when 'trusted' option is true", async ({ page }) => {
    await page.evaluate(() => {
        const el = document.getElementById("text");

        window.registerHotkey(el, "Ctrl + K", e => {
            window.hotkeyTriggered = true;
        }, "keydown", { trusted: true });

        const event = new KeyboardEvent("keydown", {
            key: "k",
            code: "KeyK",
            ctrlKey: true,
            bubbles: true
        });

        el.dispatchEvent(event);
    });

    await page.locator("#text").focus();

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(false);
});

test("should not be consumed by non-matching keys when 'once' option is set", async ({ page }) => {
    await page.evaluate(() => {
        window.hotkeyCount = 0;
        const el = document.getElementById("text");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyCount++;
        }, "keydown", { once: true });
    });

    await page.locator("#text").focus();

    await page.keyboard.press("A");
    await page.keyboard.press("B");

    await page.keyboard.press("Control+k");

    const count = await page.evaluate(() => window.hotkeyCount);
    expect(count).toBe(1);
});

test("should trigger only once with 'once' option", async ({ page }) => {
    await page.evaluate(() => {
        window.hotkeyCount = 0;
        const el = document.getElementById("text");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyCount++;
        }, "keydown", { once: true });
    });

    await page.locator("#text").focus();

    // Press the hotkey twice
    await page.keyboard.press("Control+k");
    await page.keyboard.press("Control+k");

    const count = await page.evaluate(() => window.hotkeyCount);
    expect(count).toBe(1);
});

test("should trigger multiple times without 'once' option", async ({ page }) => {
    await page.evaluate(() => {
        window.hotkeyCount = 0;
        const el = document.getElementById("text");

        window.registerHotkey(el, "Ctrl + K", () => {
            window.hotkeyCount++;
        });
    });

    await page.locator("#text").focus();

    // Press the hotkey twice
    await page.keyboard.press("Control+k");
    await page.keyboard.press("Control+k");

    const count = await page.evaluate(() => window.hotkeyCount);
    expect(count).toBe(2);
});

test("should trigger when Ctrl+1 is pressed", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Ctrl+1", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Control");
    await page.keyboard.down("1");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should trigger when Alt+0 is pressed", async ({ page }) => {
    await page.evaluate(() => {
        window.registerHotkey(document, "Alt+0", () => {
            window.hotkeyTriggered = true;
        });
    });

    await page.keyboard.down("Alt");
    await page.keyboard.down("0");

    const triggered = await page.evaluate(() => window.hotkeyTriggered);
    expect(triggered).toBe(true);
});

test("should not trigger after AbortSignal is aborted", async ({ page }) => {
    await page.evaluate(() => {
        window.hotkeyCount = 0;
        window.controller = new AbortController();

        window.registerHotkey(document, "Ctrl+K", () => {
            window.hotkeyCount++;
        }, "keydown", { signal: window.controller.signal });
    });

    await page.keyboard.press("Control+k");

    await page.evaluate(() => window.controller.abort());

    await page.keyboard.press("Control+k");

    const count = await page.evaluate(() => window.hotkeyCount);
    expect(count).toBe(1);
});

test("should not trigger when AbortSignal is already aborted", async ({ page }) => {
    await page.evaluate(() => {
        window.hotkeyCount = 0;

        const controller = new AbortController();
        controller.abort();

        window.registerHotkey(document, "Ctrl+K", () => {
            window.hotkeyCount++;
        }, "keydown", { signal: controller.signal });
    });

    await page.keyboard.press("Control+k");

    const count = await page.evaluate(() => window.hotkeyCount);
    expect(count).toBe(0);
});
