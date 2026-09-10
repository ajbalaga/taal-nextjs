Put the municipality's PDF forms here, named to match lib/data.js FORMS entries:

  business-permit-application.pdf
  building-permit-checklist.pdf
  civil-registry-request-slip.pdf
  senior-citizen-id-application.pdf
  citizen-feedback-form.pdf
  real-property-tax-clearance-request.pdf

Files in /public are served free from the host's CDN — no object storage needed.
Move to Cloudflare R2 only when staff must upload forms without a code deploy
(see app/api/forms/upload/route.js).
