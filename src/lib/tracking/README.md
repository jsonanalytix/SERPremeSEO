# Tracking & Analytics Setup

This directory contains tracking utilities for Google Analytics, Google Tag Manager, and Google Ads call conversion tracking.

## Google Ads Call Tracking

Phone clicks are automatically tracked as Google Ads conversions. To enable this:

1. **Set up a Call Conversion Action in Google Ads:**
   - Go to Google Ads → Tools & Settings → Conversions
   - Create a new conversion action for "Phone calls"
   - Copy the conversion label (format: `AW-XXXXXXXXX/YYYYYYYYYYYY`)

2. **Add the conversion label to your environment:**
   ```env
   NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL=AW-XXXXXXXXX/YYYYYYYYYYYY
   ```

3. **Phone clicks will automatically:**
   - Track in GA4 as `phone_click` events
   - Track in GTM via dataLayer
   - Track as Google Ads conversions (if label is configured)

## Phone Number Formatting

The `google-ads.ts` file provides utilities for formatting phone numbers:
- `formatPhoneNumber()` - Formats for display: (XXX) XXX-XXXX
- `formatPhoneLink()` - Formats for tel: links: tel:+1XXXXXXXXXX

## Google Ads Phone Extensions

For dynamic number swapping based on traffic source, use Google Ads phone number extensions:
- These automatically swap numbers in your ads
- No code changes needed - handled by Google Ads
- Works seamlessly with the conversion tracking above
