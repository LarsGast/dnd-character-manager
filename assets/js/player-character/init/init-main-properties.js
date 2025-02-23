import { initAlignment } from "./main-properties/init-alignment.js";
import { initBackground } from "./main-properties/init-background.js";
import { initClassAndLevel } from "./main-properties/init-class.js";
import { initName } from "./main-properties/init-name.js";
import { initRace, initSubRace } from "./main-properties/init-race.js";

/**
 * Initialize all elements for the main properties on the PC builder page.
 */
export const initMainProperties = async function() {
    initName();
    initClassAndLevel();
    await initRace();
    await initSubRace();
    initBackground();
    initAlignment();
}