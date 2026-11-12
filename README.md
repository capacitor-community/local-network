<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">Local Network</h3>
<p align="center"><strong><code>@capacitor-community/local-network</code></strong></p>
<p align="center">
  Check and request the Android 17+ (API 37) local network access permission
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2026?style=flat-square" />
  <a href="https://www.npmjs.com/package/@capacitor-community/local-network"><img src="https://img.shields.io/npm/l/@capacitor-community/local-network?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor-community/local-network"><img src="https://img.shields.io/npm/v/@capacitor-community/local-network?style=flat-square" /></a>
</p>

## Requirements

Android 17 (API 37) introduced the `ACCESS_LOCAL_NETWORK` runtime permission, and Android only enforces it against applications that **target API 37 or later**:

| Your application | Local network access |
| ---------------- | -------------------- |
| Targets API 37+ | Blocked by default. The permission must be requested at runtime. |
| Targets API 36 or lower | Granted implicitly. The permission is not enforced. |

The Capacitor 8 application template ships `targetSdkVersion 36`, so with the defaults the permission is not enforced and this plugin reports `granted` without showing a prompt. See [Installation](docs/installation.md) for how to target API 37.

This plugin was extracted from the Capacitor 9 core proposal ([ionic-team/capacitor#8624](https://github.com/ionic-team/capacitor/pull/8624)) at the maintainers' request — see [capacitor-community/proposals#244](https://github.com/capacitor-community/proposals/issues/244).

## Maintainers

| Maintainer | GitHub | Social |
| -----------| -------| -------|
| Capacitor Community | [capacitor-community](https://github.com/capacitor-community) | |

## Documentation

- [Overview](docs/overview.md)
- [Installation](docs/installation.md)
- [Configuration](docs/configuration.md)
- [Usage](docs/usage.md)

## Demo

A working example can be found in the [example-app](./example-app) directory.

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`addListener('permissionChange', ...)`](#addlistenerpermissionchange-)
* [`addListener(string, ...)`](#addlistenerstring-)
* [`removeAllListeners()`](#removealllisteners)
* [`getPluginVersion()`](#getpluginversion)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => Promise<LocalNetworkPermissions>
```

Checks the current state of the local-network permission.

Android 17+ (API 37) reports the real runtime permission state
(`granted`, `denied` or `prompt`).

On older Android versions, iOS and web the permission is not enforced
and is always reported as `granted`, so calling this method never
triggers a system prompt.

**Returns:** <code>Promise&lt;<a href="#localnetworkpermissions">LocalNetworkPermissions</a>&gt;</code>

**Since:** 8.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<LocalNetworkPermissions>
```

Requests the local-network permission.

Android 17+ (API 37) shows the system permission prompt when the
permission has not been decided yet, then resolves with the resulting
state. A denied decision is reported as state, not as a rejection.

On older Android versions, iOS and web the permission is not enforced
and the call resolves immediately with `granted`.

**Returns:** <code>Promise&lt;<a href="#localnetworkpermissions">LocalNetworkPermissions</a>&gt;</code>

**Since:** 8.0.0

--------------------


### addListener('permissionChange', ...)

```typescript
addListener(eventName: 'permissionChange', listenerFunc: (event: LocalNetworkPermissionChangeEvent) => void) => Promise<PluginListenerHandle>
```

Listen for changes to the local-network permission state.
Emits when the permission state changes (e.g. after returning from system settings).
On platforms where the permission is not enforced, this will typically remain `granted`.

| Param              | Type                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'permissionChange'</code>                                                                                     |
| **`listenerFunc`** | <code>(event: <a href="#localnetworkpermissionchangeevent">LocalNetworkPermissionChangeEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 8.0.0

--------------------


### addListener(string, ...)

```typescript
addListener(eventName: string, listenerFunc: (...args: unknown[]) => void) => Promise<PluginListenerHandle>
```

Registers a listener for plugin events using a generic event name.

Prefer the typed `permissionChange` overload for full payload type safety.

| Param              | Type                                         |
| ------------------ | -------------------------------------------- |
| **`eventName`**    | <code>string</code>                          |
| **`listenerFunc`** | <code>(...args: unknown[]) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 8.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Removes all registered listeners for this plugin.

**Since:** 8.0.0

--------------------


### getPluginVersion()

```typescript
getPluginVersion() => Promise<PluginVersionResult>
```

Returns the native plugin version.

The returned version corresponds to the native implementation
bundled with the application.

**Returns:** <code>Promise&lt;<a href="#pluginversionresult">PluginVersionResult</a>&gt;</code>

**Since:** 8.0.0

--------------------


### Interfaces


#### LocalNetworkPermissions

Result of the LocalNetwork permission flow.

The property is declared explicitly (not via an index signature) so that
consumers can use dot access (`result.localNetwork`) even with the
`noPropertyAccessFromIndexSignature` compiler option enabled.

| Prop               | Type                                                        | Description                                                                                                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`localNetwork`** | <code><a href="#permissionstate">PermissionState</a></code> | State of the local-network (`ACCESS_LOCAL_NETWORK`) permission. On Android 17+ (API 37) this reflects the runtime permission state. On older Android versions, iOS and web the permission does not gate local-network access and is always reported as `granted`. |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### LocalNetworkPermissionChangeEvent

Event emitted when the local-network permission state changes.
Useful when the user returns from system settings after changing the permission.

| Prop               | Type                                                        | Description                                   |
| ------------------ | ----------------------------------------------------------- | --------------------------------------------- |
| **`localNetwork`** | <code><a href="#permissionstate">PermissionState</a></code> | Current state of the local-network permission |


#### PluginVersionResult

Result object returned by the `getPluginVersion()` method.

| Prop          | Type                | Description                              |
| ------------- | ------------------- | ---------------------------------------- |
| **`version`** | <code>string</code> | The native version string of the plugin. |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>
