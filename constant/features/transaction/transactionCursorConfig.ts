const transactionCursorConfig = {
  /**
   * initial limit fetch transactions
   */
  initialLimit: 20,
  /**
   * Fetch more transaction limit
   */
  loadMoreLimit: 10,
} as const;

export default transactionCursorConfig;
