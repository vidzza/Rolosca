/**
 * ROLOSCA — Agente de Seguros
 * Interacciones premium · SVG glass 3D · nivel Apple
 */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    /* ───────── Ilustraciones realistas de producto (viewBox 96) ───────── */
    const productArt = {
        // SEGURO DE VIDA — corazón rubí con latido y línea de pulso
        life: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-life">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <ellipse cx="48" cy="80" rx="22" ry="3.6" fill="#000" opacity="0.3"/>
            <g class="beat">
                <path d="M48 76 C15 55 21 28 38 28 C45 28 48 35 48 39 C48 35 51 28 58 28 C75 28 81 55 48 76 Z" fill="url(#rubyGrad)" stroke="url(#goldShine)" stroke-width="1.5"/>
                <path d="M36 36 C32 37 30 41 31 47" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="2.6" stroke-linecap="round" fill="none"/>
            </g>
            <path class="pulse" d="M19 53 H35 L39 43 L45 62 L50 50 L53 53 H77" stroke="url(#goldShine)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#goldEmboss)"/>
        </svg>`,
        // GASTOS MÉDICOS — monitor con EKG y cruz dorada
        health: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-health">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <ellipse cx="48" cy="78" rx="26" ry="3.6" fill="#000" opacity="0.3"/>
            <rect x="20" y="30" width="56" height="40" rx="8" fill="url(#bodyNavyV)" stroke="url(#goldEdge)" stroke-width="1.5"/>
            <rect x="24.5" y="34.5" width="47" height="31" rx="4.5" fill="#081726"/>
            <path class="pulse" d="M27 51 H38 L41 44 L45 58 L49 40 L53 54 L56 51 H69" stroke="url(#goldShine)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#goldEmboss)" opacity="0.55"/>
            <path class="pulse-spark" d="M27 51 H38 L41 44 L45 58 L49 40 L53 54 L56 51 H69" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <circle cx="67" cy="31" r="12" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.8"/>
            <path d="M67 25.5 V36.5 M61.5 31 H72.5" stroke="#102742" stroke-width="3.2" stroke-linecap="round"/>
        </svg>`,
        // SEGURO DE AUTO — sedán de perfil con ruedas que giran y faro
        auto: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-auto">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <ellipse cx="48" cy="76" rx="34" ry="4.5" fill="#000" opacity="0.35"/>
            <g class="car-bob">
                <path d="M13 60 L17 49 C18 46 21 44 25 44 L39 44 L48 34.5 C49 33.5 50 33 51.5 33 L61 33 C65 33 68 35 70 38 L76 47 L83 49 C85 49.6 86 51 86 53 L86 60 Z" fill="url(#bodyNavy)" stroke="url(#goldEdge)" stroke-width="1.5"/>
                <path d="M40 44 L48 36.5 L55 36.5 L55 44 Z" fill="url(#glassBlue)"/>
                <path d="M58 36.5 L61 36.5 C64 36.5 66 37.5 68 40.5 L70.5 44 L58 44 Z" fill="url(#glassBlue)"/>
                <path d="M56.5 44 V58" stroke="url(#goldEdge)" stroke-width="0.8" opacity="0.45"/>
                <circle cx="85" cy="53.5" r="2.4" fill="#FFF1C4"/>
                <circle class="headlight" cx="85" cy="53.5" r="6" fill="#FFE6A8" opacity="0.3"/>
            </g>
            <g><circle cx="30" cy="60" r="9.5" fill="#0b1a2d" stroke="url(#goldEdge)" stroke-width="1.6"/><g class="wheel-spin" style="transform-origin:30px 60px"><circle cx="30" cy="60" r="3.3" fill="url(#goldOrb)"/><path d="M30 53 V67 M23 60 H37 M25.2 55.2 L34.8 64.8 M34.8 55.2 L25.2 64.8" stroke="url(#goldEdge)" stroke-width="1"/></g></g>
            <g><circle cx="67" cy="60" r="9.5" fill="#0b1a2d" stroke="url(#goldEdge)" stroke-width="1.6"/><g class="wheel-spin" style="transform-origin:67px 60px"><circle cx="67" cy="60" r="3.3" fill="url(#goldOrb)"/><path d="M67 53 V67 M60 60 H74 M62.2 55.2 L71.8 64.8 M71.8 55.2 L62.2 64.8" stroke="url(#goldEdge)" stroke-width="1"/></g></g>
        </svg>`,
        // SEGURO DE HOGAR — casa con techo dorado y ventanas encendidas
        home: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-home">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <ellipse cx="48" cy="80" rx="26" ry="3.6" fill="#000" opacity="0.3"/>
            <rect x="30" y="47" width="36" height="29" fill="url(#bodyNavyV)" stroke="url(#goldEdge)" stroke-width="1.3"/>
            <rect x="58" y="33" width="5" height="12" fill="#8A6B33"/>
            <path d="M23 50 L48 27 L73 50 Z" fill="url(#roofGold)" stroke="url(#goldShine)" stroke-width="1.1"/>
            <path d="M48 27 L73 50 L66 50 L48 33 Z" fill="#7C5E2C" opacity="0.45"/>
            <rect x="43.5" y="60" width="9" height="16" rx="1" fill="#091a2c" stroke="url(#goldEdge)" stroke-width="0.8"/>
            <circle cx="50.5" cy="68" r="1" fill="url(#goldOrb)"/>
            <rect class="lit" x="34" y="53" width="7.5" height="7.5" rx="1" fill="url(#warmWindow)"/>
            <rect class="lit lit-b" x="54.5" y="53" width="7.5" height="7.5" rx="1" fill="url(#warmWindow)"/>
        </svg>`,
        // SEGUROS EMPRESARIALES — skyline con ventanas encendidas
        business: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-business">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <ellipse cx="48" cy="78" rx="28" ry="3.6" fill="#000" opacity="0.3"/>
            <rect x="25" y="44" width="17" height="32" fill="url(#bodyNavyV)" stroke="url(#goldEdge)" stroke-width="1.1"/>
            <rect x="42" y="28" width="19" height="48" fill="url(#bodyNavy)" stroke="url(#goldEdge)" stroke-width="1.2"/>
            <rect x="61" y="50" width="13" height="26" fill="url(#bodyNavyV)" stroke="url(#goldEdge)" stroke-width="1.1"/>
            <path d="M51.5 28 V22" stroke="url(#goldShine)" stroke-width="1.4"/><circle cx="51.5" cy="21" r="1.6" fill="url(#goldOrb)"/>
            <g fill="url(#warmWindow)">
                <rect class="lit" x="29" y="49" width="3.5" height="3.5"/><rect x="35" y="49" width="3.5" height="3.5"/>
                <rect x="29" y="56" width="3.5" height="3.5"/><rect class="lit lit-b" x="35" y="56" width="3.5" height="3.5"/>
                <rect x="29" y="63" width="3.5" height="3.5"/><rect x="35" y="63" width="3.5" height="3.5"/>
                <rect class="lit lit-c" x="46" y="33" width="4" height="4"/><rect x="53" y="33" width="4" height="4"/>
                <rect x="46" y="40" width="4" height="4"/><rect class="lit" x="53" y="40" width="4" height="4"/>
                <rect class="lit lit-b" x="46" y="47" width="4" height="4"/><rect x="53" y="47" width="4" height="4"/>
                <rect x="46" y="54" width="4" height="4"/><rect class="lit lit-c" x="53" y="54" width="4" height="4"/>
                <rect x="46" y="61" width="4" height="4"/><rect x="53" y="61" width="4" height="4"/>
                <rect x="65" y="55" width="3.5" height="3.5"/><rect class="lit" x="70" y="55" width="3.5" height="3.5"/>
                <rect class="lit lit-c" x="65" y="62" width="3.5" height="3.5"/><rect x="70" y="62" width="3.5" height="3.5"/>
            </g>
        </svg>`,
        // AHORRO E INVERSIÓN — monedas con flecha de crecimiento
        savings: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-savings">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <ellipse cx="40" cy="78" rx="20" ry="3.4" fill="#000" opacity="0.3"/>
            <path class="trend" d="M25 64 L41 49 L51 57 L71 33" stroke="url(#goldShine)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#goldEmboss)"/>
            <path class="trend-head" d="M62 32 H72 V42" stroke="url(#goldShine)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <g class="coins">
                <ellipse cx="38" cy="68" rx="14" ry="5" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.7"/>
                <ellipse cx="38" cy="61.5" rx="14" ry="5" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.7"/>
                <ellipse cx="38" cy="55" rx="14" ry="5" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.7"/>
                <path d="M40.5 51.5 H36 a2.4 2 0 0 0 0 4 h4 a2.4 2 0 0 1 0 4 H35 M38 50 V60.5" stroke="#7C5E2C" stroke-width="1.4" stroke-linecap="round" fill="none"/>
            </g>
            <g class="spark"><path d="M72 50 l1.2 3.2 3.2 1.2 -3.2 1.2 -1.2 3.2 -1.2 -3.2 -3.2 -1.2 3.2 -1.2 Z" fill="url(#goldShine)"/></g>
        </svg>`
    };

    /* ───────── Ilustraciones de valor y proceso ───────── */
    const conceptArt = {
        // ORIENTACIÓN CLARA — brújula realista con aguja oscilante
        guidance: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-compass">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <circle cx="48" cy="48" r="25" fill="url(#goldOrb)" filter="url(#dropSoft)"/>
            <circle cx="48" cy="48" r="21.5" fill="url(#bodyNavyV)"/>
            <circle cx="48" cy="48" r="21.5" fill="url(#faceSheen)" opacity="0.5"/>
            <g stroke="url(#goldEdge)" stroke-width="1.2" opacity="0.7" stroke-linecap="round"><path d="M48 30 V34 M48 62 V66 M30 48 H34 M62 48 H66"/></g>
            <g class="compass-needle" style="transform-origin:48px 48px">
                <path d="M48 32 L53 48 L48 50 Z" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.5"/>
                <path d="M48 64 L43 48 L48 50 Z" fill="#9fb1cc"/>
            </g>
            <circle cx="48" cy="48" r="2.8" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.5"/>
            <ellipse cx="40" cy="39" rx="11" ry="4.5" fill="url(#specBlob)" opacity="0.4"/>
        </svg>`,
        // RESPALDO SÓLIDO — escudo glossy con check (gemelo del hero)
        solidity: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-shield">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <ellipse cx="48" cy="79" rx="20" ry="3.4" fill="#000" opacity="0.3"/>
            <path d="M48 22 L71 30 V51 C71 67 48 77 48 77 C48 77 25 67 25 51 V30 Z" fill="url(#goldOrb)" filter="url(#dropSoft)"/>
            <path d="M48 27 L66 33.5 V50.5 C66 63 48 71 48 71 C48 71 30 63 30 50.5 V33.5 Z" fill="url(#navyDome)" stroke="url(#goldShine)" stroke-width="1" stroke-opacity="0.6"/>
            <path d="M48 27 L66 33.5 V45 C61 48 55 49 48 49 C41 49 35 48 30 45 V33.5 Z" fill="url(#faceSheen)" opacity="0.6"/>
            <path d="M39 49 L46 56.5 L59 41" stroke="url(#goldShine)" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#goldEmboss)"/>
        </svg>`,
        // ACOMPAÑAMIENTO — diadema de soporte (headset)
        support: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-headset">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <path d="M30 56 V46 a18 18 0 0 1 36 0 V56" stroke="url(#goldShine)" stroke-width="3.4" stroke-linecap="round" fill="none" filter="url(#goldEmboss)"/>
            <rect x="24" y="52" width="11" height="17" rx="4" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.6"/>
            <rect x="61" y="52" width="11" height="17" rx="4" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.6"/>
            <path d="M66 68 C66 74 60 76 54 76" stroke="url(#goldShine)" stroke-width="2.6" stroke-linecap="round" fill="none"/>
            <circle cx="52" cy="76" r="3" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.6"/>
            <ellipse cx="42" cy="40" rx="12" ry="4" fill="url(#specBlob)" opacity="0.35"/>
        </svg>`,
        // CONVERSACIÓN — dos burbujas de chat
        conversation: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-chat">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <path d="M22 32 H56 a6 6 0 0 1 6 6 v15 a6 6 0 0 1 -6 6 H36 l-9 8 v-8 h-5 a6 6 0 0 1 -6 -6 V38 a6 6 0 0 1 6 -6 Z" fill="url(#bodyNavy)" stroke="url(#goldEdge)" stroke-width="1.5"/>
            <g class="chat-dots" fill="url(#goldShine)"><circle cx="31" cy="45.5" r="2.2"/><circle cx="39" cy="45.5" r="2.2"/><circle cx="47" cy="45.5" r="2.2"/></g>
            <path d="M62 44 H74 a5 5 0 0 1 5 5 v9 a5 5 0 0 1 -5 5 v6 l-7 -6 H64 a5 5 0 0 1 -5 -5" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.8"/>
        </svg>`,
        // PROPUESTA — documento con sello dorado
        proposal: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-doc">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <path d="M32 24 H56 L68 36 V70 a2 2 0 0 1 -2 2 H32 a2 2 0 0 1 -2 -2 V26 a2 2 0 0 1 2 -2 Z" fill="url(#bodyNavyV)" stroke="url(#goldEdge)" stroke-width="1.5"/>
            <path d="M56 24 V36 H68" fill="none" stroke="url(#goldEdge)" stroke-width="1.5"/>
            <g stroke="url(#goldShine)" stroke-width="2" stroke-linecap="round" opacity="0.75"><path d="M38 44 H58 M38 51 H58 M38 58 H50"/></g>
            <circle cx="60" cy="62" r="9" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.7"/>
            <path d="M56.5 62 L59 64.5 L63.5 59.5" stroke="#13294a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M56 70 L54 78 L58 75 L62 78 L60 70 Z" fill="#C42F45"/>
        </svg>`,
        // ACTIVACIÓN — roseta medalla con check
        activation: `<svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="art art-medal">
            <circle cx="48" cy="48" r="40" fill="url(#discGlow)"/>
            <circle class="art-ring" cx="48" cy="48" r="42" stroke="url(#goldEdge)" stroke-width="1" stroke-dasharray="2 9" opacity="0.4"/>
            <path d="M40 60 L34 78 L42 74 L45 80 L51 64 Z" fill="#C42F45"/>
            <path d="M56 60 L62 78 L54 74 L51 80 L45 64 Z" fill="#9b2233"/>
            <g class="rosette" style="transform-origin:48px 44px">
                <path d="M48 24 L54 28 L61 27 L63 34 L69 38 L66 45 L67 52 L60 54 L56 60 L48 58 L40 60 L36 54 L29 52 L30 45 L27 38 L33 34 L35 27 L42 28 Z" fill="url(#goldOrb)" stroke="url(#goldShine)" stroke-width="0.7" filter="url(#dropSoft)"/>
            </g>
            <circle cx="48" cy="44" r="13" fill="url(#bodyNavyV)" stroke="url(#goldShine)" stroke-width="0.8"/>
            <path d="M42 44 L46.5 48.5 L55 39.5" stroke="url(#goldShine)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#goldEmboss)"/>
        </svg>`
    };
    const allArt = Object.assign({}, productArt, conceptArt);
    document.querySelectorAll('[data-ico3d]').forEach(el => {
        const html = allArt[el.dataset.ico3d];
        if (html) el.innerHTML = html;
    });

    /* ───────── Iconos de cápsulas flotantes ───────── */
    const capIcons = {
        user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        pulse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
        car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="22" height="12" rx="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
        home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>'
    };
    document.querySelectorAll('.cap-ico[data-ico]').forEach(el => {
        const s = capIcons[el.dataset.ico];
        if (s) el.innerHTML = s;
    });

    /* ───────── Loader (robusto: no depende del evento 'load') ───────── */
    let finished = false;
    function finish() {
        if (finished) return;
        finished = true;
        const loader = document.getElementById('loader');
        loader && loader.classList.add('hidden');
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        initReveal();
    }
    function startLoader() { setTimeout(finish, reduceMotion ? 150 : 1600); }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startLoader);
    } else {
        startLoader();
    }
    setTimeout(finish, 4000); // respaldo absoluto

    document.addEventListener('DOMContentLoaded', () => {

        /* ───────── Cursor ───────── */
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        if (cursor && follower && finePointer && !reduceMotion) {
            let mx = innerWidth / 2, my = innerHeight / 2, fx = mx, fy = my;
            addEventListener('mousemove', (e) => {
                mx = e.clientX; my = e.clientY;
                cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
            });
            (function loop() {
                fx += (mx - fx) * 0.14; fy += (my - fy) * 0.14;
                follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`;
                requestAnimationFrame(loop);
            })();
            document.querySelectorAll('a, button, .solution-card, summary, [data-magnetic]').forEach(el => {
                el.addEventListener('mouseenter', () => { follower.style.width = '54px'; follower.style.height = '54px'; follower.style.borderColor = 'rgba(201,169,98,0.9)'; });
                el.addEventListener('mouseleave', () => { follower.style.width = '34px'; follower.style.height = '34px'; follower.style.borderColor = 'rgba(201,169,98,0.5)'; });
            });
        }

        /* ───────── Header + barra de progreso ───────── */
        const header = document.getElementById('header');
        const progress = document.getElementById('scrollProgress');
        function onScroll() {
            const y = window.pageYOffset;
            const docH = document.documentElement.scrollHeight - innerHeight;
            header && header.classList.toggle('scrolled', y > 80);
            if (progress) progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
        }
        addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        /* ───────── Menú móvil ───────── */
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const open = navMenu.classList.toggle('active');
                navToggle.classList.toggle('active', open);
                navToggle.setAttribute('aria-expanded', open);
                document.body.style.overflow = open ? 'hidden' : '';
            });
            navMenu.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
                navMenu.classList.remove('active'); navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
            }));
        }

        /* ───────── FAB WhatsApp ───────── */
        const waFab = document.getElementById('waFab');
        const waToggle = document.getElementById('waToggle');
        if (waFab && waToggle) {
            waToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const open = waFab.classList.toggle('open');
                waToggle.setAttribute('aria-expanded', open);
            });
            document.addEventListener('click', (e) => {
                if (!waFab.contains(e.target)) { waFab.classList.remove('open'); waToggle.setAttribute('aria-expanded', 'false'); }
            });
        }

        /* ───────── Smooth scroll ───────── */
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const id = this.getAttribute('href');
                if (id === '#') return;
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
                    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
                }
            });
        });

        /* ───────── Filtro de soluciones ───────── */
        const chips = document.querySelectorAll('.filter-chip');
        const cards = document.querySelectorAll('.solution-card');
        chips.forEach(chip => chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const f = chip.dataset.filter;
            cards.forEach(card => {
                const match = f === 'all' || card.dataset.cat === f;
                if (match) {
                    card.classList.remove('hide');
                    card.classList.add('filtering');
                    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('filtering')));
                } else {
                    card.classList.add('hide');
                }
            });
        }));

        /* ───────── Búsqueda FAQ ───────── */
        const faqSearch = document.getElementById('faqSearch');
        const faqEmpty = document.getElementById('faqEmpty');
        if (faqSearch) {
            faqSearch.addEventListener('input', () => {
                const q = faqSearch.value.trim().toLowerCase();
                let visible = 0;
                document.querySelectorAll('.faq-item').forEach(item => {
                    const txt = item.textContent.toLowerCase();
                    const show = !q || txt.includes(q);
                    item.classList.toggle('hide', !show);
                    if (show) visible++;
                });
                if (faqEmpty) faqEmpty.hidden = visible !== 0;
            });
        }

        /* ───────── Constelación interactiva (canvas) ───────── */
        const heroEl = document.querySelector('.hero');
        const canvas = document.getElementById('heroCanvas');
        const mouse = { x: -9999, y: -9999 };
        if (heroEl && canvas && !reduceMotion) {
            const ctx = canvas.getContext('2d');
            let w = 0, h = 0, dpr = 1, pts = [];
            function resize() {
                dpr = Math.min(window.devicePixelRatio || 1, 2);
                const r = heroEl.getBoundingClientRect();
                w = r.width; h = r.height;
                canvas.width = w * dpr; canvas.height = h * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                const count = Math.min(120, Math.round(w * h / 11000));
                pts = [];
                for (let i = 0; i < count; i++) pts.push({
                    x: Math.random() * w, y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
                    r: Math.random() * 1.8 + 1.2
                });
            }
            resize();
            addEventListener('resize', resize, { passive: true });
            const LINK = 142, MLINK = 200;
            (function draw() {
                ctx.clearRect(0, 0, w, h);
                ctx.shadowColor = 'rgba(240,220,168,0.9)';
                for (let i = 0; i < pts.length; i++) {
                    const p = pts[i];
                    if (mouse.x > -9999) {
                        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
                        if (d < 220 && d > 0.1) { p.vx += dx / d * 0.02; p.vy += dy / d * 0.02; }
                    }
                    p.x += p.vx; p.y += p.vy; p.vx *= 0.992; p.vy *= 0.992;
                    if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.13;
                    if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.13;
                    if (p.x < 0 || p.x > w) p.vx *= -1;
                    if (p.y < 0 || p.y > h) p.vy *= -1;
                    p.x = Math.max(0, Math.min(w, p.x)); p.y = Math.max(0, Math.min(h, p.y));
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832);
                    ctx.shadowBlur = 8; ctx.fillStyle = 'rgba(231,193,118,0.92)'; ctx.fill();
                }
                ctx.shadowBlur = 0;
                for (let i = 0; i < pts.length; i++) {
                    const a = pts[i];
                    for (let j = i + 1; j < pts.length; j++) {
                        const b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
                        if (d < LINK) {
                            ctx.strokeStyle = 'rgba(201,169,98,' + (1 - d / LINK) * 0.4 + ')';
                            ctx.lineWidth = 0.7;
                            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                        }
                    }
                    if (mouse.x > -9999) {
                        const dx = a.x - mouse.x, dy = a.y - mouse.y, d = Math.hypot(dx, dy);
                        if (d < MLINK) {
                            ctx.strokeStyle = 'rgba(240,220,168,' + (1 - d / MLINK) * 0.65 + ')';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
                        }
                    }
                }
                requestAnimationFrame(draw);
            })();
        }

        /* ───────── Drift del texto del hero al hacer scroll ───────── */
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && !reduceMotion) {
            addEventListener('scroll', () => {
                const y = window.pageYOffset;
                if (y < innerHeight) heroContent.style.transform = `translateY(${y * 0.12}px)`;
            }, { passive: true });
        }

        /* ───────── Hero inmersivo 3D: escudo + cápsulas + spotlight + constelación ───────── */
        const shieldStage = document.getElementById('shieldStage');
        const spotlight = document.getElementById('heroSpotlight');
        const heroMesh = document.querySelector('.hero-mesh');
        const heroGrid = document.querySelector('.hero-grid');
        if (heroEl && finePointer && !reduceMotion) {
            let tx = 0, ty = 0, cx = 0, cy = 0, sx = 0, sy = 0, hasSpot = false;
            heroEl.addEventListener('mousemove', (e) => {
                const r = heroEl.getBoundingClientRect();
                const lx = e.clientX - r.left, ly = e.clientY - r.top;
                tx = lx / r.width - 0.5; ty = ly / r.height - 0.5;
                mouse.x = lx; mouse.y = ly;
                if (!hasSpot) { sx = lx; sy = ly; hasSpot = true; }
            });
            heroEl.addEventListener('mouseleave', () => { tx = 0; ty = 0; mouse.x = -9999; mouse.y = -9999; });
            (function immersive() {
                cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
                if (shieldStage && window.pageYOffset < innerHeight) {
                    shieldStage.style.transform = `rotateY(${(cx * 24).toFixed(2)}deg) rotateX(${(-cy * 24).toFixed(2)}deg)`;
                }
                if (heroMesh) heroMesh.style.transform = `translate(${(cx * 16).toFixed(1)}px, ${(cy * 16).toFixed(1)}px)`;
                if (heroGrid) heroGrid.style.transform = `translate(${(cx * -30).toFixed(1)}px, ${(cy * -30).toFixed(1)}px)`;
                if (spotlight && hasSpot && mouse.x > -9999) {
                    sx += (mouse.x - sx) * 0.16; sy += (mouse.y - sy) * 0.16;
                    spotlight.style.transform = `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px)`;
                }
                requestAnimationFrame(immersive);
            })();
        }

        /* ───────── Tilt + spotlight tarjetas ───────── */
        if (finePointer && !reduceMotion) {
            document.querySelectorAll('.solution-card[data-tilt]').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const r = card.getBoundingClientRect();
                    const x = e.clientX - r.left, y = e.clientY - r.top;
                    card.style.setProperty('--mx', x + 'px');
                    card.style.setProperty('--my', y + 'px');
                    card.style.transform = `perspective(800px) rotateX(${(y / r.height - 0.5) * -6}deg) rotateY(${(x / r.width - 0.5) * 6}deg) translateY(-6px)`;
                });
                card.addEventListener('mouseleave', () => { card.style.transform = ''; });
            });
        }

        /* ───────── Botones magnéticos + chips ───────── */
        if (finePointer && !reduceMotion) {
            document.querySelectorAll('[data-magnetic]').forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const r = btn.getBoundingClientRect();
                    btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
                });
                btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
            });
            document.querySelectorAll('.filter-chip').forEach(chip => {
                chip.addEventListener('mousemove', (e) => {
                    const r = chip.getBoundingClientRect();
                    chip.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.22}px)`;
                });
                chip.addEventListener('mouseleave', () => { chip.style.transform = ''; });
            });
            /* Glow que sigue al cursor dentro de cada botón */
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const r = btn.getBoundingClientRect();
                    btn.style.setProperty('--bx', (e.clientX - r.left) + 'px');
                    btn.style.setProperty('--by', (e.clientY - r.top) + 'px');
                });
            });
        }

        /* ───────── Ensamblado de ilustraciones al entrar en viewport ───────── */
        const artEls = document.querySelectorAll('[data-ico3d]');
        if (reduceMotion || !('IntersectionObserver' in window)) {
            artEls.forEach(el => el.classList.add('art-in'));
        } else {
            const ao = new IntersectionObserver((ents, obs) => {
                ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('art-in'); obs.unobserve(en.target); } });
            }, { threshold: 0.25 });
            artEls.forEach(el => ao.observe(el));
        }

        /* ───────── Sonidos táctiles sutiles (WebAudio, tras 1ª interacción) ───────── */
        const sfx = (function () {
            let ctx;
            function ensure() {
                if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
                if (ctx.state === 'suspended') ctx.resume();
                return ctx;
            }
            addEventListener('pointerdown', ensure, { passive: true });
            function tone(freq, dur, gain, type) {
                const c = ensure(); if (!c) return;
                const o = c.createOscillator(), g = c.createGain();
                o.type = type || 'sine'; o.frequency.value = freq;
                o.connect(g); g.connect(c.destination);
                const t = c.currentTime;
                g.gain.setValueAtTime(0.0001, t);
                g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
                g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
                o.start(t); o.stop(t + dur + 0.03);
            }
            return { hover: () => tone(1180, 0.05, 0.012, 'sine'), tap: () => tone(620, 0.13, 0.045, 'triangle') };
        })();
        let lastHoverSfx = 0;
        if (finePointer) {
            document.querySelectorAll('.btn, .nav-link, .filter-chip').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    const n = performance.now();
                    if (n - lastHoverSfx > 70) { lastHoverSfx = n; sfx.hover(); }
                });
            });
        }
        document.querySelectorAll('.btn, .card-cta, .nav-link, .wa-option, .filter-chip').forEach(el => {
            el.addEventListener('click', () => sfx.tap());
        });

        /* ───────── Split del título del hero (letra por letra) ───────── */
        if (!reduceMotion) {
            let charIdx = 0;
            document.querySelectorAll('[data-split]').forEach(line => {
                const text = line.textContent;
                line.textContent = '';
                text.split(' ').forEach((word, wi, arr) => {
                    const wspan = document.createElement('span');
                    wspan.className = 'word';
                    [...word].forEach(ch => {
                        const c = document.createElement('span');
                        c.className = 'char';
                        c.style.setProperty('--i', charIdx++);
                        c.textContent = ch;
                        wspan.appendChild(c);
                    });
                    line.appendChild(wspan);
                    if (wi < arr.length - 1) line.appendChild(document.createTextNode(' '));
                });
            });
        }

        /* ───────── Split de la frase editorial (resaltado por scroll) ───────── */
        const ACCENT = new Set(['entender', 'tu', 'vida']);
        document.querySelectorAll('[data-words]').forEach(el => {
            const text = el.textContent.trim();
            el.textContent = '';
            text.split(' ').forEach((word, wi, arr) => {
                const w = document.createElement('span');
                w.className = 'w';
                if (ACCENT.has(word.replace(/[.,;:]/g, '').toLowerCase())) w.classList.add('accent');
                if (reduceMotion) w.classList.add('on');
                w.textContent = word;
                el.appendChild(w);
                if (wi < arr.length - 1) el.appendChild(document.createTextNode(' '));
            });
        });

        /* ───────── Motor scroll unificado: parallax (lerp) + scrub + words ───────── */
        const parallaxData = [...document.querySelectorAll('[data-parallax]')].map(el => {
            const base = (el.getAttribute('style') || '').includes('translateX(-50%)') ? 'translateX(-50%)' : '';
            return { el, speed: parseFloat(el.dataset.parallax) || 0.1, cur: 0, tgt: 0, base };
        });
        const scrubEls = [...document.querySelectorAll('[data-scrub]')];
        const wordEls = [...document.querySelectorAll('[data-words]')];

        function measureTargets() {
            const vh = innerHeight;
            parallaxData.forEach(o => {
                const r = o.el.getBoundingClientRect();
                if (r.bottom < -400 || r.top > vh + 400) return;
                o.tgt = (r.top + r.height / 2 - vh / 2) * -o.speed;
            });
            scrubEls.forEach(el => {
                const r = el.getBoundingClientRect();
                const p = (vh * 0.92 - r.top) / (vh * 0.52);
                el.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(4));
            });
            wordEls.forEach(el => {
                const r = el.getBoundingClientRect();
                const p = Math.max(0, Math.min(1, (vh * 0.82 - r.top) / (vh * 0.48)));
                const ws = el._words || (el._words = el.querySelectorAll('.w'));
                const n = Math.round(p * ws.length);
                ws.forEach((w, i) => w.classList.toggle('on', i < n));
            });
        }

        if (!reduceMotion && (parallaxData.length || scrubEls.length || wordEls.length)) {
            let needs = true;
            const flag = () => { needs = true; };
            addEventListener('scroll', flag, { passive: true });
            addEventListener('resize', flag, { passive: true });
            (function tick() {
                if (needs) { measureTargets(); needs = false; }
                parallaxData.forEach(o => {
                    o.cur += (o.tgt - o.cur) * 0.085;
                    o.el.style.transform = `${o.base} translate3d(0, ${o.cur.toFixed(2)}px, 0)`;
                });
                requestAnimationFrame(tick);
            })();
            measureTargets();
        }

        /* ───────── Línea del proceso ───────── */
        const processLine = document.getElementById('processLine');
        const processSteps = document.querySelector('.process-steps');
        if (processLine && processSteps) {
            const po = new IntersectionObserver((entries) => {
                entries.forEach(en => { if (en.isIntersecting) { processLine.style.width = '100%'; processSteps.classList.add('in'); po.disconnect(); } });
            }, { threshold: 0.3 });
            po.observe(processSteps);
        }

        /* ───────── Spotlight tarjetas de valor ───────── */
        if (finePointer && !reduceMotion) {
            document.querySelectorAll('.value-item').forEach(item => {
                item.addEventListener('mousemove', (e) => {
                    const r = item.getBoundingClientRect();
                    item.style.setProperty('--vx', (e.clientX - r.left) + 'px');
                    item.style.setProperty('--vy', (e.clientY - r.top) + 'px');
                });
            });
        }

        /* ───────── Contadores ───────── */
        const co = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                if (!en.isIntersecting) return;
                const el = en.target, target = parseInt(el.dataset.count, 10), dur = 1800, start = performance.now();
                (function tick(now) {
                    const t = Math.min((now - start) / dur, 1);
                    el.textContent = Math.floor((1 - Math.pow(1 - t, 3)) * target);
                    if (t < 1) requestAnimationFrame(tick); else el.textContent = target;
                })(start);
                co.unobserve(el);
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('[data-count]').forEach(c => co.observe(c));

        /* ───────── Analytics WhatsApp ───────── */
        document.querySelectorAll('a[href^="https://wa.me"]').forEach(b => b.addEventListener('click', function () {
            if (typeof gtag !== 'undefined') gtag('event', 'click', { event_category: 'WhatsApp', event_label: this.href });
        }));

        console.log('%c ROLOSCA %c Agente de Seguros ',
            'background:linear-gradient(135deg,#E8D4A0,#9A7B3F);color:#0A1424;padding:10px 15px;font-size:14px;font-weight:bold;border-radius:6px 0 0 6px;',
            'background:#0A1424;color:#C9A962;padding:10px 15px;font-size:14px;border-radius:0 6px 6px 0;');
    });

    /* ───────── Reveal ───────── */
    function initReveal() {
        const items = document.querySelectorAll('.reveal');
        if (reduceMotion || !('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('in')); return; }
        const ro = new IntersectionObserver((entries, obs) => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    const delay = parseInt(en.target.dataset.delay || 0, 10);
                    setTimeout(() => en.target.classList.add('in'), delay);
                    obs.unobserve(en.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        items.forEach(el => ro.observe(el));
    }
})();
