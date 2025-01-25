import { OperationVariables, useSubscription } from "@apollo/client";
import { DocumentNode } from "graphql/language";
import { useEffect, useState } from "react";
import type { ErrorType } from "@/types/base";

const useCallSubscription = <TData, TVariables extends OperationVariables>(
  query: DocumentNode,
  variables?: TVariables,
  skip = false,
) => {
  const {
    data,
    error: gqlError,
    loading,
  } = useSubscription<TData>(query, { variables, skip });
  const [error, setError] = useState<ErrorType>(null);
  useEffect(() => {
    if (gqlError) {
      console.log(gqlError);
    }
  }, [gqlError]);

  return [data, error, loading] as const;
};

export default useCallSubscription;
