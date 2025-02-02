import { initWeapons } from "./inventory/init-weapons.js"

/**
 * Initialize all elements for the inventory on the PC builder page.
 */
export const initInventory = async function() {
    await initWeapons();
}