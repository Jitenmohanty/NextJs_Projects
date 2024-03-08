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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ProfilePage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction ProfilePage() {\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"nothing\");\n    const logout = async ()=>{\n        try {\n            await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"/api/users/logout\");\n            router.push(\"/login\");\n        } catch (error) {\n            console.log(error.message);\n        }\n    };\n    const showDetails = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(async ()=>{\n        var _userDetail_data;\n        const userDetail = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"/api/users/userDetails\");\n        console.log(userDetail);\n        setData(userDetail === null || userDetail === void 0 ? void 0 : (_userDetail_data = userDetail.data) === null || _userDetail_data === void 0 ? void 0 : _userDetail_data.data._id);\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex gap-4 relative flex-col items-center justify-center min-h-screen py-2\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Profile\"\n            }, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Profile Details\"\n            }, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"p-1 rounded bg-green-500\",\n                children: data === \"nothing\" ? \"\" : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                    href: \"/profile/\".concat(data),\n                    children: data\n                }, void 0, false, {\n                    fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                    lineNumber: 33,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"hr\", {}, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 36,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: logout,\n                className: \"bg-black border absolute top-4 right-4 border-white mt-4  hover:bg-red-700 text-white font-bold py-2 px-4 rounded\",\n                children: \"Logout\"\n            }, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 37,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: showDetails,\n                disabled: data !== \"nothing\",\n                className: \"bg-black border  border-white mt-4  hover:bg-green-700 text-white font-bold py-2 px-4 rounded \".concat(data !== \"nothing\" ? \"opacity-[.4]\" : \"opacity-[1]\"),\n                children: \"User Detail\"\n            }, void 0, false, {\n                fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n                lineNumber: 43,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"F:\\\\NextJs\\\\next_auth_system\\\\src\\\\app\\\\profile\\\\page.tsx\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, this);\n}\n_s(ProfilePage, \"T2vWDuYhwiSYJQkgX/L+M60p1fE=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = ProfilePage;\nvar _c;\n$RefreshReg$(_c, \"ProfilePage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcHJvZmlsZS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDMEI7QUFDRztBQUN3QjtBQUNUO0FBRTdCLFNBQVNNOztJQUN0QixNQUFNQyxTQUFTRiwwREFBU0E7SUFDeEIsTUFBTSxDQUFDRyxNQUFNQyxRQUFRLEdBQUdMLCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU1NLFNBQVM7UUFDYixJQUFJO1lBQ0YsTUFBTVYsNkNBQUtBLENBQUNXLEdBQUcsQ0FBQztZQUNoQkosT0FBT0ssSUFBSSxDQUFDO1FBQ2QsRUFBRSxPQUFPQyxPQUFZO1lBQ25CQyxRQUFRQyxHQUFHLENBQUNGLE1BQU1HLE9BQU87UUFDM0I7SUFDRjtJQUVBLE1BQU1DLGNBQWNkLGtEQUFXQSxDQUFDO1lBR3RCZTtRQUZSLE1BQU1BLGFBQWEsTUFBTWxCLDZDQUFLQSxDQUFDVyxHQUFHLENBQUM7UUFDbkNHLFFBQVFDLEdBQUcsQ0FBQ0c7UUFDWlQsUUFBUVMsdUJBQUFBLGtDQUFBQSxtQkFBQUEsV0FBWVYsSUFBSSxjQUFoQlUsdUNBQUFBLGlCQUFrQlYsSUFBSSxDQUFDVyxHQUFHO0lBQ3BDLEdBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDQztRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7MEJBQUc7Ozs7OzswQkFDSiw4REFBQ0E7MEJBQUc7Ozs7OzswQkFDSiw4REFBQ0M7Z0JBQUdGLFdBQVU7MEJBQ1hiLFNBQVMsWUFDUixtQkFFQSw4REFBQ1AsaURBQUlBO29CQUFDdUIsTUFBTSxZQUFpQixPQUFMaEI7OEJBQVNBOzs7Ozs7Ozs7OzswQkFHckMsOERBQUNpQjs7Ozs7MEJBQ0QsOERBQUNDO2dCQUNDQyxTQUFTakI7Z0JBQ1RXLFdBQVU7MEJBQ1g7Ozs7OzswQkFHRCw4REFBQ0s7Z0JBQ0NDLFNBQVNWO2dCQUNUVyxVQUFVcEIsU0FBUztnQkFDbkJhLFdBQVcsaUdBQWlKLE9BQWhEYixTQUFTLFlBQVUsaUJBQWU7MEJBQy9JOzs7Ozs7Ozs7Ozs7QUFLUDtHQTdDd0JGOztRQUNQRCxzREFBU0E7OztLQURGQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3Byb2ZpbGUvcGFnZS50c3g/YzRlNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUHJvZmlsZVBhZ2UoKSB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoXCJub3RoaW5nXCIpO1xyXG4gIGNvbnN0IGxvZ291dCA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGF4aW9zLmdldChcIi9hcGkvdXNlcnMvbG9nb3V0XCIpO1xyXG4gICAgICByb3V0ZXIucHVzaChcIi9sb2dpblwiKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IubWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2hvd0RldGFpbHMgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCB1c2VyRGV0YWlsID0gYXdhaXQgYXhpb3MuZ2V0KFwiL2FwaS91c2Vycy91c2VyRGV0YWlsc1wiKTtcclxuICAgIGNvbnNvbGUubG9nKHVzZXJEZXRhaWwpO1xyXG4gICAgc2V0RGF0YSh1c2VyRGV0YWlsPy5kYXRhPy5kYXRhLl9pZCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC00IHJlbGF0aXZlIGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtaW4taC1zY3JlZW4gcHktMlwiPlxyXG4gICAgICA8aDE+UHJvZmlsZTwvaDE+XHJcbiAgICAgIDxoMT5Qcm9maWxlIERldGFpbHM8L2gxPlxyXG4gICAgICA8aDIgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQgYmctZ3JlZW4tNTAwXCI+XHJcbiAgICAgICAge2RhdGEgPT09IFwibm90aGluZ1wiID8gKFxyXG4gICAgICAgICAgXCJcIlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8TGluayBocmVmPXtgL3Byb2ZpbGUvJHtkYXRhfWB9PntkYXRhfTwvTGluaz5cclxuICAgICAgICApfVxyXG4gICAgICA8L2gyPlxyXG4gICAgICA8aHIgLz5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIG9uQ2xpY2s9e2xvZ291dH1cclxuICAgICAgICBjbGFzc05hbWU9XCJiZy1ibGFjayBib3JkZXIgYWJzb2x1dGUgdG9wLTQgcmlnaHQtNCBib3JkZXItd2hpdGUgbXQtNCAgaG92ZXI6YmctcmVkLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBweS0yIHB4LTQgcm91bmRlZFwiXHJcbiAgICAgID5cclxuICAgICAgICBMb2dvdXRcclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICBvbkNsaWNrPXtzaG93RGV0YWlsc31cclxuICAgICAgICBkaXNhYmxlZD17ZGF0YSAhPT0gXCJub3RoaW5nXCJ9XHJcbiAgICAgICAgY2xhc3NOYW1lPXtgYmctYmxhY2sgYm9yZGVyICBib3JkZXItd2hpdGUgbXQtNCAgaG92ZXI6YmctZ3JlZW4tNzAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHB5LTIgcHgtNCByb3VuZGVkICR7ZGF0YSAhPT0gXCJub3RoaW5nXCI/XCJvcGFjaXR5LVsuNF1cIjpcIm9wYWNpdHktWzFdXCJ9YH1cclxuICAgICAgPlxyXG4gICAgICAgIFVzZXIgRGV0YWlsXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiYXhpb3MiLCJMaW5rIiwiUmVhY3QiLCJ1c2VDYWxsYmFjayIsInVzZVN0YXRlIiwidXNlUm91dGVyIiwiUHJvZmlsZVBhZ2UiLCJyb3V0ZXIiLCJkYXRhIiwic2V0RGF0YSIsImxvZ291dCIsImdldCIsInB1c2giLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIiwic2hvd0RldGFpbHMiLCJ1c2VyRGV0YWlsIiwiX2lkIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJoMiIsImhyZWYiLCJociIsImJ1dHRvbiIsIm9uQ2xpY2siLCJkaXNhYmxlZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/profile/page.tsx\n"));

/***/ })

});