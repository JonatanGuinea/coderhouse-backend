import * as url from 'url';
import path from 'path';

const config = {
    PORT: 8080,
    // Subimos un nivel desde 'routes' al directorio raíz
    DIRNAME: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..')
}

export default config;
