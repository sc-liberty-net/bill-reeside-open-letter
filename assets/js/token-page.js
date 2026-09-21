// The confirm and remove pages. Both take a token from the email link, ask the campaign's
// script to act on it, and show the result here — so a signer never opens a Google address,
// which fails outright for anyone signed into more than one Google account.
(function () {
  'use strict';
  var C = window.OPEN_LETTER || {};
  var $ = function (id) { return document.getElementById(id); };
  var action = document.title.indexOf('Remove') === 0 ? 'withdraw' : 'confirm';

  var token = (new URLSearchParams(window.location.search).get('t') || '').toUpperCase().replace(/[^A-Z2-9]/g, '');
  var btn = $('go');
  var note = $('ask-note');

  document.querySelectorAll('[data-disclaimer]').forEach(function (el) {
    if (C.disclaimer) el.textContent = C.disclaimer;
  });

  function show(panel) {
    ['ask', 'done', 'trouble'].forEach(function (id) {
      var el = $(id);
      if (el) el.hidden = id !== panel;
    });
    var shown = $(panel);
    if (shown && shown.focus) shown.focus();
  }

  function trouble(message) {
    $('trouble-lede').textContent = message;
    show('trouble');
  }

  if (!/^[A-Z2-9]{24}$/.test(token)) {
    trouble('That link is incomplete. Please open the most recent email we sent you and tap the button there.');
    return;
  }

  function post(body, onDone, onFail) {
    var controller = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) controller.abort(); }, 30000);
    fetch(C.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
      signal: controller ? controller.signal : undefined
    }).then(function (res) {
      clearTimeout(timer);
      return res.json();
    }).then(onDone).catch(function () { clearTimeout(timer); onFail(); });
  }

  function shareLinks(link) {
    var text = (C.shareText || 'Add your name:') + ' ';
    $('personal-link').value = link;
    $('share-sms').href = 'sms:?&body=' + encodeURIComponent(text + link);
    $('share-email').href = 'mailto:?subject=' + encodeURIComponent('Put every candidate on the debate stage') +
      '&body=' + encodeURIComponent(text + link);
    $('share-fb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(link);
    $('share-x').href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(link);
    if (navigator.share) {
      $('share-native').hidden = false;
      $('share-native').addEventListener('click', function () {
        navigator.share({ text: text, url: link }).catch(function () {});
      });
    }
    $('share-copy').addEventListener('click', function () {
      var label = $('copy-label');
      var done = function () { label.textContent = 'Copied'; };
      var manual = function () { $('personal-link').select(); label.textContent = 'Press and hold to copy'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(done, manual);
      } else { manual(); }
    });
  }

  function confirmed(res) {
    var who = res.fullName && res.town ? res.fullName + ', ' + res.town : '';
    $('done-title').textContent = res.firstName && res.firstName !== 'there'
      ? 'Thank you, ' + res.firstName + '.' : 'Thank you, you are confirmed.';
    $('done-lede').textContent = res.signed
      ? 'Your signature is confirmed' + (who ? ' as ' + who : '') + '.' +
        (res.shareEmail ? ' Your email address will be shared with the outlets, as you asked.' : '')
      : 'Your email address is confirmed.';
    if (res.referralLink) shareLinks(res.referralLink);
    else $('share').hidden = true;
    if (C.noBoost) $('no-boost').textContent = C.noBoost;
    if (res.stationMailto) {
      var station = $('station');
      station.innerHTML = 'Want to add your own voice? <a></a>.';
      var a = station.querySelector('a');
      a.href = res.stationMailto;
      a.textContent = 'Email the station yourself';
      station.hidden = false;
    }
    show('done');
  }

  function withdrawn(res) {
    $('done-lede').textContent = res.signed
      ? 'Your name has been taken off the open letter, and we will not contact you again.'
      : 'You are unsubscribed. We will not contact you again.';
    show('done');
  }

  btn.addEventListener('click', function () {
    if (btn.disabled) return;
    btn.disabled = true;
    note.textContent = 'One moment…';
    post({ action: action, token: token }, function (res) {
      note.textContent = '';
      if (res && res.state === 'confirmed') return confirmed(res);
      if (res && res.state === 'withdrawn' && res.ok) return withdrawn(res);
      if (res && res.state === 'withdrawn') {
        return trouble('This signature was already removed at your request.');
      }
      if (res && res.state === 'busy') {
        btn.disabled = false;
        note.textContent = 'A lot of people are signing right now. Please tap again in a minute.';
        return;
      }
      trouble('We could not find that link. Please use the most recent email we sent you.');
    }, function () {
      btn.disabled = false;
      note.textContent = 'That did not go through. Please check your connection and tap again.';
    });
  });
})();
