# Overview

The `@capacitor-community/local-network` plugin provides a simple API to check and request the Android 17+ (API 37) `ACCESS_LOCAL_NETWORK` runtime permission.

On Android versions below API 37, iOS, and web, the permission is not enforced and is always reported as `granted`.

## Why this is a community plugin

The feature was first proposed for Capacitor core in [ionic-team/capacitor#8624](https://github.com/ionic-team/capacitor/pull/8624), targeting Capacitor 9. During the review, the Capacitor maintainers recommended extracting it into a standalone community plugin instead of merging it into core. That is where this plugin comes from — see [capacitor-community/proposals#244](https://github.com/capacitor-community/proposals/issues/244) for the accepted proposal.

The API deliberately mirrors the `checkPermissions()` / `requestPermissions()` contract Capacitor uses for runtime permissions, so the plugin can be swapped for the core API when it lands, and so it behaves like any other Capacitor permission plugin today.

## What the permission actually does

Android 17 (API 37) makes local network access a runtime permission. The platform applies it with a split model:

| Your application | Local network access |
| ---------------- | -------------------- |
| Targets API 37 or higher | **Blocked by default.** You must declare and request `ACCESS_LOCAL_NETWORK` at runtime. |
| Targets API 36 or lower | Granted implicitly. Android recommends **not** requesting the permission at runtime before you target API 37. |

This is why the plugin can look like a no-op. The Capacitor 8 application template ships `targetSdkVersion 36`, so an application built on Capacitor 8 keeps its local network access and the plugin correctly reports `granted` — there is nothing to request.

To make the permission effective, your application has to target API 37. See [Installation](installation.md) for the exact changes.

## Platform support

| Platform | Enforced | Reported state |
| -------- | -------- | ------------- |
| Android < 17 (API < 37) | No | `granted` |
| Android 17+ (API 37+), application targets API 37+ | Yes | `granted` / `denied` / `prompt` |
| Android 17+ (API 37+), application targets API < 37 | No, granted implicitly | `granted` |
| iOS | Not applicable, no runtime API exists | `granted` |
| Web | Not applicable | `granted` |

On iOS the system presents its own local-network privacy prompt the first time an application accesses the local network. That prompt cannot be triggered or queried from JavaScript, so this plugin does not attempt it.
