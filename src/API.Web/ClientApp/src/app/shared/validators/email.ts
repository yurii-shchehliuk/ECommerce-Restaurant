/**
 * Email shape accepted by the sign-in and sign-up forms.
 *
 * The TLD quantifier is open-ended on purpose. A `{2,4}` ceiling rejects every
 * address ending in .local, .online or .company, and it does so silently, by
 * leaving the submit button disabled with nothing to explain why.
 */
export const EMAIL_PATTERN = /^[\w.-]+@[\w-]+(\.[\w-]+)+$/;
