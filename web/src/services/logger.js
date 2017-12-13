import * as log from "loglevel";
import {isDev} from "./envService";

if (isDev()) {
    log.enableAll();
} else {
    log.setLevel(log.levels.WARN);
}

log.debug('[SEED] logger.loglevel', log.getLevel());

export default log;