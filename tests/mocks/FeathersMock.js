const ServiceMock = {
  async find(params) {
    const limit = params?.query?.$limit || 5;

    return Array.apply(null, { length: limit }).map((_, i) => ({
      index: i,
    }));
  },

  async get(id) {
    return {
      id: id,
    };
  },

  async create(id) {
    return {
      id: id || Math.round(Math.random * 1000),
    };
  },

  async update(id) {
    return {
      id: id,
      isUpdated: true,
    };
  },

  async patch(id) {
    return {
      id: id,
      isPatched: true,
    };
  },

  async remove(id) {
    return {
      id: id,
    };
  },

  on() {},

  setup(app, path) {},
};

class FeathersMock {
  service() {
    return { ...ServiceMock };
  }
}

export default FeathersMock;
