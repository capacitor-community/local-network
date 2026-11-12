# Installation

```bash
npm install @capacitor-community/local-network
npx cap sync
```

## Requirements

- **Capacitor 8 or later** (`@capacitor/core >= 8.0.0`). The plugin was extracted from the Capacitor 9 core proposal and tracks the same `checkPermissions()` / `requestPermissions()` contract.
- **Android**, for the permission to be enforced. iOS and web always report `granted`.
- **Android 17 (API 37) or later** on the device, and an application that **targets API 37**, for the permission to actually be enforced.

The `ACCESS_LOCAL_NETWORK` permission is declared by this plugin's own Android manifest and merged into your application automatically. You do not need to add it to your `AndroidManifest.xml`.

## Targeting API 37

The permission is only enforced against applications that target API 37 or later. The Capacitor 8 application template ships `targetSdkVersion 36`, so with the defaults the permission is granted implicitly and this plugin reports `granted` without ever showing a prompt.

To opt in, update `android/variables.gradle`:

```gradle
ext {
    compileSdkVersion = 37
    targetSdkVersion = 37
    ...
}
```

`compileSdkVersion` must be at least 37 for the platform APIs to be available. Building against API 37 requires an Android Gradle Plugin that supports it — AGP 9.x or later.

> **Note**
> Android Studio offers to upgrade the Android Gradle Plugin when you open a project. Accepting that upgrade changes which Kotlin compiler compiles your application and its plugins; a plugin built against a newer Kotlin than yours cannot be read by your compiler. See [issue #3](https://github.com/capacitor-community/local-network/issues/3) if you hit `Class 'kotlin.Unit' was compiled with an incompatible version of Kotlin`.

Once your application targets API 37, `checkPermissions()` reports the real permission state and `requestPermissions()` shows the system prompt.
