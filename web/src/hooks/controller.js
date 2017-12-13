import symphonyController from "./controller-wrapper";
import logger from "../services/logger";

const config = window.SYMPHONY_SEED_APP_CONFIG;
if (!config) {
    logger.error("[SEED] SYMPHONY_SEED_APP_CONFIG not found!");
}

symphonyController.init(config)
    .then(() => {
        logger.debug("[SEED] controller init success!");
    })
    .catch((error) => {
        logger.debug("[SEED] controller init failure!", error);
    });