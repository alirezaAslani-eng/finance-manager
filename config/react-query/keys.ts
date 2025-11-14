const keys = {
  userInfo: {
    all: ["user-info"],
  },
  recntTransactions: {
    all: ["recent-transactions"],
  },
  allTransactions: {
    all: ["all-transactions"],
    filtered: ["filtered-transactions"],
  },
} as const;

export default keys;
