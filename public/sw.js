if(!self.define){let e,s={};const i=(i,c)=>(i=new URL(i+".js",c).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let o={};const t=e=>i(e,n),r={module:{uri:n},exports:o,require:t};s[n]=Promise.all(c.map((e=>r[e]||t(e)))).then((e=>(a(...e),o)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"def2af2995cd5189dc837e16e623bc07"},{url:"/_next/dynamic-css-manifest.json",revision:"d751713988987e9331980363e24189ce"},{url:"/_next/static/UiUVZ_ObMeI3DkoUgY7dQ/_buildManifest.js",revision:"35c64d9358e59958a4dc322f92494d9c"},{url:"/_next/static/UiUVZ_ObMeI3DkoUgY7dQ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/173-d8b318ac783c661d.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/190-19340406593c457d.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",revision:"2b4c1ee4fbe3a7cf"},{url:"/_next/static/chunks/218.57a830a2c55ba802.js",revision:"57a830a2c55ba802"},{url:"/_next/static/chunks/248.7acb42d59d01db89.js",revision:"7acb42d59d01db89"},{url:"/_next/static/chunks/298-e22765e385d73438.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/350-29c550f07d263777.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/37-5311e41227361114.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/383-3889383cd5392d06.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/4bd1b696-fc94df42bff322f9.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/517-ac5b1ff05f9b4631.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/735.6e9c7e96f28c50e2.js",revision:"6e9c7e96f28c50e2"},{url:"/_next/static/chunks/809.60db163c1a0507c2.js",revision:"60db163c1a0507c2"},{url:"/_next/static/chunks/863-67208fe52c052f31.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/app/_not-found/page-e76159d21a7528fc.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/app/artist/%5Bid%5D/page-e9562aa9137cb6e0.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/app/collections/liked/page-698cbf3ef6abad21.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/app/collections/playlists/%5Buuid%5D/page-4218143a7670fe56.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/app/collections/playlists/page-4d41ddb21adaf681.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/app/layout-deeca841a53f6f21.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/app/page-3626aa8bb9f4c464.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/app/search/page-527805fbc50f03ad.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/app/track/%5Bid%5D/page-fcb231306d235101.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/main-app-59910502a32f0cf3.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/main-ce7cd729a2d5e405.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/pages/_app-430fec730128923e.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/pages/_error-2d7241423c4a35ba.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-3c7cec85ae220769.js",revision:"UiUVZ_ObMeI3DkoUgY7dQ"},{url:"/_next/static/css/3e5eab90cfd4ceb6.css",revision:"3e5eab90cfd4ceb6"},{url:"/icons/Heart.svg",revision:"46ebeac8334d335123ac54a78df50e45"},{url:"/icons/Home.svg",revision:"2fbfab9b5edec28fdd6b31cfce27e61f"},{url:"/icons/LikedTracksPage.svg",revision:"afb03bf14e9b754cf9f2c8c58b13b377"},{url:"/icons/Playlist.svg",revision:"895b8bf18c6e0a4e6aae89f1c294890d"},{url:"/icons/PlaylistPage.svg",revision:"e32162924583250337bfb44319430217"},{url:"/icons/create-plus.svg",revision:"5e43aa5d8d7e99d530955e9737c7ecdb"},{url:"/icons/cross.svg",revision:"8a9dc39a4eb201866cba5f14dc20aa36"},{url:"/icons/emptyheart.svg",revision:"3b73a83a88152e02eaa0553dfd7b26d3"},{url:"/icons/loop.svg",revision:"9e743376ad6fb7c1245828f27e312291"},{url:"/icons/mobile/mobile-home-active.svg",revision:"ad3ae3a3304c283ee62cc0db7f25bec2"},{url:"/icons/mobile/mobile-home.svg",revision:"d22028be333250bac405ca95aea07d13"},{url:"/icons/mobile/mobile-library-active.svg",revision:"4709138509b1d0b94eb72682050be127"},{url:"/icons/mobile/mobile-library.svg",revision:"46ada35a6ac98dc3be2f73ac6bdab18f"},{url:"/icons/mobile/mobile-liked-active.svg",revision:"fbd1023716d908535b8d49d037ac8fe3"},{url:"/icons/mobile/mobile-liked.svg",revision:"303cfd9faf54655be2ad97b4ab57219a"},{url:"/icons/mobile/mobile-search-active.svg",revision:"90c2290535a18ce1fedd5b2ec1f1b603"},{url:"/icons/mobile/mobile-search.svg",revision:"023d2f8287009344819abfa277908c44"},{url:"/icons/nextsong.svg",revision:"942358359c17a621f9972d209c455d87"},{url:"/icons/open-sidebar.svg",revision:"a2a134ab35c4703836f84c70ac504214"},{url:"/icons/pause.svg",revision:"bf2bf421502571cfac8f82240a60df6f"},{url:"/icons/play-v2.svg",revision:"c484f7a1c58c7e6464c6ae20ce9c5aa9"},{url:"/icons/play.svg",revision:"62ac1005cbf477a3e588668f7edc8344"},{url:"/icons/prevsong.svg",revision:"56cd22ec2699a492976b01e7947e546d"},{url:"/icons/searchicon.svg",revision:"8c3bc553ecccfc0df2f14faa35049af6"},{url:"/icons/volumedown.svg",revision:"3006a0087df5a51f9ee08836a00cc9b0"},{url:"/icons/volumemute.svg",revision:"03f3d2916621b636f82dab353cd3ef3a"},{url:"/icons/volumeup.svg",revision:"fde951695c9215c495b667b0bdbcfdaa"},{url:"/images/Logo.svg",revision:"c2352335f272291e657c6c9265fc2e11"},{url:"/images/Playlist.svg",revision:"d5e8026ea4cae3df12ba0b4de0c7e29c"},{url:"/images/logo152.png",revision:"abf9b9a3cedfc98ec844f524b559d067"},{url:"/images/logo167.png",revision:"deef40425e965062677c1ea856175309"},{url:"/images/logo180.png",revision:"58d62b472b584dd157bb566d21a51686"},{url:"/images/logo192.png",revision:"cca3549097216696f3487435ee2c893a"},{url:"/images/logo512.png",revision:"899e33c3821692e2b5b1f5fb4ef31726"},{url:"/images/waismusic.png",revision:"adffd77ae0962f82da1d8f75e8a0a56b"},{url:"/manifest.json",revision:"c315bfa781f8b37da12c1d75c96b8454"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
