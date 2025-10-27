// Referencia a los elementos DOM
const terminalOutput = document.getElementById("terminal-output");
const promptCursor = document.getElementById("prompt-cursor");

// Utilidad para obtener un número aleatorio en un rango
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- FUNCIÓN DE TIPEADO (Original) ---
function typeWriter(text, i, fnCallback) {
    if (promptCursor && i < (text.length)) {
        promptCursor.innerHTML = text.substring(0, i+1) + '<span class="matrix-effect"></span>';

        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, 50); 
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

// --- FUNCIÓN DE CAPTURA DE INFO (Original) ---
function captureDeviceInfo() {
    // Captura el User Agent completo, que incluye OS, navegador y dispositivo
    const fullUserAgent = navigator.userAgent; 
    
    // Elementos DOM donde se inyectarán los datos
    const modelEl = document.getElementById('device-model');
    const signatureEl = document.getElementById('digital-signature');
    const resEl = document.getElementById('screen-res');
    const timeEl = document.getElementById('local-time');
    
    // 1. Modelo O.S. (Se muestra un fragmento del User Agent para un look de terminal)
    const modelInfo = fullUserAgent.substring(0, 70) + '...'; 
    if (modelEl) modelEl.textContent = modelInfo;
    
    // 1b. Firma Digital (User Agent completo)
    if (signatureEl) signatureEl.textContent = fullUserAgent; 

    // 2. Resolución de Pantalla
    const screenRes = `${screen.width}x${screen.height} (Px)`;
    if (resEl) resEl.textContent = screenRes;

    // 3. Hora Local (Hora de la Condena)
    const now = new Date();
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit' };
    const localTime = now.toLocaleTimeString('es-ES', timeOptions) + ' (' + now.toLocaleDateString('es-ES', { month: 'short', day: '2-digit' }) + ')';
    if (timeEl) timeEl.textContent = localTime;
}

// --- FUNCIÓN DE ALARMA Y VIBRACIÓN (Original) ---
function triggerAlarm() {
    if (navigator.vibrate) {
        // Patrón de vibración corta
        navigator.vibrate([200, 100, 200]); 
    }
    
    const header = document.getElementById('alarm-header');
    // Quitamos la alarma después de 5 segundos
    if (header) {
        setTimeout(() => {
            header.classList.remove('alarm-banner');
        }, 5000); 
    }
}

// --- Glitch de Contenedor Intermitente ---
// Mantenemos esta función ya que añade un gran efecto visual.
function triggerContainerGlitch() {
    const duration = 200; // Duración corta del glitch en ms
    
    terminalOutput.classList.add('container-glitch');
    // Quitar la clase de glitch después de la duración
    setTimeout(() => {
        terminalOutput.classList.remove('container-glitch');
    }, duration);

    // Establecer el próximo glitch en un intervalo aleatorio (entre 3 y 7 segundos)
    const nextGlitchTime = randomInt(3000, 7000); 
    setTimeout(triggerContainerGlitch, nextGlitchTime);
}


// --- MAIN: INICIO DE LA INMERSIÓN ---
window.onload = function() {
    // 1. Activar efectos de alarma y vibración (solo una vez)
    triggerAlarm();

    // 2. Capturar y mostrar la información del dispositivo inmediatamente.
    captureDeviceInfo();

    // 3. Simular el tipeado del mensaje final.
    const finalMessage = '>_ C:\DATAPOOL\LOG_00.BIN (ACCESS DENIED)';
    typeWriter(finalMessage, 0, null);

    // 4. (ELIMINADO) Se quitó el log dinámico para reducir la longitud visual.

    // 5. Iniciar el glitch de contenedor intermitente (se auto-programa)
    setTimeout(triggerContainerGlitch, randomInt(3000, 5000));
};
