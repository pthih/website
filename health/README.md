# Public Base Camp health page

Served at https://phyothiha.com/health/ with pubstat.phyothiha.com redirecting to
it. Only sanitized service summaries, daily states and generic incident
timestamps are public. No private diagnostics or device addresses are included.

## Central-time history

All main bars use America/Chicago, including daylight saving time, regardless
of the viewer's timezone. Phones show 30 days, tablets 60 and desktops 90.
The publication timestamp and incident times also display Central time.

Home-service days already use the Pi's Central calendar. The companion homelab
change makes Outpost's missing-contact overlays and retention use Central time
too. It leaves the saved Pi report unchanged.

Website bars consume `website_central_days` from Outpost's existing feed. The
AWS Lightsail instance row represents monitor reporting continuity, using the
same Central-day coverage classification. A completed day with website failures
still proves the monitor ran, so it can be healthy for reporting continuity.
This is not an independent AWS uptime measurement.

An expandable Earlier UTC history section retains the original website and
monitor UTC summaries separately. No UTC day is shifted or presented as a
Central day. Central days with no observations remain unknown. Existing feed
files are not rewritten by this frontend change. Original UTC series retain
their source retention policy; the saved website pre-migration archive is also
available in `website_legacy_utc_days`.

## Sources and freshness

Outpost publishes both summaries about every 30 minutes. Homepi sends a
sanitized home report about every minute. Over five minutes without a report
is No recent report at the next publication, which can take a further hosting
delay to appear. Home publications older than 45 minutes are unknown. Older
Pi-published summaries retain the legacy 25-minute threshold.

Website checks run every two hours on Outpost. Checks older than three hours
are unknown. Browser clients read these saved feeds and do not probe the
website themselves. Missing or incomplete coverage does not prove an outage.

## Review and deployment

This change is PR-only until approved. Merge/deploy the companion homelab
publisher-calendar fix before publishing the website update. No scheduled
OpenClaw job or AI configuration is involved. Do not manually modify generated
`data.json` or `outpost-data.json`.

Run `node tests/test-public-home.cjs`, `node tests/test-health-responsive.cjs`
and `node tests/test-central-calendar.cjs`. The calendar test covers UTC/local
date divergence, both DST transitions, current-day selection, 30/60/90 counts,
legacy-only feeds and preserved UTC summaries. Repeat with different `TZ`
values to verify viewer independence.
