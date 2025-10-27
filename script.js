// Referencia a los elementos DOM
const terminalOutput = document.getElementById("terminal-output");
const promptCursor = document.getElementById("prompt-cursor");

// Utilidad para obtener un número aleatorio en un rango
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- FUNCIÓN DE TIPEADO ---
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

// --- FUNCIÓN DE CAPTURA DE INFO ---
function captureDeviceInfo() {
    const fullUserAgent = navigator.userAgent; 
    const modelEl = document.getElementById('device-model');
    const signatureEl = document.getElementById('digital-signature');
    const resEl = document.getElementById('screen-res');
    const timeEl = document.getElementById('local-time');
    
    if (modelEl) modelEl.textContent = fullUserAgent.substring(0, 70) + '...';
    if (signatureEl) signatureEl.textContent = fullUserAgent; 
    if (resEl) resEl.textContent = `${screen.width}x${screen.height} (Px)`;

    const now = new Date();
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit' };
    const localTime = now.toLocaleTimeString('es-ES', timeOptions) + ' (' + now.toLocaleDateString('es-ES', { month: 'short', day: '2-digit' }) + ')';
    if (timeEl) timeEl.textContent = localTime;
}

// --- FUNCIÓN DE ALARMA Y VIBRACIÓN ---
function triggerAlarm() {
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]); 
    }
    
    const header = document.getElementById('alarm-header');
    if (header) {
        setTimeout(() => {
            header.classList.remove('alarm-banner');
        }, 5000); 
    }
}

// --- Glitch de Contenedor Intermitente ---
function triggerContainerGlitch() {
    const duration = 200;
    if (terminalOutput) {
        terminalOutput.classList.add('container-glitch');
        setTimeout(() => {
            terminalOutput.classList.remove('container-glitch');
        }, duration);
    }
    const nextGlitchTime = randomInt(3000, 7000); 
    setTimeout(triggerContainerGlitch, nextGlitchTime);
}

// --- FUNCIÓN PRINCIPAL ---
function main() {
    triggerAlarm();
    captureDeviceInfo();
    
    const finalMessage = '>_ C:\\DATAPOOL\\LOG_00.BIN (ACCESS DENIED)';
    typeWriter(finalMessage, 0, null);

    setTimeout(triggerContainerGlitch, randomInt(3000, 5000));
}

// --- INICIO DE LA INMERSIÓN ---
// Esperar a que el DOM esté completamente cargado para ejecutar el script
document.addEventListener('DOMContentLoaded', main);