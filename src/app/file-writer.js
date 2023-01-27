/* Copyright (c) wow.export contributors. All rights reserved. */
/* Licensed under the MIT license. See LICENSE in project root for license information. */
const fsp = require('fs').promises;

class FileWriter {
	/**
	 * Construct a new FileWriter instance.
	 * @param {string} file
	 * @param {string} encoding
	 */
	constructor(file, encoding = 'utf8') {
		this.file = file;
		this.encoding = encoding;
		this.queue = [];
	}

	/**
	 * Write a line to the file.
	 * @param {string} line
	 */
	writeLine(line) {
		this.queue.push(line);
	}

	/**
	 * Close the stream.
	 */
	async close() {
		await fsp.writeFile(this.file, this.queue.join('\n'), this.encoding);
	}
}

module.exports = FileWriter;