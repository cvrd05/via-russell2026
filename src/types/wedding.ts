export interface Person {
  fullName: string;
  nickname: string;
}

export interface VenueInfo {
  name: string;
  city: string;
  region: string;
  country: string;
  googleMapsUrl: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  description?: string;
}

export interface LoveStoryChapter {
  id: string;
  title: string;
  body: string;
  year?: string;
}

export interface WeddingPartyMember {
  role: string;
  name: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface RsvpSettings {
  allowAdditionalGuests: boolean;
  maxAdditionalGuests: number;
  notificationEmail: string;
}

export interface GiftInfo {
  heading: string;
  message: string;
  placeholderNote: string;
}

export type AttendanceStatus = 'attending' | 'not-attending';

export interface RsvpFormData {
  fullName: string;
  email: string;
  contactNumber: string;
  attendance: AttendanceStatus;
  numberOfGuests: number;
  /**
   * Full names of every guest in the party besides the primary submitter,
   * fixed at `rsvpSettings.maxAdditionalGuests` length so values already
   * typed are preserved as `numberOfGuests` goes up or down — only the
   * first `numberOfGuests - 1` entries are shown/required/submitted.
   */
  guestNames: string[];
  dietaryRestrictions: string;
  message: string;
}

export interface RsvpSubmissionResult {
  success: boolean;
  error?: string;
}
