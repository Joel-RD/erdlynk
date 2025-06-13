import { safeExecute } from "../models/db.js";

setInterval(async () => {
    try {
        const query = "select * from url_shortener WHERE created_at < NOW() - INTERVAL '7 day';"
        const result = await safeExecute(query);

        if (result.rowCount === 0) {
            console.log("No se ah encontrados datos en la limpiesa de cada dia.");
            return
        }

        await safeExecute("DELETE FROM url_shortener WHERE created_at < NOW() - INTERVAL '7 day';");
        console.log("Registros antiguos eliminados correctamente.");
    } catch (error) {
        console.error("Error al eliminar registros antiguos diario", error);
    }
}, 24 * 60 * 60 * 1000);

(async () => {
    try {
        const query = "select * from url_shortener WHERE created_at < NOW() - INTERVAL '7 day';"
        const result = await safeExecute(query);

        if (result.rowCount === 0) {
            console.log("No se a realizado la limpieza inicial de registros antiguos.");
            return
        }
        await safeExecute(
            "DELETE FROM url_shortener WHERE created_at < NOW() - INTERVAL '7 day';"
        );
        console.log("Limpieza de Registros antiguos inicial eliminados correctamente.");
    } catch (error) {
        console.error("Error en la limpieza inicial:", error);
    }
})();
