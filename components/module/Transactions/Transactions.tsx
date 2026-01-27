import { NoData, TransactionCard } from "@/components/ui";
import { useGetInfinitTransactions } from "@/hooks";
import { Box, Button } from "@mui/material";
import LoadeingErrorHandler from "../WaitHandler/LoadeingErrorHandler";
import TransactionSkeletonList from "../SkeletonGenerator/TransactionSkeletonList";
import { transactionCursorConfig } from "@/lib/constant";
const Transactions = () => {
  const {
    transactions,
    loadMore,
    emprtArrayReason,
    isFiltering,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfinitTransactions();
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        display={"grid"}
        gap={"20px"}
        gridTemplateColumns={{
          xs: "repeat(1,1fr)",
          _1350: "repeat(2,1fr)",
        }}
      >
        <LoadeingErrorHandler
          // * Render Skeleton ================= >
          isLoading={{
            check: isFiltering,
            loading: <TransactionSkeletonList count={4} />,
          }}
        >
          {transactions.map((trs) => {
            return <TransactionCard key={trs._id} {...trs} />;
          })}
        </LoadeingErrorHandler>
        {/* // * Skeleton For Load more state =============== >  */}
        {isFetchingNextPage && (
          <TransactionSkeletonList
            count={transactionCursorConfig.loadMoreLimit}
          />
        )}
      </Box>
      {/* // * Lazy Fetch Button ==================== > */}
      <Box display={"flex"} justifyContent={"center"} mt={"20px"}>
        {!isFetchingNextPage && hasNextPage && (
          <Button variant="outlined" onClick={loadMore} size="medium">
            {"نمایش بیشتر"}
          </Button>
        )}
      </Box>

      {/* // * Empty Array ================ > */}
      {!isFiltering && !!!transactions?.length && (
        <NoData center>
          <NoData.Text>{emprtArrayReason}</NoData.Text>
          <NoData.Link href="/my-panel/transactions/add">
            <NoData.Button>{"ایجاد تراکنش"}</NoData.Button>
          </NoData.Link>
        </NoData>
      )}
    </Box>
  );
};

export default Transactions;
