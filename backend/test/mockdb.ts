


import { mock } from "bun:test";


const mockChain = {
  where: mock(() => mockChain),
  orderBy: mock(() => mockChain),
  limit: mock(() => mockChain),
  offset: mock(() => mockChain),
 
  then: (onfulfilled: any) => Promise.resolve([]).then(onfulfilled),
  catch: (onrejected: any) => Promise.resolve([]).catch(onrejected),
};

/**
 * 2. THE MAIN DB MOCK
 */
export const mockDb = {
  select: mock(() => ({
    from: mock(() => mockChain),
  })),
  insert: mock(() => ({
    values: mock(() => ({
      returning: mock(() => Promise.resolve([{ id: 1 }])),
    })),
  })),
  update: mock(() => ({
    set: mock(() => ({
      where: mock(() => ({
        returning: mock(() => Promise.resolve([{ id: 1 }])),
      })),
    })),
  })),
  delete: mock(() => ({
    where: mock(() => ({
      returning: mock(() => Promise.resolve([{ id: 1 }])),
    })),
  })),
  // Handle raw SQL if you use sql`` queries
  execute: mock(() => Promise.resolve({ rows: [] })),
};

/**
 * 3. THE MODULE INTERCEPTION
 * This tells Bun to swap the real DB file for this mock version.
 */
mock.module("../../src/db", () => ({
  db: mockDb,
}));

