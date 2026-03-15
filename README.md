# Analog Clock App

React Native CLI app displaying an analog clock with timezone support and offline persistence.

## Run

```sh
yarn install
yarn android
```

---

## Architecture

### Folder structure
```
src/
├── api/          # Network layer (timezonedb.com fetch)
├── components/   # UI components (AnalogClock, TimezoneSelector, OfflineBanner)
├── context/      # TimezoneContext — shares selected timezone across the app
├── db/           # SQLite setup + queries (timezones table, preferences table)
├── hooks/        # useClockTime (animation loop), useTimezones (fetch + cache)
└── utils/        # Pure functions — time math, name formatting, size ratios
```

### Key decisions

- **Clock animation** uses `requestAnimationFrame` instead of `setInterval`. An alternative would be a 1-second `setInterval` updating state via context — simpler, but hands would jump discretely each second. rAF runs every frame (~16ms), giving smooth continuous hand movement. Elapsed time is measured from a start timestamp so floating-point errors don't accumulate over time.
- **Timezone time** is calculated using `gmtOffset` (seconds from UTC) + UTC date getters — `Intl.DateTimeFormat` with `timeZone` returns `NaN` on Android's.
- **Selected timezone** is managed via React Context. The context's setter wraps the SQLite save so any consumer just calls `setSelectedTimezone` — persistence is transparent.
- **Business logic is separated from UI** — components receive data via props/context and only render. Hooks and utils handle all logic.

---

## Offline Caching

Two SQLite tables:
- `Timezones` — cached API response (used when offline)
- `Preferences` — key/value store for the selected timezone

### Flow
1. Check connectivity via `@react-native-community/netinfo`
2. **Online** → fetch from API → show list → cache to SQLite
3. **Offline** → load directly from SQLite (no waiting for API timeout)
4. **API error** → fall back to SQLite cache as last resort

### Selected timezone persistence
Saved as `JSON.stringify(timezone)` on selection. On next launch, loaded and parsed back, then passed as the initial context value.

### Cache failure handling
`try/finally` in app init ensures the app always unblocks even if the DB fails — it launches with local time and no pre-selected timezone instead of getting stuck on a loading screen.

---

## Assumptions & Trade-offs

- `gmtOffset` used for time math instead of `Intl` API — `Intl.DateTimeFormat` returns `NaN` on Android Hermes
- When no timezone is selected the clock shows the device's local time (default behavior)
- Timezone list is fetched once per launch — zones rarely change, keeps the logic simple
- API key is gitignored — fine for assignment scope
- No iOS build — no Mac available
- UI settings (hand visibility, marker type) are not persisted — the infrastructure supports it but it's out of scope for the core requirements
- SQLite `Timezones` table stores only `zoneName`, `countryName`, and `gmtOffset` — `countryCode` and `timestamp` from the API are intentionally omitted as they are not used anywhere in the app
