/*
https://github.com/Nergy101/NodeJWTMongoose/blob/master/src/data/MongooseRepository.js
ISC License (ISC)
Copyright 2020 Nergy101

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted,
provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING
ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

module.exports = class MongooseRepository {
    constructor({ Model }) {
        this.collection = Model;
    }

    async count() {
        return this.collection.estimatedDocumentCount();
    }

    async find(query = {}, multiple = true) {
        const results = multiple
            ? this.collection.find(query)
            : this.collection.findOne(query);
        return results.exec();
    }

    async create(body) {
        const document = new this.collection(body);
        return document.save();
    }

    async update(document, body = {}) {
        const id = (typeof document._id !== 'undefined')
            ? document._id
            : document;

        return this.collection.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false });
    }

    async remove(document) {
        const reloadedDocument = await this.reload(document);

        return reloadedDocument.remove();
    }

    async reload(document, { select, populate, lean } = {}) {
        // Only reload if necessary
        if (!select && !populate && !lean && document instanceof this.collection) {
            return document;
        }

        return (typeof document._id !== 'undefined')
            ? this.collection.findById(document._id, { select, populate, lean })
            : this.collection.findById(document, { select, populate, lean });
    }
};