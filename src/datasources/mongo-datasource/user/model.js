import { MongoDataSource } from '../../generates';
import { getPageInfo } from '../../../utils';

export default class ModelDataSource extends MongoDataSource {
  initialize(config = {}) {
    super.initialize({
      ...config,
      allowFlushingCollectionCache: true,
      debug: true
    });
  }

  async filterAndPaging({ orderBy, query, limit, skip, select }, ttl) {
    const sort = orderBy;
    const result = {};
    const [docs, countDocument] = await Promise.all([
      this.findManyByQueryAndOption(
        {
          query,
          select,
          option: { sort, limit, skip: skip * limit }
        },
        { ttl }
      ),
      this.collection.countDocuments(query)
    ]);

    result.pageInfo = getPageInfo(countDocument, limit, skip);
    result.data = docs;
    return result;
  }

  async create(input, ttl) {
    const newDoc = new this.collection(input);
    const saveDoc = await newDoc.save();

    await this.deleteManyFromQueryCollectionCache();
    const cacheDoc = await this.findOneById(saveDoc._id, {
      ttl
    });

    return cacheDoc;
  }

  async update({ _id, ...info }, ttl) {
    const updatedDoc = await this.collection
      .updateOne(
        { _id },
        {
          ...info
        }
      )
      .lean()
      .exec();

    if (!updatedDoc || (updatedDoc && updatedDoc.nModified === 0)) {
      throw new Error('Cannot update, plz try update again');
    }

    await this.deleteFromCacheById(_id);
    await this.deleteManyFromQueryCollectionCache();

    const cacheDoc = await this.findOneById(_id, {
      ttl
    });

    return cacheDoc;
  }

  async remove({ _id }) {
    await this.collection.deleteOne({ _id });
    await this.deleteFromCacheById(_id);
    await this.deleteManyFromQueryCollectionCache();
  }
}
