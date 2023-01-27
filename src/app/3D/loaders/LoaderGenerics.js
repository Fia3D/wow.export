/* Copyright (c) wow.export contributors. All rights reserved. */
/* Licensed under the MIT license. See LICENSE in project root for license information. */

/**
 * Process a null-terminated string block.
 * @param {BufferWrapped} data
 * @param {number} chunkSize
 */
const ReadStringBlock = (data, chunkSize) => {
	const chunk = data.readBuffer(chunkSize, false);
	const entries = {};

	let readOfs = 0;
	for (let i = 0; i < chunkSize; i++) {
		if (chunk[i] === 0x0) {
			// Skip padding bytes.
			if (readOfs === i) {
				readOfs += 1;
				continue;
			}

			entries[readOfs] = chunk.toString('utf8', readOfs, i).replace(/\0/g, '');
			readOfs = i + 1;
		}
	}

	return entries;
};

module.exports = { ReadStringBlock };