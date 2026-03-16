# Analog Clock App

React Native CLI app displaying an analog clock with timezone support and offline persistence.

## Run

**1. Create the API key file** (gitignored — not included in the repo):

```sh
# src/constants/api.ts
export const API_URL = 'http://api.timezonedb.com/v2.1';
export const API_KEY = 'YOUR_KEY_HERE'; # get a free key at https://timezonedb.com/register
```

**2. Install and run:**
```sh
yarn install
yarn android
```

---

## Architecture

### Folder structure
```
src/
├── api/          # Network layer (timezonedb.com fetch)\
├── components/   # UI components (AnalogClock, TimezoneSelector, OfflineBanner)
├── constants/    # Global configuration: API URLs and default layout settings
├── context/      # State Management: Context API for global Timezone and App state
├── db/           # Persistence Layer: SQLite schema, migrations, and CRUD operations
├── hooks/        # Logic Layer: Custom hooks (useClockTime) for rAF and data syncing
└── utils/        # Utilities: Math helpers for clock rotation and time-offset logic
```

### Key decisions

- **Clock animation** Uses `requestAnimationFrame` for a smooth 60fps sweep effect. Hand rotations are calculated by mapping time values (0-60) to a degree range (0-360) using a `transform: [{ rotate: 'Xdeg' }]` pattern, which is offloaded to the Native UI Thread via the Animated API for maximum performance.
- **Timezone time** is calculated using `gmtOffset` (seconds from UTC) + UTC date getters — `Intl.DateTimeFormat` with `timeZone` returns `NaN` on Android's.
- **Selected timezone** is managed via React Context. The context's setter wraps the SQLite save so any consumer just calls `setSelectedTimezone` — persistence is transparent.
- **Business logic is separated from UI** — components receive data via props/context and only render. Hooks and utils handle all logic.
- **Cleartext Traffic** — Since the TimeZoneDB free API uses http and Android blocks non-HTTPS traffic by default in release builds, I enabled android:usesCleartextTraffic in the Manifest. This ensures the app can fetch data in a production/release environment.

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
- API Key: The key is gitignored for security. However, for the provided APK executable, a temporary key has been bundled so the app is fully functional out-of-the-box.

