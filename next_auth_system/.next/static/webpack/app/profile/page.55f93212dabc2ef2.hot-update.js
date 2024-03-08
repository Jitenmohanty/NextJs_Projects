"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/profile/page",{

/***/ "(app-pages-browser)/./src/app/profile/page.tsx":
/*!**********************************!*\
  !*** ./src/app/profile/page.tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ProfilePage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction ProfilePage() {\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"nothing\");\n    const logout = async ()=>{\n        try {\n            await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"/api/users/logout\");\n            router.push(\"/login\");\n        } catch (error) {\n            console.log(error.message);\n        }\n    };\n    const showDetails = async ()=>{\n        const userDetail = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"/api/users/userDetails\");\n        console.log(userDetail);\n        set;\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex gap-4 relative flex-col items-center justify-center min-h-screen py-2\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Profile\"\n            }, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 29,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Profile Details\"\n            }, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 30,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"p-1 rounded bg-green-500\",\n                children: data === \"nothing\" ? \"Nothing\" : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                    href: \"/profile/\".concat(data),\n                    children: data\n                }, void 0, false, {\n                    fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 88\n                }, this)\n            }, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 31,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"hr\", {}, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 33,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: logout,\n                className: \"bg-black border absolute top-4 right-4 border-white mt-4  hover:bg-red-700 text-white font-bold py-2 px-4 rounded\",\n                children: \"Logout\"\n            }, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 34,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: showDetails,\n                className: \"bg-black border  border-white mt-4  hover:bg-green-700 text-white font-bold py-2 px-4 rounded\",\n                children: \"User Detail\"\n            }, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 38,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n        lineNumber: 28,\n        columnNumber: 9\n    }, this);\n}\n_s(ProfilePage, \"euEk539JupyXDBKu4CUyc7N+VNo=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = ProfilePage;\nvar _c;\n$RefreshReg$(_c, \"ProfilePage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcHJvZmlsZS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDMEI7QUFDRztBQUNTO0FBQ0k7QUFHM0IsU0FBU0s7O0lBQ3BCLE1BQU1DLFNBQVNGLDBEQUFTQTtJQUN4QixNQUFNLENBQUNHLE1BQU1DLFFBQVEsR0FBR0wsK0NBQVFBLENBQUM7SUFDakMsTUFBTU0sU0FBUztRQUNYLElBQUk7WUFDQSxNQUFNVCw2Q0FBS0EsQ0FBQ1UsR0FBRyxDQUFDO1lBQ2hCSixPQUFPSyxJQUFJLENBQUM7UUFDaEIsRUFBRSxPQUFPQyxPQUFXO1lBQ2hCQyxRQUFRQyxHQUFHLENBQUNGLE1BQU1HLE9BQU87UUFDN0I7SUFDSjtJQUVBLE1BQU1DLGNBQWM7UUFDaEIsTUFBTUMsYUFBYyxNQUFNakIsNkNBQUtBLENBQUNVLEdBQUcsQ0FBQztRQUNwQ0csUUFBUUMsR0FBRyxDQUFDRztRQUNaQztJQUNKO0lBR0EscUJBQ0ksOERBQUNDO1FBQUlDLFdBQVU7OzBCQUNYLDhEQUFDQzswQkFBRzs7Ozs7OzBCQUNKLDhEQUFDQTswQkFBRzs7Ozs7OzBCQUNKLDhEQUFDQztnQkFBR0YsV0FBVTswQkFBNEJiLFNBQVMsWUFBWSwwQkFBWSw4REFBQ04saURBQUlBO29CQUFDc0IsTUFBTSxZQUFpQixPQUFMaEI7OEJBQVNBOzs7Ozs7Ozs7OzswQkFFaEgsOERBQUNpQjs7Ozs7MEJBQ0QsOERBQUNDO2dCQUNEQyxTQUFTakI7Z0JBQ1RXLFdBQVU7MEJBQ1Q7Ozs7OzswQkFDRCw4REFBQ0s7Z0JBQ0RDLFNBQVNWO2dCQUNUSSxXQUFVOzBCQUNUOzs7Ozs7Ozs7Ozs7QUFHVDtHQXBDd0JmOztRQUNMRCxzREFBU0E7OztLQURKQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3Byb2ZpbGUvcGFnZS50c3g/YzRlNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcbmltcG9ydCBSZWFjdCwge3VzZVN0YXRlfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHt1c2VSb3V0ZXJ9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9maWxlUGFnZSgpIHtcclxuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXHJcbiAgICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShcIm5vdGhpbmdcIilcclxuICAgIGNvbnN0IGxvZ291dCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBheGlvcy5nZXQoJy9hcGkvdXNlcnMvbG9nb3V0JylcclxuICAgICAgICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6YW55KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaG93RGV0YWlscyA9IGFzeW5jKCk9PntcclxuICAgICAgICBjb25zdCB1c2VyRGV0YWlsICA9IGF3YWl0IGF4aW9zLmdldChcIi9hcGkvdXNlcnMvdXNlckRldGFpbHNcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2codXNlckRldGFpbCk7XHJcbiAgICAgICAgc2V0XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC00IHJlbGF0aXZlIGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtaW4taC1zY3JlZW4gcHktMlwiPlxyXG4gICAgICAgICAgICA8aDE+UHJvZmlsZTwvaDE+XHJcbiAgICAgICAgICAgIDxoMT5Qcm9maWxlIERldGFpbHM8L2gxPlxyXG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQgYmctZ3JlZW4tNTAwXCI+e2RhdGEgPT09ICdub3RoaW5nJyA/IFwiTm90aGluZ1wiIDogPExpbmsgaHJlZj17YC9wcm9maWxlLyR7ZGF0YX1gfT57ZGF0YX1cclxuICAgICAgICAgICAgPC9MaW5rPn08L2gyPlxyXG4gICAgICAgIDxociAvPlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICBvbkNsaWNrPXtsb2dvdXR9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiYmctYmxhY2sgYm9yZGVyIGFic29sdXRlIHRvcC00IHJpZ2h0LTQgYm9yZGVyLXdoaXRlIG10LTQgIGhvdmVyOmJnLXJlZC03MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgcHktMiBweC00IHJvdW5kZWRcIlxyXG4gICAgICAgID5Mb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgb25DbGljaz17c2hvd0RldGFpbHN9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiYmctYmxhY2sgYm9yZGVyICBib3JkZXItd2hpdGUgbXQtNCAgaG92ZXI6YmctZ3JlZW4tNzAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHB5LTIgcHgtNCByb3VuZGVkXCJcclxuICAgICAgICA+VXNlciBEZXRhaWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuIl0sIm5hbWVzIjpbImF4aW9zIiwiTGluayIsIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJQcm9maWxlUGFnZSIsInJvdXRlciIsImRhdGEiLCJzZXREYXRhIiwibG9nb3V0IiwiZ2V0IiwicHVzaCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJzaG93RGV0YWlscyIsInVzZXJEZXRhaWwiLCJzZXQiLCJkaXYiLCJjbGFzc05hbWUiLCJoMSIsImgyIiwiaHJlZiIsImhyIiwiYnV0dG9uIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/profile/page.tsx\n"));

/***/ })

});