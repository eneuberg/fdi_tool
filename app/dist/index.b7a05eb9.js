// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"dZI1r":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "7dd44675b7a05eb9";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"jeorp":[function(require,module,exports) {
var _dataLoader = require("./utils/dataLoader"); // Adjust path as necessary
var _dataJson = require("./data/data.json");
var _eventManager = require("./services/eventManager");
document.addEventListener("DOMContentLoaded", ()=>{
    const questionnaire = (0, _dataLoader.initializeQuestionnaire)(_dataJson);
    const questionnaireEl = document.getElementById("questionnaire");
    if (!questionnaireEl) throw new Error("Questionnaire element not found");
    questionnaireEl.innerHTML = questionnaire.renderQuestionnaire();
    (0, _eventManager.EventManager).setup(questionnaire);
});

},{"./utils/dataLoader":"62kjY","./data/data.json":"SJt20","./services/eventManager":"4SkEe"}],"62kjY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initializeQuestionnaire", ()=>initializeQuestionnaire);
var _questionnaire = require("../models/questionnaire");
var _indicator = require("../models/indicator");
var _subsector = require("../models/subsector");
var _sector = require("../models/sector");
function initializeQuestionnaire(jsonData) {
    const sectors = Object.keys(jsonData.sectors).map((sectorName)=>{
        const subsectors = Object.keys(jsonData.sectors[sectorName]).map((subsectorName)=>{
            const subsectorData = jsonData.sectors[sectorName][subsectorName];
            const indicators = subsectorData.indicators.map((indicator)=>{
                return new (0, _indicator.Indicator)(indicator.text, indicator.comment, indicator.evaluation);
            });
            return new (0, _subsector.Subsector)(subsectorName, indicators);
        });
        return new (0, _sector.Sector)(sectorName, subsectors);
    });
    const questionnaire = new (0, _questionnaire.Questionnaire)(sectors);
    console.log(questionnaire);
    return questionnaire;
}

},{"../models/questionnaire":"hYToH","../models/indicator":"6b9xR","../models/subsector":"j30gT","../models/sector":"6wquK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hYToH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Questionnaire", ()=>Questionnaire);
class Questionnaire {
    sectors;
    currentSector;
    completed;
    constructor(sectors){
        this.sectors = sectors;
        this.currentSector = null;
        this.completed = false;
    }
    selectSector(sectorId) {
        this.currentSector?.resetQuestions(); // Reset questions when a new sector is selected
        this.currentSector = this.sectors.find((sector)=>sector.name === sectorId) || null;
        if (this.currentSector?.hasRealSubsectors() === false) this.selectSubsector(this.currentSector.subsectors[0].name); // Select the first subsector by default
    }
    selectSubsector(subsectorId) {
        this.currentSector?.resetQuestions();
        this.currentSector?.selectSubsector(subsectorId);
    }
    nextIndicator() {
        if (!this.currentSector?.currentSubsector?.isCompleted()) this.currentSector?.currentSubsector?.nextIndicator();
        else this.completed = true;
    }
    previousIndicator() {
        this.currentSector?.currentSubsector?.previousIndicator();
    }
    storeResponse(response) {
        console.log(response);
        this.currentSector?.currentSubsector?.currentIndicator?.storeResponse(response);
    }
    renderQuestionnaire() {
        //console.log(this.currentSector?.currentSubsector?.currentIndicator?.response);
        if (this.completed) return this.renderResults();
        else return this.renderIncompleteQuestionnaire();
    }
    renderResults() {
        const sectorName = this.currentSector?.name ?? "";
        const subsectorName = this.currentSector?.hasRealSubsectors() ? this.currentSector.currentSubsector?.name ?? "" : "";
        const evaluations = this.currentSector?.currentSubsector?.evaluateIndicators() ?? [];
        let opportunities = evaluations.filter((evaluation)=>evaluation).length;
        let risks = evaluations.length - opportunities;
        let sectorNameElement = sectorName ? `<h1>${sectorName}</h1>` : "";
        let subsectorNameElement = subsectorName ? `<h2>${subsectorName}</h2>` : "";
        const score = evaluations.length > 0 ? Math.round(opportunities / risks / (risks + opportunities) * 100) / 100 : 0;
        return `
            <h1>Results</h1>
            ${sectorNameElement}
            ${subsectorNameElement}
            <p>Indicators: ${evaluations.length}</p>
            <p>Opportunities: ${opportunities}</p>
            <p>Risks: ${risks}</p>
            <p>Score: ${score.toFixed(2)}</p>
        `;
    }
    renderIncompleteQuestionnaire() {
        let sectorOptions = '<option id="placeholder-chooseSector" value="">Choose a sector</option>';
        this.sectors.forEach((sector)=>{
            const selected = this.currentSector && this.currentSector.name === sector.name ? " selected" : "";
            sectorOptions += `<option value="${sector.name}"${selected}>${sector.name}</option>`;
        });
        return `
            <select id="sectorSelect">
                ${sectorOptions}
            </select>
            ${this.currentSector ? this.currentSector.renderSector() : ""}
        `;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"6b9xR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Indicator", ()=>Indicator);
var _evaluationFactory = require("./evaluation/evaluationFactory");
class Indicator {
    text;
    comment;
    evaluation;
    response;
    constructor(text, comment, criteria){
        this.text = text;
        this.comment = comment;
        this.evaluation = (0, _evaluationFactory.EvaluationFactory).createEvaluation(criteria);
        this.response = null;
    }
    storeResponse(response) {
        this.response = response;
    }
    evaluateStoredResponse() {
        if (this.response === null) throw new Error("No response stored for evaluation.");
        return this.evaluation.evaluate(this.response);
    }
    resetResponse() {
        this.response = null;
    }
    isCompleted() {
        return this.response !== null;
    }
    renderIndicator() {
        return `
            <div class="indicator" id="indicator">
                <p id="question">${this.text}</p>
                <p>${this.comment}</p>
                ${this.evaluation.render(this.response)}
            </div>
        `;
    }
}

},{"./evaluation/evaluationFactory":"ktwFa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ktwFa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EvaluationFactory", ()=>EvaluationFactory);
var _checkboxEvaluation = require("./checkboxEvaluation");
var _multiCheckboxEvaluation = require("./multiCheckboxEvaluation");
var _rangeEvaluation = require("./rangeEvaluation");
class EvaluationFactory {
    static createEvaluation(criteria) {
        switch(criteria.type){
            case "checkbox":
                return new (0, _checkboxEvaluation.CheckboxEvaluation)();
            case "multicheckbox":
                return new (0, _multiCheckboxEvaluation.MultiCheckboxEvaluation)(criteria.options);
            case "range":
                return new (0, _rangeEvaluation.RangeEvaluation)(criteria.ranges);
            default:
                throw new Error("Unsupported evaluation type");
        }
    }
}

},{"./checkboxEvaluation":"hNA2d","./multiCheckboxEvaluation":"cEw3V","./rangeEvaluation":"1UrQP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hNA2d":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CheckboxEvaluation", ()=>CheckboxEvaluation);
var _evaluation = require("./evaluation");
class CheckboxEvaluation extends (0, _evaluation.Evaluation) {
    constructor(){
        super();
    }
    evaluate(response) {
        return response; // Assuming a single checkbox returns true if checked
    }
    render(response) {
        return `
        <input class="checkbox" type="checkbox" name="singleCheckbox" ${response ? "checked" : ""}/>
        <span class="label-text">Agree, otherwise click next</span>
        
         `;
    }
}

},{"./evaluation":"jTRHX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jTRHX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Evaluation", ()=>Evaluation);
class Evaluation {
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cEw3V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MultiCheckboxEvaluation", ()=>MultiCheckboxEvaluation);
var _evaluation = require("./evaluation");
class MultiCheckboxEvaluation extends (0, _evaluation.Evaluation) {
    options;
    constructor(options){
        super();
        this.options = options;
    }
    evaluate(response) {
        return response.some((value)=>value === true);
    }
    render(response) {
        return this.options.map((option, index)=>`<label><input class="checkbox" type="checkbox" name="multiCheckbox" value="${option}" ${response && response[index] ? "checked" : ""} />
            <span class="label-text">${option}</span>
            </label>`).join("<br />");
    }
}

},{"./evaluation":"jTRHX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1UrQP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RangeEvaluation", ()=>RangeEvaluation);
var _evaluation = require("./evaluation");
class RangeEvaluation extends (0, _evaluation.Evaluation) {
    ranges;
    constructor(ranges){
        super();
        this.ranges = ranges;
    }
    evaluate(response) {
        for (const range of this.ranges){
            if (range.operator === "more" && response > range.comparator || range.operator === "less" && response < range.comparator) return range.returnValue;
        }
        return null; // Return null if no ranges match
    }
    render(response) {
        return `<input type="number" placeholder="Percentage" maxlength="3" name="rangeInput"  ${response !== null ? `value="${response}"` : ""}/>`;
    }
}

},{"./evaluation":"jTRHX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j30gT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Subsector", ()=>Subsector);
class Subsector {
    name;
    indicators;
    currentIndicator;
    currentIndicatorIndex;
    isRealSubsector;
    constructor(name, indicators){
        this.name = name;
        this.indicators = indicators;
        this.currentIndicator = indicators[0];
        this.currentIndicatorIndex = 0;
        this.isRealSubsector = !name.endsWith("_direct");
    }
    resetIndicators() {
        this.indicators.forEach((indicator)=>indicator.resetResponse());
        this.currentIndicatorIndex = 0;
        this.currentIndicator = this.indicators[0];
    }
    evaluateIndicators() {
        return this.indicators.map((indicator)=>indicator.evaluateStoredResponse());
    }
    isCompleted() {
        return this.indicators.every((indicator)=>indicator.isCompleted());
    }
    nextIndicator() {
        if (this.currentIndicatorIndex < this.indicators.length - 1) {
            this.currentIndicatorIndex++;
            this.currentIndicator = this.indicators[this.currentIndicatorIndex];
        }
    }
    previousIndicator() {
        if (this.currentIndicatorIndex > 0) {
            this.currentIndicatorIndex--;
            this.currentIndicator = this.indicators[this.currentIndicatorIndex];
        }
    }
    renderSubsector() {
        const nameHTML = this.isRealSubsector ? `<h2> ${this.name}</h2>` : "";
        const currentIndex = this.currentIndicator ? this.indicators.indexOf(this.currentIndicator) : 0;
        const progressValue = currentIndex / (this.indicators.length - 1); // Adjusted formula
        const progressBarHTML = `<progress class="progressBar" value="${progressValue}" max="1"></progress>`;
        return `
            ${nameHTML} 
            <form class= "indicatorForm" id="indicatorForm">
            ${nameHTML} ${this.currentIndicator?.renderIndicator()}
                <div class="next-back-button">
                    <button id="previousButton" name="action" value="previous" type="submit">Previous</button>
                    <button id="nextButton" name="action" value="next" type="submit">Next</button>
                </div>
            </form>
            ${progressBarHTML}
        `;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6wquK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Sector", ()=>Sector);
class Sector {
    name;
    subsectors;
    currentSubsector;
    constructor(name, subsectors){
        this.name = name;
        this.subsectors = subsectors || [];
        this.currentSubsector = null;
    }
    selectSubsector(subsectorId) {
        this.currentSubsector = this.subsectors.find((subsector)=>subsector.name === subsectorId) || null;
    }
    resetQuestions() {
        if (this.currentSubsector) this.currentSubsector.resetIndicators();
    }
    hasRealSubsectors() {
        return !(this.subsectors.length === 1 && !this.subsectors[0].isRealSubsector);
    }
    renderSubsectorSelection() {
        if (this.currentSubsector?.isRealSubsector === false) return "";
        let subsectorOptions = '<option value="">Choose a Subsector</option>';
        this.subsectors.forEach((subsector)=>{
            const selected = this.currentSubsector && this.currentSubsector.name === subsector.name ? " selected" : "";
            subsectorOptions += `<option value="${subsector.name}"${selected}>${subsector.name}</option>`;
        });
        return `
            <select id="subsectorSelect">
                ${subsectorOptions}
            </select>
        `;
    }
    renderSector() {
        return `
            
            ${this.renderSubsectorSelection()}
            ${this.currentSubsector ? this.currentSubsector.renderSubsector() : ""}
        `;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"SJt20":[function(require,module,exports) {
module.exports = JSON.parse('{"sectors":{"Agriculture":{"Agriculture_direct":{"indicators":[{"text":"Is the operating surplus divided by the land value expressed as a percentage? (Note: This measure assumes that land values reflect production potential and not other externalities.)","comment":"","evaluation":{"type":"range","ranges":[{"operator":"less","comparator":8,"returnValue":false},{"operator":"more","comparator":15,"returnValue":true}]}},{"text":"Which of the following complies?","comment":"","evaluation":{"type":"multicheckbox","options":["Access to or availed credit","Access to or availed insurance","Share of a single agricultural commodity less than 66% in the total value of production of the holding"]}},{"text":"Is the FDI project likely to cause one of the following:","comment":"","evaluation":{"type":"multicheckbox","options":["Soil erosion","Reduction in soil fertility","Salinization of irrigated land","Waterlogging"]}},{"text":"Annual groundwater abstraction for agriculture by MNE \u2013 annual groundwater recharge from rainfall =Groundwater balance (m3) (if negative ballance add \\"-\\") Dont know how to rephrase this","comment":"","evaluation":{"type":"range","ranges":[{"operator":"less","comparator":0,"returnValue":false},{"operator":"more","comparator":0,"returnValue":true}]}},{"text":"Does the MNE have a history of adhering to the International Code of Conduct on Pesticide Management?","comment":"","evaluation":{"type":"checkbox"}},{"text":"With which of the following points does the FDI comply:","comment":"","evaluation":{"type":"multicheckbox","options":["Leaves at least 10% of the holding area for natural or diverse vegetation.","Produces agricultural products that are organically certified, or its products are undergoing the certification process.","Does not use medically important antimicrobials as growth promoters.","At least two of the following contribute to farm production: 1) temporary crops, 2) pasture, 3) permanent crops, 4) trees on farm, 5) livestock or animal products, and 6) aquaculture.","Practices crop or crop/pasture rotation involving at least 2 crops or crops and pastures on at least 80% of the farm cultivated area (excluding permanent crops and permanent pastures) over a period of 3 years. In case of a 2-crop rotation, the 2 crops must be from different plant genus, e.g., a grass plus a legume, or a grass plus a tuber etc.","Livestock includes locally adapted breeds."]}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]}},"Mining":{"Mining_direct":{"indicators":[{"text":"What percentage of the generated profits is reinvested into further project development?","comment":"","evaluation":{"type":"range","ranges":[{"operator":"less","comparator":20,"returnValue":false},{"operator":"more","comparator":20,"returnValue":true}]}},{"text":"What percentage of the generated profits is reinvested into local research and development?","comment":"","evaluation":{"type":"range","ranges":[{"operator":"less","comparator":5,"returnValue":false},{"operator":"more","comparator":5,"returnValue":true}]}},{"text":"Are all of the technologies used recognized by sector standards to be environmentally sustainable?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Has IPA legally agreed to take responsibility for proper site clean-up after closure?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]}},"Manufacturing":{"Manufacturing_direct":{"indicators":[{"text":"Do FDI project proposals contain credible commitments to work safety and allocate a dedicated budget for protective gears?","comment":"","evaluation":{"type":"checkbox"}},{"text":"What is the projected annual production growth provided in the project business plan? (Please specify in percentage)","comment":"","evaluation":{"type":"range","ranges":[{"operator":"less","comparator":10,"returnValue":false},{"operator":"more","comparator":10,"returnValue":true}]}},{"text":"What percentage of workers are fully employed for at least 12 months?","comment":"","evaluation":{"type":"range","ranges":[{"operator":"less","comparator":80,"returnValue":false},{"operator":"more","comparator":80,"returnValue":true}]}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]}},"Food":{"Food_direct":{"indicators":[{"text":"Does the proposal give priority to healthy, nutritious, and sustainable diets and products, especially concerning children and other vulnerable groups?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]}},"Oil Refinery and Chemicals":{"Oil Refinery and Chemicals_direct":{"indicators":[{"text":"Does the proposal address the risks and implications of climate change by using methods such as shadow prices on project carbon emissions?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MNE participating in UN-supported national reduce emissions from deforestation and forest degradation (REDD+) programmes?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE have measures to reduce the flaring of associated gas, including capture and use for power generation, liquefaction for transport, or re-injection back into the reservoirs?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE proposal have Carbon Capture and Storage (CCS) measures in place?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]}},"Electric Power":{"Electric Power_direct":{"indicators":[{"text":"Does the project have in place IEA recommended environmental safety standards and damage control mechanisms?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]}},"Financial Services":{"Financial Services_direct":{"indicators":[{"text":"Does the MNE use Socially Responsible Investment (SRI) screening methods for their investment strategies?","comment":"","evaluation":{"type":"checkbox"}},{"text":"What percentage of the portfolio investments consists of green bonds?","comment":"","evaluation":{"type":"range","ranges":[{"operator":"less","comparator":20,"returnValue":false},{"operator":"more","comparator":20,"returnValue":true}]}},{"text":"Does the project perform sustainable credit risk assessment when lending money to its clients?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]}},"Tourism and hospitality":{"Tourism and hospitality_direct":{"indicators":[{"text":"What is the expected number of tourists attracted per 1 million USD of investment?","comment":"","evaluation":{"type":"range","ranges":[{"operator":"less","comparator":100,"returnValue":false},{"operator":"more","comparator":100,"returnValue":true}]}},{"text":"What is the estimated expenditure made by tourists for accommodation, food, and any leisure activities during their stay in the foreign-invested tourism facility, measured in $USD per week per tourist?","comment":"","evaluation":{"type":"range","ranges":[{"operator":"less","comparator":1000,"returnValue":false},{"operator":"more","comparator":1000,"returnValue":true}]}},{"text":"What are the environmental damages caused per average tourist in a span of a year, measured in USD?","comment":"","evaluation":{"type":"range","ranges":[{"operator":"less","comparator":100,"returnValue":false},{"operator":"more","comparator":100,"returnValue":true}]}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]}},"Information and Communications Technology":{"Information and Communications Technology_direct":{"indicators":[{"text":"Does the MNE adhere to OECD Recommendation on Internet Policy Making Principles and have cybersecurity guidelines in place?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE have cybersecurity guidelines in place?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is there radio frequency exposure in the range from 3 kHz to 300 GHz?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE follow the Step (Solving the E-Waste Problem) initiative?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE have special programs to raise digital literacy?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Has the MNE adopted the Child Online Protection Guidelines?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]}},"Healthcare":{"Pharmaceuticals":{"indicators":[{"text":"Does the project aim to neutralize risks of vaccine production in the local value chains?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project have in place environmental quality norms and follow specific guidance documents to reduce environmental impacts?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the project aimed at expanding the local range of services available?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project comply with ILO standards and national legislation to ensure the protection of the minimum standards for labor rights?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap? If identified, does the MSME introduce measures to address gender imbalances in the workforce, especially in managerial positions, such as training programs?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net-zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]},"Medical devices":{"indicators":[{"text":"Does the project aim to neutralize risks in the local value chains?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project comply with ILO standards and national legislation to ensure the protection of the minimum standards for labor rights?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the project aimed at expanding the local range of services available?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is there implementation of life cycle assessment (LCA) and circularity principles measuring multiple life cycles?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap? If identified, does the MSME introduce measures to address gender imbalances in the workforce, especially in managerial positions, such as training programs?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net-zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]},"Biotechnology":{"indicators":[{"text":"Does the project have in place environmental quality norms and follow specific guidance documents to reduce environmental impacts?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project take part in safety reporting in clinical trials?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the project aimed at expanding the local range of services available?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Has the project conducted extensive market research evaluating long-term product market value, regional drug regulations, competitors, etc.?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap? If identified, does the MSME introduce measures to address gender imbalances in the workforce, especially in managerial positions, such as training programs?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net-zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]},"Healthcare services":{"indicators":[{"text":"Is the project compatible with social objectives like universal access and affordability?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the project aimed at expanding the local range of services available?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project have in place strategies for reducing and properly managing hazardous waste and plastics?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project offer paid maternity and paternity leave to its workers?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MNE measure, publish, and address its gender pay gap? If identified, does the MSME introduce measures to address gender imbalances in the workforce, especially in managerial positions, such as training programs?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the project procure from the local base economy where possible and feasible?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the MSME contribute to local labor force upskilling to ensure local employment opportunities across the value chain?","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company have internal mechanisms and legislation in place to ensure flexible working and gender equality? This includes offering flexible working arrangements or safe transportation to working facilities, balancing the male/female night shift ratio, offering or supporting daycare/childcare, addressing sexual harassment, and providing gender-appropriate work gear.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Does the company\'s business model and orientation focus on female well-being externally? This includes publicizing Corporate Social Responsibility (CSR) reports, offering products and services targeting women, and engaging in external partnerships or charity initiatives aimed at supporting women.","comment":"","evaluation":{"type":"checkbox"}},{"text":"Is the MSME making notable advances towards adapting renewable energy or achieving net-zero emissions?","comment":"","evaluation":{"type":"checkbox"}}]}}}}');

},{}],"4SkEe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EventManager", ()=>EventManager);
function renderQuestionnaire() {
    const questionnaireElement = document.getElementById("questionnaire");
    if (!questionnaireElement) throw new Error("Questionnaire element not found");
    questionnaireElement.innerHTML = EventManager.questionnaire.renderQuestionnaire();
}
class EventManager {
    static questionnaire;
    static setup(questionnaire) {
        EventManager.questionnaire = questionnaire;
        EventManager.addGlobalEventListener();
    }
    static addGlobalEventListener() {
        const questionnaireElement = document.getElementById("questionnaire");
        if (!questionnaireElement) throw new Error("Questionnaire element not found");
        // TODO: change event type; fired for <input>
        questionnaireElement.addEventListener("change", (event)=>{
            const target = event.target;
            const select = target;
            switch(target.id){
                case "sectorSelect":
                    EventManager.questionnaire.selectSector(select.value);
                    renderQuestionnaire();
                    break;
                case "subsectorSelect":
                    EventManager.questionnaire.selectSubsector(select.value);
                    renderQuestionnaire();
                    break;
            }
        });
        questionnaireElement.addEventListener("submit", (event)=>{
            event.preventDefault();
            const form = event.target;
            const submitter = event.submitter;
            const formData = new FormData(form, submitter);
            const firstChild = form.querySelector("input");
            switch(firstChild.name){
                case "multiCheckbox":
                    {
                        const allCheckboxes = form.querySelectorAll('input[type="checkbox"]');
                        const checkedStates = Array.from(allCheckboxes).map((checkbox)=>checkbox.checked);
                        this.questionnaire.storeResponse(checkedStates);
                        break;
                    }
                case "singleCheckbox":
                    {
                        const checkboxData = formData.get("singleCheckbox");
                        this.questionnaire.storeResponse(checkboxData);
                        break;
                    }
                case "rangeInput":
                    {
                        const rangeData = formData.get("rangeInput");
                        this.questionnaire.storeResponse(rangeData);
                        break;
                    }
            }
            const response = formData.get("action");
            switch(response){
                case "next":
                    EventManager.questionnaire.nextIndicator();
                    break;
                case "previous":
                    EventManager.questionnaire.previousIndicator();
                    break;
                default:
                    console.error("Unexpected action");
            }
            renderQuestionnaire();
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["dZI1r","jeorp"], "jeorp", "parcelRequirec720")

//# sourceMappingURL=index.b7a05eb9.js.map
