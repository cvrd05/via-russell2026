import type {
  GalleryImage,
  GiftInfo,
  LoveStoryChapter,
  Person,
  RsvpSettings,
  ScheduleItem,
  VenueInfo,
  WeddingPartyMember,
} from '@/types/wedding';

/**
 * ─────────────────────────────────────────────────────────────────────────
 * CENTRALIZED WEDDING CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────
 * Every piece of editable content on the site is defined here. Update this
 * single file to change copy, dates, the schedule, the love story, the
 * wedding party, gallery images, or RSVP behavior — no component code needs
 * to change.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const bride: Person = {
  fullName: 'Ma. Monrovia Marzan',
  nickname: 'Via',
};

export const groom: Person = {
  fullName: 'Russell John Dugho',
  nickname: 'Russell',
};

/**
 * Wedding date/time used for the countdown timer.
 * Time of day is a placeholder (00:00 Asia/Manila) since the ceremony time
 * is still "To Be Announced" — update the ISO string once the time is set.
 */
export const weddingDateISO = '2026-12-02T00:00:00+08:00';
export const weddingDateDisplay = 'December 2, 2026';
export const weddingTimeDisplay = 'To Be Announced';

export const venue: VenueInfo = {
  name: 'Sefriya Farm and Orchard',
  city: 'Alitagtag',
  region: 'Batangas',
  country: 'Philippines',
  googleMapsUrl:
    'https://www.google.com/maps/place/Sefriya+Farm+and+Orchard/@13.8803227,121.0232888,17z/data=!3m1!4b1!4m9!3m8!1s0x33bd0d5733afe395:0x1958fb18c401cd4a!5m2!4m1!1i2!8m2!3d13.8803175!4d121.0258637!16s%2Fg%2F11t30ftfzr?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D',
};

export const rsvpNotificationEmail = 'viamarzan.vm@gmail.com';

/**
 * ─────────────────────────────────────────────────────────────────────────
 * MEDIA — see /public/images and /public/audio.
 * These are the exact paths referenced throughout the site. Real photos and
 * the couple's chosen song already live at these paths; simply replace the
 * files (keeping identical filenames) to update media in the future.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const media = {
  couplePhotoMain: '/images/couple-main.jpg',
  bridePhoto: '/images/bride.jpg',
  groomPhoto: '/images/groom.jpg',
  venuePhoto: '/images/venue.jpg',
  weddingSong: '/audio/wedding-song.mp3',
  weddingSongTitle: "Can't Help Falling in Love",
  // Opening (Page 1). Idle image shown before the guest clicks the V&R
  // button; animated image swapped in on click, which plays the print
  // effect through once and (since the source GIF has no loop extension)
  // freezes on its final frame natively — no JS frame-tracking needed.
  // Both are derived from the client's printing.gif with its baked-in
  // checkerboard background removed (see git history for the processing
  // script) so they blend into the page like a real transparent asset.
  printingIdleImage: '/images/design-assets/printing-frame0.png',
  printingAnimatedImage: '/images/design-assets/printing-transparent.gif',
  printingSound: '/audio/printsound.mp3',
  // Page 2 illustrated composition (background-removed frame.png).
  invitationImage: '/images/design-assets/frame-transparent.png',
  // Vinyl music player embedded in Page 2. Idle = static first frame (not
  // spinning); animated = the looping spin GIF, swapped in only while
  // isPlaying is true.
  vinylIdleImage: '/images/design-assets/vinylrotate-frame0.png',
  vinylAnimatedImage: '/images/design-assets/vinylrotate.gif',
  // Blank paper-card texture the RSVP form is laid out on top of (cropped
  // tight to just the cream paper grain, no shadow/edges, so it can tile
  // or stretch cleanly behind a form container of any height).
  rsvpPaperTexture: '/images/design-assets/rsvppaper-texture.jpg',
};

export const galleryImages: GalleryImage[] = [
  { id: 'photo-1', src: '/images/gallery/photo-1.jpg', alt: 'Via and Russell, moment one' },
  { id: 'photo-2', src: '/images/gallery/photo-2.jpg', alt: 'Via and Russell, moment two' },
  { id: 'photo-3', src: '/images/gallery/photo-3.jpg', alt: 'Via and Russell, moment three' },
  { id: 'photo-4', src: '/images/gallery/photo-4.jpg', alt: 'Via and Russell, moment four' },
  { id: 'photo-5', src: '/images/gallery/photo-5.jpg', alt: 'Via and Russell, moment five' },
  { id: 'photo-6', src: '/images/gallery/photo-6.jpg', alt: 'Via and Russell, moment six' },
];

export const coupleIntro = {
  sectionTitle: 'With Joy in Our Hearts',
  bride: {
    ...bride,
    story: "[Bride's story and introduction will be added here.]",
  },
  groom: {
    ...groom,
    story: "[Groom's story and introduction will be added here.]",
  },
};

export const loveStory: LoveStoryChapter[] = [
  {
    id: 'how-we-met',
    title: 'How We Met',
    body: "Long before they knew what the future held, Via and Russell crossed paths as children in grade school — two classmates who had no idea they were meeting the person they'd one day marry. What began as a simple childhood friendship quietly grew, year after year, into something neither of them expected.",
  },
  {
    id: 'growing-up-together',
    title: 'Growing Up Together',
    body: 'By high school, that friendship had blossomed into love. Via and Russell became a couple, and from that moment on, they never looked back. Through every milestone, every change, and every new chapter of growing up, they chose each other — and they have been together ever since.',
  },
  {
    id: 'favorite-adventures',
    title: 'Our Favorite Adventures',
    body: 'Together, Via and Russell found their favorite way to fall more in love with life: exploring the world side by side. From sun-soaked beach getaways to quiet mornings by the shore, travel became their shared passion. Just as much a part of their story are the early mornings and late nights spent at the gym together — pushing one another, cheering each other on, and building strength as a team, in fitness and in life.',
  },
  {
    id: 'greatest-blessing',
    title: 'Our Greatest Blessing',
    body: 'The next chapter of their story began with the greatest gift of all — the birth of their baby boy, Primo. He is the beautiful continuation of their love story, and the reason they now look forward to forever with even more joy.',
  },
];

/**
 * Wedding day schedule. All times are placeholders until the couple
 * finalizes the day-of timing — update the `time` field on each item when
 * ready, everything else (order, icon, layout) stays the same.
 */
export const schedule: ScheduleItem[] = [
  { id: 'arrival', title: 'Guest Arrival', time: 'Time To Be Announced' },
  { id: 'ceremony', title: 'Wedding Ceremony', time: 'Time To Be Announced' },
  { id: 'cocktail', title: 'Cocktail Hour', time: 'Time To Be Announced' },
  { id: 'reception', title: 'Reception', time: 'Time To Be Announced' },
  { id: 'dinner', title: 'Dinner', time: 'Time To Be Announced' },
  { id: 'speeches', title: 'Speeches and Toasts', time: 'Time To Be Announced' },
  { id: 'first-dance', title: 'First Dance', time: 'Time To Be Announced' },
  { id: 'celebration', title: 'Celebration', time: 'Time To Be Announced' },
];

export const dressCode = {
  title: 'Dress Code',
  heading: 'Black Suit Event',
  subheading: 'All Black Attire',
  message:
    'Please join us in celebrating this special day dressed in elegant all-black attire.',
};

export const giftInfo: GiftInfo = {
  heading: 'Your Presence Is Our Gift',
  message:
    'Your presence at our wedding is the greatest gift we could ask for. If you wish to bless us with something more, we would be grateful for a monetary gift as we begin this new chapter of our lives together.',
  placeholderNote: 'Gift and registry details to follow.',
};

export const weddingParty: { brideSide: WeddingPartyMember[]; groomSide: WeddingPartyMember[] } = {
  brideSide: [
    { role: 'Maid of Honor', name: 'To Be Announced' },
    { role: 'Bridesmaid', name: 'To Be Announced' },
    { role: 'Bridesmaid', name: 'To Be Announced' },
    { role: 'Bridesmaid', name: 'To Be Announced' },
  ],
  groomSide: [
    { role: 'Best Man', name: 'To Be Announced' },
    { role: 'Groomsman', name: 'To Be Announced' },
    { role: 'Groomsman', name: 'To Be Announced' },
    { role: 'Groomsman', name: 'To Be Announced' },
  ],
};

/**
 * RSVP behavior. `allowAdditionalGuests` gates whether the "Number of
 * Guests" field (and the dynamic additional-guest-name inputs it reveals)
 * renders at all. `maxAdditionalGuests` is guests beyond the primary
 * submitter, so total party size tops out at `maxAdditionalGuests + 1`.
 */
export const rsvpSettings: RsvpSettings = {
  allowAdditionalGuests: true,
  maxAdditionalGuests: 5,
  notificationEmail: rsvpNotificationEmail,
};

export const rsvpNotice =
  'Attendance is limited to the guests who have been officially confirmed through the RSVP form. Only guests who have completed the RSVP process may attend the wedding.';

export const rsvpThankYouMessage =
  'Thank you for confirming your attendance. We look forward to celebrating this special day with you.';

export const footerClosingMessage =
  'Together with our families, we invite you to celebrate the beginning of our forever.';

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#our-story' },
  { label: 'Wedding', href: '#wedding' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Wedding Party', href: '#wedding-party' },
  { label: 'RSVP', href: '#rsvp' },
];
