/**
 * Base64 VLQ encoding for V3 source maps.
 *
 * Each VLQ value is encoded as one or more Base64 characters.
 * The low bit of each 5-bit group is a continuation flag (except the first,
 * where bit 0 is the sign bit).
 */

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/** Encode a single integer as a Base64 VLQ string. */
export function vlqEncode(value: number): string {
  let vlq = value < 0 ? ((-value) << 1) + 1 : value << 1
  let encoded = ''
  do {
    let digit = vlq & 0b11111
    vlq >>>= 5
    if (vlq > 0) digit |= 0b100000 // continuation bit
    encoded += B64[digit]
  } while (vlq > 0)
  return encoded
}

/**
 * Encode an array of segments for one output line.
 *
 * Each segment is [outCol, srcFileIdx, srcLine, srcCol].
 * Values are delta-encoded relative to the previous segment
 * (and previous line for srcLine/srcFileIdx/srcCol).
 */
export function encodeSegments(
  segments: [number, number, number, number][],
  state: { prevCol: number; prevSrcFile: number; prevSrcLine: number; prevSrcCol: number },
): string {
  const parts: string[] = []
  let prevOutCol = 0

  for (const [outCol, srcFile, srcLine, srcCol] of segments) {
    let seg = vlqEncode(outCol - prevOutCol)
    seg += vlqEncode(srcFile - state.prevSrcFile)
    seg += vlqEncode(srcLine - state.prevSrcLine)
    seg += vlqEncode(srcCol - state.prevSrcCol)

    parts.push(seg)

    prevOutCol = outCol
    state.prevSrcFile = srcFile
    state.prevSrcLine = srcLine
    state.prevSrcCol = srcCol
  }

  state.prevCol = 0 // reset column per line for next line
  return parts.join(',')
}
