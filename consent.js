/**
 * Gestion du consentement cookies / traceurs — RGPD (art. 82 loi Informatique et Libertés)
 *
 * Aucun traceur (Google Analytics, Umami) n'est chargé avant l'obtention
 * du consentement explicite du visiteur. Le choix est mémorisé dans le
 * localStorage et réutilisé sur l'ensemble des pages du site.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'night-rush-cookie-consent';
  var config = window.consentConfig || {};
  var gtagId = config.gtagId || null;
  var umamiId = config.umamiId || null;

  /* --- Chargement différé de Google Analytics --- */
  function loadGoogleAnalytics() {
    if (!gtagId) return;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    window.gtag('js', new Date());
    window.gtag('config', gtagId, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gtagId);
    document.head.appendChild(s);
  }

  /* --- Chargement d'Umami (mesure d'audience sans cookie) --- */
  function loadUmami() {
    if (!umamiId) return;
    var s = document.createElement('script');
    s.defer = true;
    s.src = 'https://cloud.umami.is/script.js';
    s.setAttribute('data-website-id', umamiId);
    document.head.appendChild(s);
  }

  function loadTrackers() {
    loadGoogleAnalytics();
    loadUmami();
  }

  /* --- Bannière de consentement --- */
  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Gestion des cookies');
    banner.innerHTML =
      '<div class="cookie-banner-content">' +
        '<p><strong>🍪 Respect de votre vie privée</strong><br>' +
        "Nous utilisons des cookies et traceurs de mesure d'audience (Google Analytics, Umami) pour comprendre " +
        "l'utilisation du site. Ils ne sont activés qu'avec votre accord." +
        '</p>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" id="consent-accept">Accepter</button>' +
          '<button type="button" id="consent-refuse">Refuser</button>' +
        '</div>' +
        '<a href="politique-cookies.html" rel="noopener noreferrer">En savoir plus</a>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById('consent-accept').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) { /* stockage indisponible */ }
      banner.remove();
      loadTrackers();
    });

    document.getElementById('consent-refuse').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'refused'); } catch (e) { /* stockage indisponible */ }
      banner.remove();
    });
  }

  /* --- Logique principale --- */
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* stockage indisponible */ }

  if (saved === 'accepted') {
    loadTrackers();
  } else if (saved !== 'refused') {
    showBanner();
  }
})();