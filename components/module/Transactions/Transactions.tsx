import { MuiButton, NoTransactions, TransactionCard } from "@/components/ui";
import { useGetInfinitTransactions } from "@/hooks";
import { Box } from "@mui/material";
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
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
            xl: "repeat(4,1fr)",
          },
          gap: "20px",
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
        <MuiButton
            reset
          buttonProps={{
              variant: "outlined",
              onClick: loadMore,
            sx: {
                borderRadius: "14px",
                p: "8px 12px",
            },
          }}
        >
            {"نمایش بیشتر"}
        </MuiButton>
        )}
      </Box>
    </Box>
  );
};

export default Transactions;
