import FeathersMock from './mocks/FeathersMock';
import { createServiceStore } from '../src/';
import { when } from 'mobx';

describe('ServiceStore', () => {
  let feathersMock;
  let storeMock;

  beforeEach(() => {
    feathersMock = new FeathersMock();
    storeMock = createServiceStore(feathersMock, 'test');
  });

  it('should have no items', () => {
    expect(storeMock.item).toBeUndefined();
    expect(storeMock.items).toHaveLength(0);
  });

  describe('.setItems()', () => {
    it('should set items', () => {
      storeMock.setItems([{ id: 0 }, { id: 1 }, { id: 2 }]);
      expect(storeMock.items.length).toBe(3);
      expect(storeMock.items[0].id).toBe(0);
      expect(storeMock.items[1].id).toBe(1);
      expect(storeMock.items[2].id).toBe(2);
    });

    it('should set items with pagination', () => {
      storeMock.setItems({
        skip: 0,
        limit: 3,
        total: 3,
        data: [{ id: 0 }, { id: 1 }, { id: 2 }],
      });
      expect(storeMock.items.length).toBe(3);
      expect(storeMock.items[0].id).toBe(0);
      expect(storeMock.items[1].id).toBe(1);
      expect(storeMock.items[2].id).toBe(2);

      expect(storeMock.pagination.items.length).toBe(3);
      expect(storeMock.pagination.items[0].id).toBe(0);
      expect(storeMock.pagination.items[1].id).toBe(1);
      expect(storeMock.pagination.items[2].id).toBe(2);

      expect(storeMock.pagination.limit).toBe(3);
      expect(storeMock.pagination.skip).toBe(0);
      expect(storeMock.pagination.total).toBe(3);
    });

    it('should append items with pagination', () => {
      storeMock.setItems({
        skip: 0,
        limit: 3,
        total: 6,
        data: [{ id: 0 }, { id: 1 }, { id: 2 }],
      });

      storeMock.setItems({
        skip: 3,
        limit: 3,
        total: 6,
        data: [{ id: 3 }, { id: 4 }, { id: 5 }],
      });

      expect(storeMock.items.length).toBe(6);

      expect(storeMock.pagination.items.length).toBe(3);
      expect(storeMock.pagination.items[0].id).toBe(3);
      expect(storeMock.pagination.items[1].id).toBe(4);
      expect(storeMock.pagination.items[2].id).toBe(5);

      expect(storeMock.pagination.limit).toBe(3);
      expect(storeMock.pagination.skip).toBe(3);
      expect(storeMock.pagination.total).toBe(6);
    });

    it('should append items', () => {
      storeMock.setItems([{ id: 0 }, { id: 1 }]);
      storeMock.setItems([{ id: 2 }, { id: 3 }]);
      expect(storeMock.items.length).toBe(4);
      expect(storeMock.items[0].id).toBe(0);
      expect(storeMock.items[1].id).toBe(1);
      expect(storeMock.items[2].id).toBe(2);
      expect(storeMock.items[3].id).toBe(3);
    });

    it('should not append items', () => {
      storeMock.setItems([{ id: 0 }, { id: 1 }]);
      storeMock.setItems([{ id: 1 }]);
      expect(storeMock.items.length).toBe(2);
      expect(storeMock.items[0].id).toBe(0);
      expect(storeMock.items[1].id).toBe(1);
    });

    describe("(namespace's features)", () => {
      it('should set items in namespace', () => {
        storeMock.setItems([{ id: 0 }, { id: 1 }], {
          namespace: 'test',
        });

        expect(storeMock.items.length).toBe(0);
        expect(storeMock.namespaces.test.items.length).toBe(2);
      });
    });
  });

  describe('.setItem()', () => {
    it('should set an item', () => {
      storeMock.setItem({ id: 42 });
      expect(storeMock.item.id).toBe(42);
    });

    describe("(namespace's features)", () => {
      it('should set an item in namespace', () => {
        storeMock.setItem({ id: 42 }, { namespace: 'test' });
        expect(storeMock.item).toBe(undefined);
        expect(storeMock.namespaces.test.item.id).toBe(42);
      });
    });
  });

  describe('.removeItem()', () => {
    it('should remove items', () => {
      storeMock.setItems([{ id: 0 }, { id: 1 }]);
      storeMock.removeItem({ id: 0 });
      expect(storeMock.items.length).toBe(1);
      expect(storeMock.items[0].id).toBe(1);
    });

    it('should not remove items', () => {
      storeMock.setItems([{ id: 0 }, { id: 1 }]);
      storeMock.removeItem({ id: 2 });
      expect(storeMock.items.length).toBe(2);
      expect(storeMock.items[0].id).toBe(0);
      expect(storeMock.items[1].id).toBe(1);
    });

    describe("(namespace's features)", () => {
      it('should remove items in each namespace', () => {
        storeMock.setItems([{ id: 0 }, { id: 1 }]);
        storeMock.setItems([{ id: 0 }, { id: 1 }], { namespace: 'test' });

        storeMock.removeItem({ id: 1 });

        expect(storeMock.items.length).toBe(1);
        expect(storeMock.items[0].id).toBe(0);
        expect(storeMock.namespaces.test.items.length).toBe(1);
        expect(storeMock.namespaces.test.items[0].id).toBe(0);
      });
    });
  });

  describe('.clearPending()', () => {
    it('should clear all pendings', () => {
      storeMock.namespaces[storeMock.defaultNamespace].isFindPending = true;
      storeMock.namespaces[storeMock.defaultNamespace].isGetPending = true;
      storeMock.namespaces[storeMock.defaultNamespace].isCreatePending = true;
      storeMock.isUpdatePending = true;
      storeMock.isPatchPending = true;
      storeMock.isRemovePending = true;

      storeMock.clearPending();

      expect(storeMock.isFindPending).toBe(false);
      expect(storeMock.isGetPending).toBe(false);
      expect(storeMock.isCreatePending).toBe(false);
      expect(storeMock.isUpdatePending).toBe(false);
      expect(storeMock.isPatchPending).toBe(false);
      expect(storeMock.isRemovePending).toBe(false);
    });

    describe("(namespace's features)", () => {
      it('should clear pendings in namespace', () => {
        storeMock.namespaces[storeMock.defaultNamespace].isFindPending = true;
        storeMock.namespaces[storeMock.defaultNamespace].isGetPending = true;
        storeMock.namespaces[storeMock.defaultNamespace].isCreatePending = true;
        storeMock.isUpdatePending = true;

        storeMock.initializeNamespace('test');

        storeMock.namespaces.test.isFindPending = true;
        storeMock.namespaces.test.isGetPending = true;
        storeMock.namespaces.test.isCreatePending = true;

        storeMock.clearPending({ namespace: 'test' });

        expect(storeMock.namespaces.test.isFindPending).toBe(false);
        expect(storeMock.namespaces.test.isGetPending).toBe(false);
        expect(storeMock.namespaces.test.isCreatePending).toBe(false);

        expect(storeMock.isFindPending).toBe(true);
        expect(storeMock.isGetPending).toBe(true);
        expect(storeMock.isCreatePending).toBe(true);
        expect(storeMock.isUpdatePending).toBe(true);
      });
    });
  });

  describe('.clearErrors()', () => {
    it('should clear all errors', () => {
      storeMock.namespaces[storeMock.defaultNamespace].errorOnFind =
        'some error';
      storeMock.namespaces[storeMock.defaultNamespace].errorOnGet =
        'some error';
      storeMock.namespaces[storeMock.defaultNamespace].errorOnCreate =
        'some error';
      storeMock.errorOnUpdate = 'some error';
      storeMock.errorOnPatch = 'some error';
      storeMock.errorOnRemove = 'some error';

      storeMock.clearErrors();

      expect(storeMock.errorOnFind).toBe(null);
      expect(storeMock.errorOnGet).toBe(null);
      expect(storeMock.errorOnCreate).toBe(null);
      expect(storeMock.errorOnUpdate).toBe(null);
      expect(storeMock.errorOnPatch).toBe(null);
      expect(storeMock.errorOnRemove).toBe(null);
    });

    describe("(namespace's features)", () => {
      it('should clear errors in namespace', () => {
        storeMock.namespaces[storeMock.defaultNamespace].errorOnFind =
          'some error';
        storeMock.namespaces[storeMock.defaultNamespace].errorOnGet =
          'some error';
        storeMock.namespaces[storeMock.defaultNamespace].errorOnCreate =
          'some error';
        storeMock.errorOnUpdate = 'some error';

        storeMock.initializeNamespace('test');

        storeMock.namespaces.test.errorOnFind = 'some error';
        storeMock.namespaces.test.errorOnGet = 'some error';
        storeMock.namespaces.test.errorOnCreate = 'some error';

        storeMock.clearErrors({ namespace: 'test' });

        expect(storeMock.namespaces.test.errorOnFind).toBe(null);
        expect(storeMock.namespaces.test.errorOnGet).toBe(null);
        expect(storeMock.namespaces.test.errorOnCreate).toBe(null);

        expect(storeMock.errorOnFind).toBe('some error');
        expect(storeMock.errorOnGet).toBe('some error');
        expect(storeMock.errorOnCreate).toBe('some error');
        expect(storeMock.errorOnUpdate).toBe('some error');
      });
    });
  });

  describe('.clearData()', () => {
    it('should clear data', () => {
      storeMock.setItems({
        skip: 0,
        limit: 3,
        total: 6,
        data: [{ id: 0 }, { id: 1 }, { id: 2 }],
      });
      storeMock.setItem({ id: 3 });

      storeMock.clearData();

      expect(storeMock.items.length).toBe(0);
      expect(storeMock.item).toBe(undefined);

      expect(storeMock.pagination.items.length).toBe(0);
      expect(storeMock.pagination.limit).toBe(0);
      expect(storeMock.pagination.skip).toBe(0);
      expect(storeMock.pagination.total).toBe(0);
    });

    describe("(namespace's features)", () => {
      it('should clear data in namespace', () => {
        storeMock.setItems([{ id: 0 }, { id: 1 }, { id: 2 }]);
        storeMock.setItems(
          {
            skip: 0,
            limit: 3,
            total: 6,
            data: [{ id: 0 }, { id: 1 }, { id: 2 }],
          },
          {
            namespace: 'test',
          }
        );
        storeMock.setItem({ id: 3 }, { namespace: 'test' });

        storeMock.clearData({ namespace: 'test' });

        expect(storeMock.items.length).toBe(3);

        expect(storeMock.namespaces.test.items.length).toBe(0);
        expect(storeMock.namespaces.test.item).toBe(undefined);

        expect(storeMock.namespaces.test.pagination.items.length).toBe(0);
        expect(storeMock.namespaces.test.pagination.limit).toBe(0);
        expect(storeMock.namespaces.test.pagination.skip).toBe(0);
        expect(storeMock.namespaces.test.pagination.total).toBe(0);
      });
    });
  });

  describe('.get()', () => {
    it('should get an item', async () => {
      await storeMock.get(42);
      expect(storeMock.item).toMatchObject({ id: 42 });
    });

    it('should be pending while processing', async () => {
      expect(storeMock.isGetPending).toBe(false);
      const promise = storeMock.get(42);
      expect(storeMock.isGetPending).toBe(true);
      await promise;
      expect(storeMock.isGetPending).toBe(false);
    });

    describe("(namespace's features)", () => {
      it('should get an item in namespace', async () => {
        await storeMock.get(42, { namespace: 'test' });
        expect(storeMock.item).toBe(undefined);
        expect(storeMock.namespaces.test.item).toMatchObject({ id: 42 });
      });

      it('should be pending in namespace while processing', async () => {
        const promise = storeMock.get(42, { namespace: 'test' });
        expect(storeMock.isGetPending).toBe(false);
        expect(storeMock.namespaces.test.isGetPending).toBe(true);
        await promise;
        expect(storeMock.isGetPending).toBe(false);
        expect(storeMock.namespaces.test.isGetPending).toBe(false);
      });
    });
  });

  describe('.find()', () => {
    it('should find some items', async () => {
      await storeMock.find();
      expect(storeMock.items.length > 1).toBeTruthy();
    });

    it('should be pending while processing', async () => {
      expect(storeMock.isFindPending).toBe(false);
      const promise = storeMock.find();
      expect(storeMock.isFindPending).toBe(true);
      await promise;
      expect(storeMock.isFindPending).toBe(false);
    });

    describe("(namespace's features)", () => {
      it('should find some items & put them in namespace', async () => {
        await storeMock.find({ namespace: 'test' });
        expect(storeMock.items.length).toBe(0);
        expect(storeMock.namespaces.test.items.length > 1).toBeTruthy();
      });

      it('should be pending in namespace while processing', async () => {
        const promise = storeMock.find({ namespace: 'test' });
        expect(storeMock.isFindPending).toBe(false);
        expect(storeMock.namespaces.test.isFindPending).toBe(true);
        await promise;
        expect(storeMock.isFindPending).toBe(false);
        expect(storeMock.namespaces.test.isFindPending).toBe(false);
      });
    });
  });

  describe('.create()', () => {
    it('should create an item', async () => {
      await storeMock.create();
      expect(storeMock.item.id).toBeDefined();
    });

    it('should be pending while processing', async () => {
      expect(storeMock.isCreatePending).toBe(false);
      const promise = storeMock.create();
      expect(storeMock.isCreatePending).toBe(true);
      await promise;
      expect(storeMock.isCreatePending).toBe(false);
    });

    describe("(namespace's features)", () => {
      it('should create an item & put it in namespace', async () => {
        await storeMock.create(null, { namespace: 'test' });
        expect(storeMock.item).toBeUndefined();
        expect(storeMock.namespaces.test.item.id).toBeDefined();
      });

      it('should be pending in namespace while processing', async () => {
        const promise = storeMock.create(null, { namespace: 'test' });
        expect(storeMock.isCreatePending).toBe(false);
        expect(storeMock.namespaces.test.isCreatePending).toBe(true);
        await promise;
        expect(storeMock.isCreatePending).toBe(false);
        expect(storeMock.namespaces.test.isCreatePending).toBe(false);
      });
    });
  });

  describe('.update()', () => {
    beforeEach(() => {
      storeMock.create(42);
    });

    it('should update an item', async () => {
      await storeMock.update(42);
      expect(storeMock.item.isUpdated).toBe(true);
    });

    it('should be pending while processing', async () => {
      expect(storeMock.isUpdatePending).toBe(false);
      const promise = storeMock.update(42);
      expect(storeMock.isUpdatePending).toBe(true);
      await promise;
      expect(storeMock.isUpdatePending).toBe(false);
    });

    describe("(namespace's features)", () => {
      it('should update all namespaces', async () => {
        await storeMock.create(42);
        await storeMock.create(42, { namespace: 'test' });
        await storeMock.update(42);
        expect(storeMock.item.isUpdated).toBe(true);
        expect(storeMock.namespaces.test.item.isUpdated).toBe(true);
      });
    });
  });

  describe('.patch()', () => {
    beforeEach(() => {
      storeMock.create(42);
    });

    it('should patch an item', async () => {
      await storeMock.patch(42);
      expect(storeMock.item.isPatched).toBe(true);
    });

    it('should be pending while processing', async () => {
      expect(storeMock.isPatchPending).toBe(false);
      const promise = storeMock.patch(42);
      expect(storeMock.isPatchPending).toBe(true);
      await promise;
      expect(storeMock.isPatchPending).toBe(false);
    });

    describe("(namespace's features)", () => {
      it('should update all namespaces', async () => {
        await storeMock.create(42);
        await storeMock.create(42, { namespace: 'test' });
        await storeMock.patch(42);
        expect(storeMock.item.isPatched).toBe(true);
        expect(storeMock.namespaces.test.item.isPatched).toBe(true);
      });
    });
  });

  describe('.remove()', () => {
    beforeEach(() => {
      storeMock.create(42);
    });

    it('should remove an item', async () => {
      await storeMock.remove(42);
      expect(storeMock.items.find((i) => i.id === 42)).toBe(undefined);
    });

    it('should be pending while processing', async () => {
      expect(storeMock.isRemovePending).toBe(false);
      const promise = storeMock.remove(42);
      expect(storeMock.isRemovePending).toBe(true);
      await promise;
      expect(storeMock.isRemovePending).toBe(false);
    });

    describe("(namespace's features)", () => {
      it('should remove items in all namespaces', async () => {
        await storeMock.create(42);
        await storeMock.create(42, { namespace: 'test' });
        await storeMock.remove(42);
        expect(storeMock.item).toBeUndefined();
        expect(storeMock.namespaces.test.item).toBeUndefined();
      });
    });
  });
});
