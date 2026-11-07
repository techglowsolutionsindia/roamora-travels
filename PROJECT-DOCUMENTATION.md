# Roamora Travels — Project Documentation

## 1. Project Overview

- **Project Number:** 7
- **Project Name:** Roamora Travels
- **Website Type:** Travel and Tourism / India Tour Packages / Custom Trip Enquiries
- **Developer:** TechGlow Solutions
- **Original Completion Date:** 21 October 2026
- **Local Project Folder:** `D:\web-projects\roamora-travels\`
- **Frontend Technologies:** HTML5, CSS3, Vanilla JavaScript
- **Frontend Hosting:** GitHub Pages
- **Enquiry Backend:** Google Apps Script
- **Enquiry Storage:** Google Sheets
- **Email Integration:** Owner notification and customer confirmation emails
- **Website Objective:** Present Indian destinations, tour packages, travel experiences and journals, and generate travel enquiries.
- **Original Project Status:** Completed and published.
- **Current Status:** Existing website undergoing final audit and redeployment preparation as of 7 November 2026.

## 2. GitHub and Hosting

**GitHub Repository:**
https://github.com/techglowsolutionsindia/roamora-travels/

**Live Website:**
https://techglowsolutionsindia.github.io/roamora-travels/

**Frontend Hosting:** GitHub Pages.

**Main Git Working Folder:**
`D:\web-projects\roamora-travels\`

Do not create a separate duplicate GitHub project folder.

**Latest GitHub Deployment:** Final audit changes have not yet been confirmed deployed.

**Latest Live Verification:** Pending after the current audit.

## 3. Project Structure

**Project Root:**
`D:\web-projects\roamora-travels\`

### Main HTML Pages

1. `index.html` — Homepage
2. `about.html` — About Roamora Travels
3. `blog.html` — Travel journal listing
4. `cancellation-policy.html` — Cancellation policy
5. `contact.html` — Contact and enquiries
6. `custom-trip.html` — Custom trip planning
7. `destination-details.html` — Destination travel guide
8. `destinations.html` — India destinations
9. `experiences.html` — Travel experiences
10. `package-details.html` — Tour package details
11. `packages.html` — India tour packages
12. `privacy-policy.html` — Privacy policy
13. `sitemap.html` — Visitor-facing HTML sitemap
14. `terms-and-conditions.html` — Terms and conditions
15. `travel-blog-details.html` — Dynamic travel journal details

### Other Important Files

- `sitemap.xml` — XML sitemap
- `robots.txt` — Search crawler instructions
- `.gitignore` — Git exclusions
- `PROJECT-DOCUMENTATION.md` — Project documentation
- `data/blogs.json` — Travel journal content
- `data/destinations.json` — Destination content
- `assets/css/` — Shared and page-specific stylesheets
- `assets/js/main.js` — Shared JavaScript
- `assets/js/components/` — Reusable functionality
- `assets/js/pages/` — Page-specific functionality
- `assets/images/` — Website images, primarily WebP
- `assets/images/logo/favicon.svg` — Website favicon
- `assets/images/logo/roamora-logo.svg` — Navbar and footer branding

### Important JavaScript Files

- `assets/js/pages/home.js`
- `assets/js/pages/blog.js`
- `assets/js/pages/destinations.js`
- `assets/js/pages/destination-details.js`
- `assets/js/pages/packages.js`
- `assets/js/pages/package-details.js`
- `assets/js/pages/custom-trip.js`
- `assets/js/pages/travel-blog-details.js`
- `assets/js/components/newsletter.js`

Additional files may exist within the project folders.

## 4. Website Pages and SEO

The website contains 15 main HTML pages.

### SEO Configuration

The current audit covers:

- Page titles and meta descriptions
- Robots meta directives
- Canonical URLs
- SVG favicon consistency
- Navbar and footer logos
- Internal navigation
- HTML sitemap
- XML sitemap
- `robots.txt`
- `.gitignore`
- Dynamic journal metadata

### Canonical URLs

Static HTML pages use their corresponding absolute GitHub Pages URLs.

The homepage canonical should resolve to the preferred homepage URL.

Dynamic journal pages use URLs in this format:

`travel-blog-details.html?slug=journal-slug`

The journal JavaScript generates canonical URLs using the active journal slug.

**Important limitation:** JavaScript-generated canonical and social metadata may not be available to every crawler before rendering.

Static or prerendered journal pages would be preferable if independent indexing and social previews become a future requirement.

### XML Sitemap

**URL:**
https://techglowsolutionsindia.github.io/roamora-travels/sitemap.xml

The XML sitemap was created during the November 2026 audit.

It contains the main static, indexable website pages.

Individual dynamic journal URLs are not currently included pending indexability verification.

### HTML Sitemap

**URL:**
https://techglowsolutionsindia.github.io/roamora-travels/sitemap.html

The HTML sitemap was created during the November 2026 audit.

### Robots Configuration

**URL:**
https://techglowsolutionsindia.github.io/roamora-travels/robots.txt

The configuration allows general crawling and references the XML sitemap.

**Latest live SEO verification:** Pending deployment.

## 5. Application Architecture

Roamora Travels uses a static frontend architecture.

### Frontend

- HTML5 provides page structure.
- CSS3 provides layout and responsive design.
- Vanilla JavaScript handles interactive features.
- JSON files provide structured travel content.
- GitHub Pages hosts the static frontend.

### Dynamic Content

The travel journal system reads structured content from:

`data/blogs.json`

The destination system uses:

`data/destinations.json`

Tour package details use URL parameters, including:

`package-details.html?package=package-slug`

Travel journal details use:

`travel-blog-details.html?slug=journal-slug`

### Backend

The enquiry system uses Google Apps Script with Google Sheets.

No separate Render, Node.js or Brevo backend is confirmed for this project.

Do not introduce another backend unless the project requirements change.

## 6. Enquiry Form Integration

**Integration:** Google Apps Script and Google Sheets.

**Purpose:** Receive travel enquiries and provide email notifications.

### Confirmed by Project Owner

- Enquiry submissions are integrated with Google Sheets.
- Owner notification emails are configured.
- Customer confirmation emails are configured.
- Enquiry form testing was successful.

### Frontend Implementation

The exact frontend submission file, form selector, HTTP transport and validation rules should be confirmed against the latest project source before documenting implementation-specific details.

### Important Verification

A successful frontend submission message does not independently prove server-side delivery.

When testing after deployment, verify:

1. Enquiry submission from the live website.
2. New entry in the Google Sheets worksheet.
3. Owner notification email.
4. Customer confirmation email.
5. No unexpected errors in the browser console or Apps Script execution history.

## 7. Google Sheets and Google Apps Script

### Account Information

**Project Owner Email:**
jaisanjoseph369@gmail.com

**Google Account:**
jaisanjoseph369@gmail.com

**Google Sheets Account:**
jaisanjoseph369@gmail.com

### Google Spreadsheet

**Spreadsheet Name:** Roamora Travels

**Enquiry Worksheet:** Data

**Spreadsheet ID:** Not documented.

### Google Apps Script

**Project Name:**
Roamora Travels - Enquiry Form

**Deployment Version:** 4

**Deployment Date:** 6 November 2026

**Web App URL:**

https://script.google.com/macros/s/AKfycbwh_VLudhUytDs6MUa_PpDfNWVMytA-wvuRMaZlnnJ5XcHJ1k-YgOoiM6EdJUn8md3X/exec

**Owner-Reported Integration Status:** Tested successfully.

### Email Functions

- Owner receives enquiry notifications.
- Customer receives confirmation emails.

Exact sender settings, email templates, spam handling and Apps Script permissions should be checked in the Apps Script project.

### Important

The web app URL is a deployment endpoint, not a password.

Do not store private credentials, access tokens or sensitive customer records in this documentation.

## 8. Travel Packages and Destinations

### Tour Packages

The website includes a tour package listing and individual package details.

**Listing Page:** `packages.html`

**Details Page:** `package-details.html`

Package details use the `package` URL parameter.

Examples include:

- Kashmir Paradise Escape
- Ladakh Adventure Escape
- Kerala Backwater Retreat
- Royal Rajasthan Journey

Package slug validity and availability should be checked against the actual package data.

### Destinations

**Listing Page:** `destinations.html`

**Details Page:** `destination-details.html`

**Destination Data:** `data/destinations.json`

The destination guide and travel experience sections support visitors researching Indian travel destinations.

## 9. Travel Journal System

### Main Files

- `blog.html`
- `travel-blog-details.html`
- `data/blogs.json`
- `assets/js/pages/blog.js`
- `assets/js/pages/travel-blog-details.js`

### Journal Content

The JSON dataset contains 15 travel journals.

Each journal has its own slug and content, including:

- Page title and meta description
- Hero information
- Introduction
- Main article
- Photo gallery
- Travel tips
- Travel enquiry CTA
- Related journals

### Image Structure

Journal pages use WebP images, including:

- Hero image
- Introduction image
- Five main article images
- Eight gallery images
- Two travel tip images
- Final CTA image

This represents 18 images per journal.

### Dynamic Metadata

`travel-blog-details.js` updates journal-specific page metadata.

During the November 2026 audit, dynamic canonical URL generation was added using the journal slug.

### Related Journal Links

During the audit, an invalid `delhi-food-trail` related-journal slug was replaced with:

`hampi-ancient-temples-heritage`

The project owner confirmed the change was saved.

## 10. Newsletter and Other Integrations

**Relevant File:**
`assets/js/components/newsletter.js`

The existence of this file does not establish that a newsletter subscription backend is active.

Newsletter storage, delivery and provider configuration remain unverified.

No active Render or Brevo integration has been confirmed for Roamora Travels.

## 11. Form Validation and Security

### Frontend

The website should validate enquiry information before submission.

Exact field rules must be verified against the latest JavaScript.

### Backend

The Google Apps Script project should validate submitted information before writing to Google Sheets or sending emails.

### Security Requirements

- Do not commit passwords or API secrets.
- Do not expose confidential customer records.
- Keep Google Sheet access restricted to authorized accounts.
- Review Apps Script deployment permissions.
- Protect enquiry handling against unwanted or abusive submissions.
- Keep sensitive configuration outside public source code.

**Backend security configuration:** Not independently inspected in this documentation pass.

## 12. Configuration and Secrets

### Google Apps Script Endpoint

The current owner-provided deployment URL is documented in Section 7.

Before changing deployments, verify which frontend JavaScript file contains the active endpoint.

### Environment Variables

No project-specific environment variable names have been verified.

### Git Exclusions

The `.gitignore` file excludes:

- `.env` and environment-specific files
- Private key and certificate files
- `node_modules/`
- Logs and temporary files
- Editor-specific folders
- Build and cache folders

Never include passwords, private keys, authentication tokens or real customer records in Git.

## 13. Local Website Setup

1. Open `D:\web-projects\roamora-travels\` in VS Code.
2. Start the website using Live Server.
3. Open `index.html`.
4. Verify navbar and footer navigation.
5. Test the destination and package pages.
6. Test journal navigation and dynamic content.
7. Check responsive layouts.
8. Check browser console errors.
9. Test enquiry submissions with controlled test data.
10. Verify Google Sheets and email results separately.

The frontend uses HTML, CSS and vanilla JavaScript.

No Node.js installation is required for the confirmed static frontend architecture.

## 14. Frontend Deployment — GitHub Pages

### Repository

https://github.com/techglowsolutionsindia/roamora-travels/

### Deployment Procedure

1. Complete the local audit.
2. Save all approved changes.
3. Review `git status`.
4. Review modified and untracked files.
5. Check for unwanted or unused files.
6. Verify dependencies before removing any file.
7. Obtain approval before deletion.
8. Confirm the Git remote URL.
9. Commit changes from the existing project folder.
10. Push to the configured GitHub branch.
11. Confirm GitHub Pages publishes the latest changes.
12. Test important pages and navigation.
13. Verify images and SVG logos.
14. Verify `robots.txt` and `sitemap.xml`.
15. Test the live enquiry form.
16. Update the Google Drive backup.

**Latest deployment after November audit:** Pending verification.

## 15. Google Apps Script Deployment

### Project

Roamora Travels - Enquiry Form

### Latest Owner-Reported Deployment

**Version:** 4

**Date:** 6 November 2026

### Maintenance Procedure

1. Open the Google Apps Script dashboard.
2. Select the Roamora Travels enquiry project.
3. Review the active deployment.
4. Confirm the target spreadsheet.
5. Confirm the `Data` worksheet.
6. Review owner notification logic.
7. Review customer confirmation logic.
8. Verify execution permissions.
9. Test an enquiry.
10. Check spreadsheet records and both email destinations.

Only update the frontend web app URL when a new endpoint is intentionally deployed.

## 16. Testing History

### Completed or Confirmed by Project Owner

- Original website development completed on 21 October 2026.
- Website published through GitHub Pages.
- Google Apps Script enquiry integration configured.
- Google Sheets integration tested successfully.
- Owner notification emails tested successfully.
- Customer confirmation emails tested successfully.
- Apps Script Version 4 deployed on 6 November 2026.
- Main HTML page audit changes saved as confirmed during the current review.
- Dynamic journal canonical URL change saved.
- Broken related-journal slug corrected.
- HTML sitemap created.
- XML sitemap created.
- Robots sitemap reference added.
- `.gitignore` reviewed without mandatory changes.

### Still Pending

- Final GitHub push after the November audit.
- Verification of the newly deployed live website.
- Live enquiry retesting after deployment.
- Final Google Drive backup.
- Final project closure confirmation.

## 17. Maintenance and Known Limitations

### Dynamic Journal SEO

Journal metadata is updated through JavaScript.

Independent journal indexing and social sharing previews may require static or prerendered pages.

### Google Apps Script

The backend is externally hosted.

Changes to deployment permissions or endpoint URLs can affect enquiry submissions.

### Email Delivery

Successful test emails do not guarantee inbox delivery for every recipient.

Monitor spam classification and delivery behavior when necessary.

### Future Custom Domain

If the website moves from GitHub Pages to another domain:

- Update canonical URLs.
- Update XML sitemap URLs.
- Update robots sitemap reference.
- Review frontend links and redirects.
- Verify Apps Script integration.
- Retest the live enquiry form.
- Verify email notifications.

### Website Content

Review tour package details, destination information, contact information and business claims before using the demonstration website commercially.

## 18. GitHub and Google Drive Backup

### GitHub

**Repository:**
https://github.com/techglowsolutionsindia/roamora-travels/

**Original Website Publication:** Completed.

**Latest Audit Changes Pushed:** Pending verification.

### Google Drive

**Backup Account:** TechGlow Solutions account.

**Original Project Backup:** Reported completed.

**Latest November 2026 Backup:** Pending.

### Backup Requirements

Maintain a current backup containing:

- All HTML files
- CSS files
- JavaScript files
- JSON data files
- Website images
- SVG logos
- XML sitemap
- Robots configuration
- Git configuration files as appropriate
- `PROJECT-DOCUMENTATION.md`

Never include passwords, secrets or confidential customer information in the backup.

## 19. Common Service Details — TechGlow Solutions

### GitHub

**Repository:**
https://github.com/techglowsolutionsindia/roamora-travels/

**Hosting:** GitHub Pages.

### Google Apps Script

**Dashboard:**
https://script.google.com/home

**Project:** Roamora Travels - Enquiry Form

**Deployment:** Version 4 — 6 November 2026

### Google Sheets

**Dashboard:**
https://sheets.google.com/

**Spreadsheet:** Roamora Travels

**Worksheet:** Data

**Account:** jaisanjoseph369@gmail.com

### Google Drive

**Dashboard:**
https://drive.google.com/

**Backup:** TechGlow Solutions account.

### Render and Brevo

No project-specific Render or Brevo service is confirmed for Roamora Travels.

Do not copy backend settings from another TechGlow Solutions project.

## 20. Final Project Closure Checklist

- [x] Original website developed
- [x] Original project completed on 21 October 2026
- [x] Original GitHub Pages publication completed
- [x] Main HTML pages created
- [x] Travel destination and package pages created
- [x] Travel journal system implemented
- [x] Google Sheets enquiry integration configured
- [x] Owner notification emails tested
- [x] Customer confirmation emails tested
- [x] Google Apps Script Version 4 deployed
- [x] Main HTML audit changes confirmed saved
- [x] Journal canonical URL update saved
- [x] Broken related-journal slug corrected
- [x] HTML sitemap created
- [x] XML sitemap created
- [x] Robots sitemap directive added
- [x] `.gitignore` reviewed
- [x] Project documentation drafted
- [ ] Save final `PROJECT-DOCUMENTATION.md` in the project root
- [ ] Verify all required audit changes
- [ ] Review unwanted and unused files
- [ ] Confirm Git remote and working branch
- [ ] Commit and push the final changes
- [ ] Verify GitHub Pages deployment
- [ ] Test live navigation, images and scripts
- [ ] Test live enquiry submission
- [ ] Verify Google Sheets entry
- [ ] Verify owner and customer emails
- [ ] Update Google Drive backup
- [ ] Confirm final project closure

---

**Documentation Last Updated:** 7 November 2026

**Original Project Completion Date:** 21 October 2026

**Documentation Status:** Prepared using the SweetCrumb Cakes reference format, Roamora Travels project details and the current audit history.

**Final Project Status:** Original website completed and published; November 2026 audit changes awaiting final deployment and backup verification.
