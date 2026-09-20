// Everything a campaign person might need to change, in one place.
// Keep the letter and consent wording identical to the Sheet's CONFIG tab and Config.js.
window.OPEN_LETTER = {
  test: true, // shows the TEST ribbon; set false on the live copy
  apiUrl: 'https://script.google.com/macros/s/AKfycbw8QOJcVeBI7GY4c4OOy89f1esrwYrGjnKPGxeNyPblUOhnp76LqDBz1wHj1x3gp5iAIA/exec', // the campaign's own script, in bill@reesideforcongress.com
  pageUrl: 'https://debate.reesideforcongress.com/',
  campaignUrl: 'https://reesideforcongress.com',
  disclaimer: 'Paid for by Reeside for Congress',
  privacy: 'Reeside for Congress will never sell or rent your information, and shares it only as you choose on this form.', // shown once, under the Add my name button
  outlets: 'Lowcountry TV newsrooms, South Carolina ETV and SC Public Radio',
  // Exactly who receives the packet, so "the outlets named above" in the consent is true.
  // WJCL 22 News is deliberately absent: it publishes no newsroom address, so it is contacted
  // by phone and gets no signer data.
  outletNames: [
    'Live 5 News (WCSC)',
    'ABC News 4 (WCIV)',
    'News 2 (WCBD)',
    'Fox 24 (WTAT)',
    'WTOC 11',
    'News 3 (WSAV)',
    'Fox 28 Savannah (WTGS)',
    'WHHI-TV Hilton Head',
    'South Carolina ETV',
    'SC Public Radio'
  ],

  letter: {
    to: 'To the news directors of Lowcountry television stations and news outlets:',
    paragraphs: [
      "We, the undersigned, ask you to host a general-election debate for South Carolina's 1st Congressional District before early voting begins, and to invite every candidate on the ballot, including Libertarian nominee Bill Reeside.",
      'Voters deserve to hear from all of their choices. If you use criteria to decide who takes part, we ask that you publish them now, so every candidate and every voter knows the standard.'
    ],
    draftNote: '' // approved by Bill Reeside, 2026-09-20
  },

  // Keep this identical to NO_BOOST_LINE in the script's Config.js.
  noBoost: 'Just share it - there is no need to spend anything. Paid promotion has to be reported to the FEC, and a link from someone you know does more anyway.',

  countNote: 'How we count: one signature per email address. We publish the total number of signers and how many have confirmed their email address, and we never count a signature twice.',

  sign: 'I sign this open letter. Reeside for Congress may send my name, town and comment to the outlets named above, and they may publish them.',
  consents: {
    shareEmail: 'Also share my email address with those outlets so a reporter can confirm I signed.',
    campaignEmailOk: 'Send me campaign updates by email.',
    textOk: 'Send me campaign text messages at the number above. Message and data rates may apply. Reply STOP to opt out.'
  },

  // Keep these two matching the confirmation email itself, or people look for the wrong thing.
  confirmFrom: 'Reeside for Congress',
  confirmSubject: 'Confirm your signature on the SC-01 debate letter',      // someone who signed the letter
  confirmSubjectSupporter: 'Confirm your email for Bill Reeside',           // someone who only signed up
  resend: {
    label: "Didn't get the email? Send it again",
    sent: 'Sent again - check your inbox.',
    tooSoon: 'We just sent one. Give it a few minutes.',
    failed: "That didn't go through. Please try again in a moment."
  },

  shareText: 'I signed an open letter asking Lowcountry TV stations to put every SC-01 candidate on the debate stage, including Bill Reeside. Add your name:'
};
