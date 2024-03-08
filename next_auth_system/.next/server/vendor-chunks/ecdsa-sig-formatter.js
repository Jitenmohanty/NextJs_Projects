"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ecdsa-sig-formatter";
exports.ids = ["vendor-chunks/ecdsa-sig-formatter"];
exports.modules = {

/***/ "(rsc)/./node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(rsc)/./node_modules/safe-buffer/index.js\").Buffer);\nvar getParamBytesForAlg = __webpack_require__(/*! ./param-bytes-for-alg */ \"(rsc)/./node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js\");\nvar MAX_OCTET = 0x80, CLASS_UNIVERSAL = 0, PRIMITIVE_BIT = 0x20, TAG_SEQ = 0x10, TAG_INT = 0x02, ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6, ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;\nfunction base64Url(base64) {\n    return base64.replace(/=/g, \"\").replace(/\\+/g, \"-\").replace(/\\//g, \"_\");\n}\nfunction signatureAsBuffer(signature) {\n    if (Buffer.isBuffer(signature)) {\n        return signature;\n    } else if (\"string\" === typeof signature) {\n        return Buffer.from(signature, \"base64\");\n    }\n    throw new TypeError(\"ECDSA signature must be a Base64 string or a Buffer\");\n}\nfunction derToJose(signature, alg) {\n    signature = signatureAsBuffer(signature);\n    var paramBytes = getParamBytesForAlg(alg);\n    // the DER encoded param should at most be the param size, plus a padding\n    // zero, since due to being a signed integer\n    var maxEncodedParamLength = paramBytes + 1;\n    var inputLength = signature.length;\n    var offset = 0;\n    if (signature[offset++] !== ENCODED_TAG_SEQ) {\n        throw new Error('Could not find expected \"seq\"');\n    }\n    var seqLength = signature[offset++];\n    if (seqLength === (MAX_OCTET | 1)) {\n        seqLength = signature[offset++];\n    }\n    if (inputLength - offset < seqLength) {\n        throw new Error('\"seq\" specified length of \"' + seqLength + '\", only \"' + (inputLength - offset) + '\" remaining');\n    }\n    if (signature[offset++] !== ENCODED_TAG_INT) {\n        throw new Error('Could not find expected \"int\" for \"r\"');\n    }\n    var rLength = signature[offset++];\n    if (inputLength - offset - 2 < rLength) {\n        throw new Error('\"r\" specified length of \"' + rLength + '\", only \"' + (inputLength - offset - 2) + '\" available');\n    }\n    if (maxEncodedParamLength < rLength) {\n        throw new Error('\"r\" specified length of \"' + rLength + '\", max of \"' + maxEncodedParamLength + '\" is acceptable');\n    }\n    var rOffset = offset;\n    offset += rLength;\n    if (signature[offset++] !== ENCODED_TAG_INT) {\n        throw new Error('Could not find expected \"int\" for \"s\"');\n    }\n    var sLength = signature[offset++];\n    if (inputLength - offset !== sLength) {\n        throw new Error('\"s\" specified length of \"' + sLength + '\", expected \"' + (inputLength - offset) + '\"');\n    }\n    if (maxEncodedParamLength < sLength) {\n        throw new Error('\"s\" specified length of \"' + sLength + '\", max of \"' + maxEncodedParamLength + '\" is acceptable');\n    }\n    var sOffset = offset;\n    offset += sLength;\n    if (offset !== inputLength) {\n        throw new Error('Expected to consume entire buffer, but \"' + (inputLength - offset) + '\" bytes remain');\n    }\n    var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;\n    var dst = Buffer.allocUnsafe(rPadding + rLength + sPadding + sLength);\n    for(offset = 0; offset < rPadding; ++offset){\n        dst[offset] = 0;\n    }\n    signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);\n    offset = paramBytes;\n    for(var o = offset; offset < o + sPadding; ++offset){\n        dst[offset] = 0;\n    }\n    signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);\n    dst = dst.toString(\"base64\");\n    dst = base64Url(dst);\n    return dst;\n}\nfunction countPadding(buf, start, stop) {\n    var padding = 0;\n    while(start + padding < stop && buf[start + padding] === 0){\n        ++padding;\n    }\n    var needsSign = buf[start + padding] >= MAX_OCTET;\n    if (needsSign) {\n        --padding;\n    }\n    return padding;\n}\nfunction joseToDer(signature, alg) {\n    signature = signatureAsBuffer(signature);\n    var paramBytes = getParamBytesForAlg(alg);\n    var signatureBytes = signature.length;\n    if (signatureBytes !== paramBytes * 2) {\n        throw new TypeError('\"' + alg + '\" signatures must be \"' + paramBytes * 2 + '\" bytes, saw \"' + signatureBytes + '\"');\n    }\n    var rPadding = countPadding(signature, 0, paramBytes);\n    var sPadding = countPadding(signature, paramBytes, signature.length);\n    var rLength = paramBytes - rPadding;\n    var sLength = paramBytes - sPadding;\n    var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;\n    var shortLength = rsBytes < MAX_OCTET;\n    var dst = Buffer.allocUnsafe((shortLength ? 2 : 3) + rsBytes);\n    var offset = 0;\n    dst[offset++] = ENCODED_TAG_SEQ;\n    if (shortLength) {\n        // Bit 8 has value \"0\"\n        // bits 7-1 give the length.\n        dst[offset++] = rsBytes;\n    } else {\n        // Bit 8 of first octet has value \"1\"\n        // bits 7-1 give the number of additional length octets.\n        dst[offset++] = MAX_OCTET | 1;\n        // length, base 256\n        dst[offset++] = rsBytes & 0xff;\n    }\n    dst[offset++] = ENCODED_TAG_INT;\n    dst[offset++] = rLength;\n    if (rPadding < 0) {\n        dst[offset++] = 0;\n        offset += signature.copy(dst, offset, 0, paramBytes);\n    } else {\n        offset += signature.copy(dst, offset, rPadding, paramBytes);\n    }\n    dst[offset++] = ENCODED_TAG_INT;\n    dst[offset++] = sLength;\n    if (sPadding < 0) {\n        dst[offset++] = 0;\n        signature.copy(dst, offset, paramBytes);\n    } else {\n        signature.copy(dst, offset, paramBytes + sPadding);\n    }\n    return dst;\n}\nmodule.exports = {\n    derToJose: derToJose,\n    joseToDer: joseToDer\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZWNkc2Etc2lnLWZvcm1hdHRlci9zcmMvZWNkc2Etc2lnLWZvcm1hdHRlci5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBLElBQUlBLFNBQVNDLDRGQUE2QjtBQUUxQyxJQUFJQyxzQkFBc0JELG1CQUFPQSxDQUFDO0FBRWxDLElBQUlFLFlBQVksTUFDZkMsa0JBQWtCLEdBQ2xCQyxnQkFBZ0IsTUFDaEJDLFVBQVUsTUFDVkMsVUFBVSxNQUNWQyxrQkFBa0IsVUFBV0gsZ0JBQWtCRCxtQkFBbUIsR0FDbEVLLGtCQUFrQkYsVUFBV0gsbUJBQW1CO0FBRWpELFNBQVNNLFVBQVVDLE1BQU07SUFDeEIsT0FBT0EsT0FDTEMsT0FBTyxDQUFDLE1BQU0sSUFDZEEsT0FBTyxDQUFDLE9BQU8sS0FDZkEsT0FBTyxDQUFDLE9BQU87QUFDbEI7QUFFQSxTQUFTQyxrQkFBa0JDLFNBQVM7SUFDbkMsSUFBSWQsT0FBT2UsUUFBUSxDQUFDRCxZQUFZO1FBQy9CLE9BQU9BO0lBQ1IsT0FBTyxJQUFJLGFBQWEsT0FBT0EsV0FBVztRQUN6QyxPQUFPZCxPQUFPZ0IsSUFBSSxDQUFDRixXQUFXO0lBQy9CO0lBRUEsTUFBTSxJQUFJRyxVQUFVO0FBQ3JCO0FBRUEsU0FBU0MsVUFBVUosU0FBUyxFQUFFSyxHQUFHO0lBQ2hDTCxZQUFZRCxrQkFBa0JDO0lBQzlCLElBQUlNLGFBQWFsQixvQkFBb0JpQjtJQUVyQyx5RUFBeUU7SUFDekUsNENBQTRDO0lBQzVDLElBQUlFLHdCQUF3QkQsYUFBYTtJQUV6QyxJQUFJRSxjQUFjUixVQUFVUyxNQUFNO0lBRWxDLElBQUlDLFNBQVM7SUFDYixJQUFJVixTQUFTLENBQUNVLFNBQVMsS0FBS2hCLGlCQUFpQjtRQUM1QyxNQUFNLElBQUlpQixNQUFNO0lBQ2pCO0lBRUEsSUFBSUMsWUFBWVosU0FBUyxDQUFDVSxTQUFTO0lBQ25DLElBQUlFLGNBQWV2QixDQUFBQSxZQUFZLElBQUk7UUFDbEN1QixZQUFZWixTQUFTLENBQUNVLFNBQVM7SUFDaEM7SUFFQSxJQUFJRixjQUFjRSxTQUFTRSxXQUFXO1FBQ3JDLE1BQU0sSUFBSUQsTUFBTSxnQ0FBZ0NDLFlBQVksY0FBZUosQ0FBQUEsY0FBY0UsTUFBSyxJQUFLO0lBQ3BHO0lBRUEsSUFBSVYsU0FBUyxDQUFDVSxTQUFTLEtBQUtmLGlCQUFpQjtRQUM1QyxNQUFNLElBQUlnQixNQUFNO0lBQ2pCO0lBRUEsSUFBSUUsVUFBVWIsU0FBUyxDQUFDVSxTQUFTO0lBRWpDLElBQUlGLGNBQWNFLFNBQVMsSUFBSUcsU0FBUztRQUN2QyxNQUFNLElBQUlGLE1BQU0sOEJBQThCRSxVQUFVLGNBQWVMLENBQUFBLGNBQWNFLFNBQVMsS0FBSztJQUNwRztJQUVBLElBQUlILHdCQUF3Qk0sU0FBUztRQUNwQyxNQUFNLElBQUlGLE1BQU0sOEJBQThCRSxVQUFVLGdCQUFnQk4sd0JBQXdCO0lBQ2pHO0lBRUEsSUFBSU8sVUFBVUo7SUFDZEEsVUFBVUc7SUFFVixJQUFJYixTQUFTLENBQUNVLFNBQVMsS0FBS2YsaUJBQWlCO1FBQzVDLE1BQU0sSUFBSWdCLE1BQU07SUFDakI7SUFFQSxJQUFJSSxVQUFVZixTQUFTLENBQUNVLFNBQVM7SUFFakMsSUFBSUYsY0FBY0UsV0FBV0ssU0FBUztRQUNyQyxNQUFNLElBQUlKLE1BQU0sOEJBQThCSSxVQUFVLGtCQUFtQlAsQ0FBQUEsY0FBY0UsTUFBSyxJQUFLO0lBQ3BHO0lBRUEsSUFBSUgsd0JBQXdCUSxTQUFTO1FBQ3BDLE1BQU0sSUFBSUosTUFBTSw4QkFBOEJJLFVBQVUsZ0JBQWdCUix3QkFBd0I7SUFDakc7SUFFQSxJQUFJUyxVQUFVTjtJQUNkQSxVQUFVSztJQUVWLElBQUlMLFdBQVdGLGFBQWE7UUFDM0IsTUFBTSxJQUFJRyxNQUFNLDZDQUE4Q0gsQ0FBQUEsY0FBY0UsTUFBSyxJQUFLO0lBQ3ZGO0lBRUEsSUFBSU8sV0FBV1gsYUFBYU8sU0FDM0JLLFdBQVdaLGFBQWFTO0lBRXpCLElBQUlJLE1BQU1qQyxPQUFPa0MsV0FBVyxDQUFDSCxXQUFXSixVQUFVSyxXQUFXSDtJQUU3RCxJQUFLTCxTQUFTLEdBQUdBLFNBQVNPLFVBQVUsRUFBRVAsT0FBUTtRQUM3Q1MsR0FBRyxDQUFDVCxPQUFPLEdBQUc7SUFDZjtJQUNBVixVQUFVcUIsSUFBSSxDQUFDRixLQUFLVCxRQUFRSSxVQUFVUSxLQUFLQyxHQUFHLENBQUMsQ0FBQ04sVUFBVSxJQUFJSCxVQUFVRDtJQUV4RUgsU0FBU0o7SUFFVCxJQUFLLElBQUlrQixJQUFJZCxRQUFRQSxTQUFTYyxJQUFJTixVQUFVLEVBQUVSLE9BQVE7UUFDckRTLEdBQUcsQ0FBQ1QsT0FBTyxHQUFHO0lBQ2Y7SUFDQVYsVUFBVXFCLElBQUksQ0FBQ0YsS0FBS1QsUUFBUU0sVUFBVU0sS0FBS0MsR0FBRyxDQUFDLENBQUNMLFVBQVUsSUFBSUYsVUFBVUQ7SUFFeEVJLE1BQU1BLElBQUlNLFFBQVEsQ0FBQztJQUNuQk4sTUFBTXZCLFVBQVV1QjtJQUVoQixPQUFPQTtBQUNSO0FBRUEsU0FBU08sYUFBYUMsR0FBRyxFQUFFQyxLQUFLLEVBQUVDLElBQUk7SUFDckMsSUFBSUMsVUFBVTtJQUNkLE1BQU9GLFFBQVFFLFVBQVVELFFBQVFGLEdBQUcsQ0FBQ0MsUUFBUUUsUUFBUSxLQUFLLEVBQUc7UUFDNUQsRUFBRUE7SUFDSDtJQUVBLElBQUlDLFlBQVlKLEdBQUcsQ0FBQ0MsUUFBUUUsUUFBUSxJQUFJekM7SUFDeEMsSUFBSTBDLFdBQVc7UUFDZCxFQUFFRDtJQUNIO0lBRUEsT0FBT0E7QUFDUjtBQUVBLFNBQVNFLFVBQVVoQyxTQUFTLEVBQUVLLEdBQUc7SUFDaENMLFlBQVlELGtCQUFrQkM7SUFDOUIsSUFBSU0sYUFBYWxCLG9CQUFvQmlCO0lBRXJDLElBQUk0QixpQkFBaUJqQyxVQUFVUyxNQUFNO0lBQ3JDLElBQUl3QixtQkFBbUIzQixhQUFhLEdBQUc7UUFDdEMsTUFBTSxJQUFJSCxVQUFVLE1BQU1FLE1BQU0sMkJBQTJCQyxhQUFhLElBQUksbUJBQW1CMkIsaUJBQWlCO0lBQ2pIO0lBRUEsSUFBSWhCLFdBQVdTLGFBQWExQixXQUFXLEdBQUdNO0lBQzFDLElBQUlZLFdBQVdRLGFBQWExQixXQUFXTSxZQUFZTixVQUFVUyxNQUFNO0lBQ25FLElBQUlJLFVBQVVQLGFBQWFXO0lBQzNCLElBQUlGLFVBQVVULGFBQWFZO0lBRTNCLElBQUlnQixVQUFVLElBQUksSUFBSXJCLFVBQVUsSUFBSSxJQUFJRTtJQUV4QyxJQUFJb0IsY0FBY0QsVUFBVTdDO0lBRTVCLElBQUk4QixNQUFNakMsT0FBT2tDLFdBQVcsQ0FBQyxDQUFDZSxjQUFjLElBQUksS0FBS0Q7SUFFckQsSUFBSXhCLFNBQVM7SUFDYlMsR0FBRyxDQUFDVCxTQUFTLEdBQUdoQjtJQUNoQixJQUFJeUMsYUFBYTtRQUNoQixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCaEIsR0FBRyxDQUFDVCxTQUFTLEdBQUd3QjtJQUNqQixPQUFPO1FBQ04scUNBQXFDO1FBQ3JDLHdEQUF3RDtRQUN4RGYsR0FBRyxDQUFDVCxTQUFTLEdBQUdyQixZQUFZO1FBQzVCLG1CQUFtQjtRQUNuQjhCLEdBQUcsQ0FBQ1QsU0FBUyxHQUFHd0IsVUFBVTtJQUMzQjtJQUNBZixHQUFHLENBQUNULFNBQVMsR0FBR2Y7SUFDaEJ3QixHQUFHLENBQUNULFNBQVMsR0FBR0c7SUFDaEIsSUFBSUksV0FBVyxHQUFHO1FBQ2pCRSxHQUFHLENBQUNULFNBQVMsR0FBRztRQUNoQkEsVUFBVVYsVUFBVXFCLElBQUksQ0FBQ0YsS0FBS1QsUUFBUSxHQUFHSjtJQUMxQyxPQUFPO1FBQ05JLFVBQVVWLFVBQVVxQixJQUFJLENBQUNGLEtBQUtULFFBQVFPLFVBQVVYO0lBQ2pEO0lBQ0FhLEdBQUcsQ0FBQ1QsU0FBUyxHQUFHZjtJQUNoQndCLEdBQUcsQ0FBQ1QsU0FBUyxHQUFHSztJQUNoQixJQUFJRyxXQUFXLEdBQUc7UUFDakJDLEdBQUcsQ0FBQ1QsU0FBUyxHQUFHO1FBQ2hCVixVQUFVcUIsSUFBSSxDQUFDRixLQUFLVCxRQUFRSjtJQUM3QixPQUFPO1FBQ05OLFVBQVVxQixJQUFJLENBQUNGLEtBQUtULFFBQVFKLGFBQWFZO0lBQzFDO0lBRUEsT0FBT0M7QUFDUjtBQUVBaUIsT0FBT0MsT0FBTyxHQUFHO0lBQ2hCakMsV0FBV0E7SUFDWDRCLFdBQVdBO0FBQ1oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0X2F1dGhfc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2VjZHNhLXNpZy1mb3JtYXR0ZXIvc3JjL2VjZHNhLXNpZy1mb3JtYXR0ZXIuanM/ZjM4ZCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcblxudmFyIGdldFBhcmFtQnl0ZXNGb3JBbGcgPSByZXF1aXJlKCcuL3BhcmFtLWJ5dGVzLWZvci1hbGcnKTtcblxudmFyIE1BWF9PQ1RFVCA9IDB4ODAsXG5cdENMQVNTX1VOSVZFUlNBTCA9IDAsXG5cdFBSSU1JVElWRV9CSVQgPSAweDIwLFxuXHRUQUdfU0VRID0gMHgxMCxcblx0VEFHX0lOVCA9IDB4MDIsXG5cdEVOQ09ERURfVEFHX1NFUSA9IChUQUdfU0VRIHwgUFJJTUlUSVZFX0JJVCkgfCAoQ0xBU1NfVU5JVkVSU0FMIDw8IDYpLFxuXHRFTkNPREVEX1RBR19JTlQgPSBUQUdfSU5UIHwgKENMQVNTX1VOSVZFUlNBTCA8PCA2KTtcblxuZnVuY3Rpb24gYmFzZTY0VXJsKGJhc2U2NCkge1xuXHRyZXR1cm4gYmFzZTY0XG5cdFx0LnJlcGxhY2UoLz0vZywgJycpXG5cdFx0LnJlcGxhY2UoL1xcKy9nLCAnLScpXG5cdFx0LnJlcGxhY2UoL1xcLy9nLCAnXycpO1xufVxuXG5mdW5jdGlvbiBzaWduYXR1cmVBc0J1ZmZlcihzaWduYXR1cmUpIHtcblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihzaWduYXR1cmUpKSB7XG5cdFx0cmV0dXJuIHNpZ25hdHVyZTtcblx0fSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHNpZ25hdHVyZSkge1xuXHRcdHJldHVybiBCdWZmZXIuZnJvbShzaWduYXR1cmUsICdiYXNlNjQnKTtcblx0fVxuXG5cdHRocm93IG5ldyBUeXBlRXJyb3IoJ0VDRFNBIHNpZ25hdHVyZSBtdXN0IGJlIGEgQmFzZTY0IHN0cmluZyBvciBhIEJ1ZmZlcicpO1xufVxuXG5mdW5jdGlvbiBkZXJUb0pvc2Uoc2lnbmF0dXJlLCBhbGcpIHtcblx0c2lnbmF0dXJlID0gc2lnbmF0dXJlQXNCdWZmZXIoc2lnbmF0dXJlKTtcblx0dmFyIHBhcmFtQnl0ZXMgPSBnZXRQYXJhbUJ5dGVzRm9yQWxnKGFsZyk7XG5cblx0Ly8gdGhlIERFUiBlbmNvZGVkIHBhcmFtIHNob3VsZCBhdCBtb3N0IGJlIHRoZSBwYXJhbSBzaXplLCBwbHVzIGEgcGFkZGluZ1xuXHQvLyB6ZXJvLCBzaW5jZSBkdWUgdG8gYmVpbmcgYSBzaWduZWQgaW50ZWdlclxuXHR2YXIgbWF4RW5jb2RlZFBhcmFtTGVuZ3RoID0gcGFyYW1CeXRlcyArIDE7XG5cblx0dmFyIGlucHV0TGVuZ3RoID0gc2lnbmF0dXJlLmxlbmd0aDtcblxuXHR2YXIgb2Zmc2V0ID0gMDtcblx0aWYgKHNpZ25hdHVyZVtvZmZzZXQrK10gIT09IEVOQ09ERURfVEFHX1NFUSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgZXhwZWN0ZWQgXCJzZXFcIicpO1xuXHR9XG5cblx0dmFyIHNlcUxlbmd0aCA9IHNpZ25hdHVyZVtvZmZzZXQrK107XG5cdGlmIChzZXFMZW5ndGggPT09IChNQVhfT0NURVQgfCAxKSkge1xuXHRcdHNlcUxlbmd0aCA9IHNpZ25hdHVyZVtvZmZzZXQrK107XG5cdH1cblxuXHRpZiAoaW5wdXRMZW5ndGggLSBvZmZzZXQgPCBzZXFMZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1wic2VxXCIgc3BlY2lmaWVkIGxlbmd0aCBvZiBcIicgKyBzZXFMZW5ndGggKyAnXCIsIG9ubHkgXCInICsgKGlucHV0TGVuZ3RoIC0gb2Zmc2V0KSArICdcIiByZW1haW5pbmcnKTtcblx0fVxuXG5cdGlmIChzaWduYXR1cmVbb2Zmc2V0KytdICE9PSBFTkNPREVEX1RBR19JTlQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGV4cGVjdGVkIFwiaW50XCIgZm9yIFwiclwiJyk7XG5cdH1cblxuXHR2YXIgckxlbmd0aCA9IHNpZ25hdHVyZVtvZmZzZXQrK107XG5cblx0aWYgKGlucHV0TGVuZ3RoIC0gb2Zmc2V0IC0gMiA8IHJMZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1wiclwiIHNwZWNpZmllZCBsZW5ndGggb2YgXCInICsgckxlbmd0aCArICdcIiwgb25seSBcIicgKyAoaW5wdXRMZW5ndGggLSBvZmZzZXQgLSAyKSArICdcIiBhdmFpbGFibGUnKTtcblx0fVxuXG5cdGlmIChtYXhFbmNvZGVkUGFyYW1MZW5ndGggPCByTGVuZ3RoKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdcInJcIiBzcGVjaWZpZWQgbGVuZ3RoIG9mIFwiJyArIHJMZW5ndGggKyAnXCIsIG1heCBvZiBcIicgKyBtYXhFbmNvZGVkUGFyYW1MZW5ndGggKyAnXCIgaXMgYWNjZXB0YWJsZScpO1xuXHR9XG5cblx0dmFyIHJPZmZzZXQgPSBvZmZzZXQ7XG5cdG9mZnNldCArPSByTGVuZ3RoO1xuXG5cdGlmIChzaWduYXR1cmVbb2Zmc2V0KytdICE9PSBFTkNPREVEX1RBR19JTlQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGV4cGVjdGVkIFwiaW50XCIgZm9yIFwic1wiJyk7XG5cdH1cblxuXHR2YXIgc0xlbmd0aCA9IHNpZ25hdHVyZVtvZmZzZXQrK107XG5cblx0aWYgKGlucHV0TGVuZ3RoIC0gb2Zmc2V0ICE9PSBzTGVuZ3RoKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdcInNcIiBzcGVjaWZpZWQgbGVuZ3RoIG9mIFwiJyArIHNMZW5ndGggKyAnXCIsIGV4cGVjdGVkIFwiJyArIChpbnB1dExlbmd0aCAtIG9mZnNldCkgKyAnXCInKTtcblx0fVxuXG5cdGlmIChtYXhFbmNvZGVkUGFyYW1MZW5ndGggPCBzTGVuZ3RoKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdcInNcIiBzcGVjaWZpZWQgbGVuZ3RoIG9mIFwiJyArIHNMZW5ndGggKyAnXCIsIG1heCBvZiBcIicgKyBtYXhFbmNvZGVkUGFyYW1MZW5ndGggKyAnXCIgaXMgYWNjZXB0YWJsZScpO1xuXHR9XG5cblx0dmFyIHNPZmZzZXQgPSBvZmZzZXQ7XG5cdG9mZnNldCArPSBzTGVuZ3RoO1xuXG5cdGlmIChvZmZzZXQgIT09IGlucHV0TGVuZ3RoKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0byBjb25zdW1lIGVudGlyZSBidWZmZXIsIGJ1dCBcIicgKyAoaW5wdXRMZW5ndGggLSBvZmZzZXQpICsgJ1wiIGJ5dGVzIHJlbWFpbicpO1xuXHR9XG5cblx0dmFyIHJQYWRkaW5nID0gcGFyYW1CeXRlcyAtIHJMZW5ndGgsXG5cdFx0c1BhZGRpbmcgPSBwYXJhbUJ5dGVzIC0gc0xlbmd0aDtcblxuXHR2YXIgZHN0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKHJQYWRkaW5nICsgckxlbmd0aCArIHNQYWRkaW5nICsgc0xlbmd0aCk7XG5cblx0Zm9yIChvZmZzZXQgPSAwOyBvZmZzZXQgPCByUGFkZGluZzsgKytvZmZzZXQpIHtcblx0XHRkc3Rbb2Zmc2V0XSA9IDA7XG5cdH1cblx0c2lnbmF0dXJlLmNvcHkoZHN0LCBvZmZzZXQsIHJPZmZzZXQgKyBNYXRoLm1heCgtclBhZGRpbmcsIDApLCByT2Zmc2V0ICsgckxlbmd0aCk7XG5cblx0b2Zmc2V0ID0gcGFyYW1CeXRlcztcblxuXHRmb3IgKHZhciBvID0gb2Zmc2V0OyBvZmZzZXQgPCBvICsgc1BhZGRpbmc7ICsrb2Zmc2V0KSB7XG5cdFx0ZHN0W29mZnNldF0gPSAwO1xuXHR9XG5cdHNpZ25hdHVyZS5jb3B5KGRzdCwgb2Zmc2V0LCBzT2Zmc2V0ICsgTWF0aC5tYXgoLXNQYWRkaW5nLCAwKSwgc09mZnNldCArIHNMZW5ndGgpO1xuXG5cdGRzdCA9IGRzdC50b1N0cmluZygnYmFzZTY0Jyk7XG5cdGRzdCA9IGJhc2U2NFVybChkc3QpO1xuXG5cdHJldHVybiBkc3Q7XG59XG5cbmZ1bmN0aW9uIGNvdW50UGFkZGluZyhidWYsIHN0YXJ0LCBzdG9wKSB7XG5cdHZhciBwYWRkaW5nID0gMDtcblx0d2hpbGUgKHN0YXJ0ICsgcGFkZGluZyA8IHN0b3AgJiYgYnVmW3N0YXJ0ICsgcGFkZGluZ10gPT09IDApIHtcblx0XHQrK3BhZGRpbmc7XG5cdH1cblxuXHR2YXIgbmVlZHNTaWduID0gYnVmW3N0YXJ0ICsgcGFkZGluZ10gPj0gTUFYX09DVEVUO1xuXHRpZiAobmVlZHNTaWduKSB7XG5cdFx0LS1wYWRkaW5nO1xuXHR9XG5cblx0cmV0dXJuIHBhZGRpbmc7XG59XG5cbmZ1bmN0aW9uIGpvc2VUb0RlcihzaWduYXR1cmUsIGFsZykge1xuXHRzaWduYXR1cmUgPSBzaWduYXR1cmVBc0J1ZmZlcihzaWduYXR1cmUpO1xuXHR2YXIgcGFyYW1CeXRlcyA9IGdldFBhcmFtQnl0ZXNGb3JBbGcoYWxnKTtcblxuXHR2YXIgc2lnbmF0dXJlQnl0ZXMgPSBzaWduYXR1cmUubGVuZ3RoO1xuXHRpZiAoc2lnbmF0dXJlQnl0ZXMgIT09IHBhcmFtQnl0ZXMgKiAyKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignXCInICsgYWxnICsgJ1wiIHNpZ25hdHVyZXMgbXVzdCBiZSBcIicgKyBwYXJhbUJ5dGVzICogMiArICdcIiBieXRlcywgc2F3IFwiJyArIHNpZ25hdHVyZUJ5dGVzICsgJ1wiJyk7XG5cdH1cblxuXHR2YXIgclBhZGRpbmcgPSBjb3VudFBhZGRpbmcoc2lnbmF0dXJlLCAwLCBwYXJhbUJ5dGVzKTtcblx0dmFyIHNQYWRkaW5nID0gY291bnRQYWRkaW5nKHNpZ25hdHVyZSwgcGFyYW1CeXRlcywgc2lnbmF0dXJlLmxlbmd0aCk7XG5cdHZhciByTGVuZ3RoID0gcGFyYW1CeXRlcyAtIHJQYWRkaW5nO1xuXHR2YXIgc0xlbmd0aCA9IHBhcmFtQnl0ZXMgLSBzUGFkZGluZztcblxuXHR2YXIgcnNCeXRlcyA9IDEgKyAxICsgckxlbmd0aCArIDEgKyAxICsgc0xlbmd0aDtcblxuXHR2YXIgc2hvcnRMZW5ndGggPSByc0J5dGVzIDwgTUFYX09DVEVUO1xuXG5cdHZhciBkc3QgPSBCdWZmZXIuYWxsb2NVbnNhZmUoKHNob3J0TGVuZ3RoID8gMiA6IDMpICsgcnNCeXRlcyk7XG5cblx0dmFyIG9mZnNldCA9IDA7XG5cdGRzdFtvZmZzZXQrK10gPSBFTkNPREVEX1RBR19TRVE7XG5cdGlmIChzaG9ydExlbmd0aCkge1xuXHRcdC8vIEJpdCA4IGhhcyB2YWx1ZSBcIjBcIlxuXHRcdC8vIGJpdHMgNy0xIGdpdmUgdGhlIGxlbmd0aC5cblx0XHRkc3Rbb2Zmc2V0KytdID0gcnNCeXRlcztcblx0fSBlbHNlIHtcblx0XHQvLyBCaXQgOCBvZiBmaXJzdCBvY3RldCBoYXMgdmFsdWUgXCIxXCJcblx0XHQvLyBiaXRzIDctMSBnaXZlIHRoZSBudW1iZXIgb2YgYWRkaXRpb25hbCBsZW5ndGggb2N0ZXRzLlxuXHRcdGRzdFtvZmZzZXQrK10gPSBNQVhfT0NURVRcdHwgMTtcblx0XHQvLyBsZW5ndGgsIGJhc2UgMjU2XG5cdFx0ZHN0W29mZnNldCsrXSA9IHJzQnl0ZXMgJiAweGZmO1xuXHR9XG5cdGRzdFtvZmZzZXQrK10gPSBFTkNPREVEX1RBR19JTlQ7XG5cdGRzdFtvZmZzZXQrK10gPSByTGVuZ3RoO1xuXHRpZiAoclBhZGRpbmcgPCAwKSB7XG5cdFx0ZHN0W29mZnNldCsrXSA9IDA7XG5cdFx0b2Zmc2V0ICs9IHNpZ25hdHVyZS5jb3B5KGRzdCwgb2Zmc2V0LCAwLCBwYXJhbUJ5dGVzKTtcblx0fSBlbHNlIHtcblx0XHRvZmZzZXQgKz0gc2lnbmF0dXJlLmNvcHkoZHN0LCBvZmZzZXQsIHJQYWRkaW5nLCBwYXJhbUJ5dGVzKTtcblx0fVxuXHRkc3Rbb2Zmc2V0KytdID0gRU5DT0RFRF9UQUdfSU5UO1xuXHRkc3Rbb2Zmc2V0KytdID0gc0xlbmd0aDtcblx0aWYgKHNQYWRkaW5nIDwgMCkge1xuXHRcdGRzdFtvZmZzZXQrK10gPSAwO1xuXHRcdHNpZ25hdHVyZS5jb3B5KGRzdCwgb2Zmc2V0LCBwYXJhbUJ5dGVzKTtcblx0fSBlbHNlIHtcblx0XHRzaWduYXR1cmUuY29weShkc3QsIG9mZnNldCwgcGFyYW1CeXRlcyArIHNQYWRkaW5nKTtcblx0fVxuXG5cdHJldHVybiBkc3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRkZXJUb0pvc2U6IGRlclRvSm9zZSxcblx0am9zZVRvRGVyOiBqb3NlVG9EZXJcbn07XG4iXSwibmFtZXMiOlsiQnVmZmVyIiwicmVxdWlyZSIsImdldFBhcmFtQnl0ZXNGb3JBbGciLCJNQVhfT0NURVQiLCJDTEFTU19VTklWRVJTQUwiLCJQUklNSVRJVkVfQklUIiwiVEFHX1NFUSIsIlRBR19JTlQiLCJFTkNPREVEX1RBR19TRVEiLCJFTkNPREVEX1RBR19JTlQiLCJiYXNlNjRVcmwiLCJiYXNlNjQiLCJyZXBsYWNlIiwic2lnbmF0dXJlQXNCdWZmZXIiLCJzaWduYXR1cmUiLCJpc0J1ZmZlciIsImZyb20iLCJUeXBlRXJyb3IiLCJkZXJUb0pvc2UiLCJhbGciLCJwYXJhbUJ5dGVzIiwibWF4RW5jb2RlZFBhcmFtTGVuZ3RoIiwiaW5wdXRMZW5ndGgiLCJsZW5ndGgiLCJvZmZzZXQiLCJFcnJvciIsInNlcUxlbmd0aCIsInJMZW5ndGgiLCJyT2Zmc2V0Iiwic0xlbmd0aCIsInNPZmZzZXQiLCJyUGFkZGluZyIsInNQYWRkaW5nIiwiZHN0IiwiYWxsb2NVbnNhZmUiLCJjb3B5IiwiTWF0aCIsIm1heCIsIm8iLCJ0b1N0cmluZyIsImNvdW50UGFkZGluZyIsImJ1ZiIsInN0YXJ0Iiwic3RvcCIsInBhZGRpbmciLCJuZWVkc1NpZ24iLCJqb3NlVG9EZXIiLCJzaWduYXR1cmVCeXRlcyIsInJzQnl0ZXMiLCJzaG9ydExlbmd0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\nfunction getParamSize(keySize) {\n    var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);\n    return result;\n}\nvar paramBytesForAlg = {\n    ES256: getParamSize(256),\n    ES384: getParamSize(384),\n    ES512: getParamSize(521)\n};\nfunction getParamBytesForAlg(alg) {\n    var paramBytes = paramBytesForAlg[alg];\n    if (paramBytes) {\n        return paramBytes;\n    }\n    throw new Error('Unknown algorithm \"' + alg + '\"');\n}\nmodule.exports = getParamBytesForAlg;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZWNkc2Etc2lnLWZvcm1hdHRlci9zcmMvcGFyYW0tYnl0ZXMtZm9yLWFsZy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBLFNBQVNBLGFBQWFDLE9BQU87SUFDNUIsSUFBSUMsU0FBUyxDQUFDLFVBQVcsSUFBSyxLQUFNRCxDQUFBQSxVQUFVLE1BQU0sSUFBSSxJQUFJO0lBQzVELE9BQU9DO0FBQ1I7QUFFQSxJQUFJQyxtQkFBbUI7SUFDdEJDLE9BQU9KLGFBQWE7SUFDcEJLLE9BQU9MLGFBQWE7SUFDcEJNLE9BQU9OLGFBQWE7QUFDckI7QUFFQSxTQUFTTyxvQkFBb0JDLEdBQUc7SUFDL0IsSUFBSUMsYUFBYU4sZ0JBQWdCLENBQUNLLElBQUk7SUFDdEMsSUFBSUMsWUFBWTtRQUNmLE9BQU9BO0lBQ1I7SUFFQSxNQUFNLElBQUlDLE1BQU0sd0JBQXdCRixNQUFNO0FBQy9DO0FBRUFHLE9BQU9DLE9BQU8sR0FBR0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0X2F1dGhfc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2VjZHNhLXNpZy1mb3JtYXR0ZXIvc3JjL3BhcmFtLWJ5dGVzLWZvci1hbGcuanM/NzQyMSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGdldFBhcmFtU2l6ZShrZXlTaXplKSB7XG5cdHZhciByZXN1bHQgPSAoKGtleVNpemUgLyA4KSB8IDApICsgKGtleVNpemUgJSA4ID09PSAwID8gMCA6IDEpO1xuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgcGFyYW1CeXRlc0ZvckFsZyA9IHtcblx0RVMyNTY6IGdldFBhcmFtU2l6ZSgyNTYpLFxuXHRFUzM4NDogZ2V0UGFyYW1TaXplKDM4NCksXG5cdEVTNTEyOiBnZXRQYXJhbVNpemUoNTIxKVxufTtcblxuZnVuY3Rpb24gZ2V0UGFyYW1CeXRlc0ZvckFsZyhhbGcpIHtcblx0dmFyIHBhcmFtQnl0ZXMgPSBwYXJhbUJ5dGVzRm9yQWxnW2FsZ107XG5cdGlmIChwYXJhbUJ5dGVzKSB7XG5cdFx0cmV0dXJuIHBhcmFtQnl0ZXM7XG5cdH1cblxuXHR0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYWxnb3JpdGhtIFwiJyArIGFsZyArICdcIicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFBhcmFtQnl0ZXNGb3JBbGc7XG4iXSwibmFtZXMiOlsiZ2V0UGFyYW1TaXplIiwia2V5U2l6ZSIsInJlc3VsdCIsInBhcmFtQnl0ZXNGb3JBbGciLCJFUzI1NiIsIkVTMzg0IiwiRVM1MTIiLCJnZXRQYXJhbUJ5dGVzRm9yQWxnIiwiYWxnIiwicGFyYW1CeXRlcyIsIkVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js\n");

/***/ })

};
;