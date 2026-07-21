import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { rsvpNotice, rsvpSettings, rsvpThankYouMessage } from '@/data/weddingConfig';
import type { AttendanceStatus, RsvpFormData } from '@/types/wedding';
import { submitRsvp } from '@/utils/rsvp';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

const createInitialFormData = (): RsvpFormData => ({
  fullName: '',
  email: '',
  contactNumber: '',
  attendance: 'attending',
  numberOfGuests: 1,
  guestNames: Array(rsvpSettings.maxAdditionalGuests).fill(''),
  dietaryRestrictions: '',
  message: '',
});

const inputClasses =
  'w-full border-0 border-b border-hairline bg-transparent py-3 text-ivory placeholder:text-ash/60 focus:border-champagne focus:outline-none transition-colors duration-300';
const labelClasses = 'block text-[0.65rem] uppercase tracking-[0.25em] text-ash-light mb-2';

export default function RSVPForm() {
  const [formData, setFormData] = useState<RsvpFormData>(createInitialFormData);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedAttendance, setConfirmedAttendance] = useState<RsvpFormData['attendance']>('attending');

  const updateField = <K extends keyof RsvpFormData>(key: K, value: RsvpFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateGuestName = (index: number, value: string) => {
    setFormData((prev) => {
      const guestNames = [...prev.guestNames];
      guestNames[index] = value;
      return { ...prev, guestNames };
    });
  };

  const additionalGuestCount = Math.max(formData.numberOfGuests - 1, 0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (additionalGuestCount > 0) {
      const missingName = formData.guestNames
        .slice(0, additionalGuestCount)
        .some((name) => name.trim().length === 0);

      if (missingName) {
        setErrorMessage('Please enter the full name for each additional guest.');
        setStatus('error');
        return;
      }
    }

    setStatus('submitting');
    setErrorMessage(null);

    const result = await submitRsvp(formData);

    if (result.success) {
      setConfirmedAttendance(formData.attendance);
      setStatus('success');
      setFormData(createInitialFormData());
    } else {
      setErrorMessage(result.error ?? null);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="rsvp" className="relative py-28 sm:py-36">
        <div className="container-editorial max-w-xl text-center">
          <Reveal>
            <p className="text-eyebrow">RSVP Confirmed</p>
            <h2 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
              {confirmedAttendance === 'attending' ? 'See You There' : 'Thank You'}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ash-light sm:text-base">
              {rsvpThankYouMessage}
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="relative py-28 sm:py-36">
      <div className="container-editorial max-w-2xl">
        <SectionHeading eyebrow="Kindly Respond" title="Will You Join Us?" />

        <Reveal className="hairline-border mt-14 bg-noir-soft/60 px-5 py-5 text-center text-xs uppercase tracking-[0.15em] text-champagne sm:mt-16 sm:px-8 sm:text-sm">
          {rsvpNotice}
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="mt-14 space-y-9 sm:mt-16" noValidate>
            <div className="grid gap-9 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className={labelClasses}>
                  Guest Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className={inputClasses}
                  placeholder="Juan Dela Cruz"
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={inputClasses}
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="grid gap-9 sm:grid-cols-2">
              <div>
                <label htmlFor="contactNumber" className={labelClasses}>
                  Contact Number
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={formData.contactNumber}
                  onChange={(e) => updateField('contactNumber', e.target.value)}
                  className={inputClasses}
                  placeholder="+63 900 000 0000"
                />
              </div>

              {/*
                Number of Guests (and the dynamic guest-name inputs it
                reveals below) only renders when the couple allows
                additional attendees — controlled by
                `rsvpSettings.allowAdditionalGuests` /
                `maxAdditionalGuests` in src/data/weddingConfig.ts.
              */}
              {rsvpSettings.allowAdditionalGuests && (
                <div>
                  <label htmlFor="numberOfGuests" className={labelClasses}>
                    Number of Guests
                  </label>
                  <select
                    id="numberOfGuests"
                    name="numberOfGuests"
                    value={formData.numberOfGuests}
                    onChange={(e) => updateField('numberOfGuests', Number(e.target.value))}
                    className={`${inputClasses} appearance-none bg-noir`}
                  >
                    {Array.from({ length: rsvpSettings.maxAdditionalGuests + 1 }, (_, i) => i + 1).map(
                      (n) => (
                        <option key={n} value={n} className="bg-noir">
                          {n}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              )}
            </div>

            {/*
              One "Guest N Full Name" input per additional party member,
              beyond the primary submitter above. formData.guestNames is
              always kept at a fixed length (rsvpSettings.maxAdditionalGuests)
              so typed names survive the guest count going up or down —
              only the first `additionalGuestCount` entries are ever shown,
              required, or submitted.
            */}
            {rsvpSettings.allowAdditionalGuests && additionalGuestCount > 0 && (
              <div className="space-y-9">
                <AnimatePresence initial={false}>
                  {Array.from({ length: additionalGuestCount }, (_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <label htmlFor={`guestName-${index}`} className={labelClasses}>
                        {`Guest ${index + 2} Full Name`}
                      </label>
                      <input
                        id={`guestName-${index}`}
                        name={`guestName-${index}`}
                        type="text"
                        required
                        value={formData.guestNames[index] ?? ''}
                        onChange={(e) => updateGuestName(index, e.target.value)}
                        className={inputClasses}
                        placeholder="Juan Dela Cruz"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            <fieldset>
              <legend className={labelClasses}>Attendance Confirmation</legend>
              <div className="flex flex-wrap gap-4">
                {(
                  [
                    { value: 'attending', label: 'Attending' },
                    { value: 'not-attending', label: 'Unable to Attend' },
                  ] as { value: AttendanceStatus; label: string }[]
                ).map((option) => (
                  <label
                    key={option.value}
                    className={`hairline-border flex-1 cursor-pointer px-5 py-3.5 text-center text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                      formData.attendance === option.value
                        ? 'border-champagne text-champagne'
                        : 'text-ash-light hover:text-ivory'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={option.value}
                      checked={formData.attendance === option.value}
                      onChange={() => updateField('attendance', option.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="dietaryRestrictions" className={labelClasses}>
                Dietary Restrictions or Allergies
              </label>
              <input
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                type="text"
                value={formData.dietaryRestrictions}
                onChange={(e) => updateField('dietaryRestrictions', e.target.value)}
                className={inputClasses}
                placeholder="None"
              />
            </div>

            <div>
              <label htmlFor="message" className={labelClasses}>
                Message for the Couple
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) => updateField('message', e.target.value)}
                className={`${inputClasses} resize-none`}
                placeholder="Share your well-wishes..."
              />
            </div>

            {status === 'error' && (
              <p role="alert" className="text-center text-sm text-champagne">
                {errorMessage ?? 'Something went wrong sending your RSVP. Please try again.'}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group relative w-full overflow-hidden border border-champagne/70 py-4 text-xs uppercase tracking-[0.35em] text-ivory transition-colors duration-500 hover:text-noir disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">{status === 'submitting' ? 'Sending…' : 'Send RSVP'}</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
