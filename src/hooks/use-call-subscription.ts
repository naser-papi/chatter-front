import {
  ApolloClient,
  OperationVariables,
  useSubscription,
} from "@apollo/client";
import { DocumentNode } from "graphql/language";
import { useEffect, useState } from "react";
import type { ErrorType } from "@/types/base";

const useCallSubscription = <TData, TVariables extends OperationVariables>(
  query: DocumentNode,
  variables?: TVariables,
  skip = false,
  onData?: ({ client, data }: { client: ApolloClient<any>; data: any }) => void,
) => {
  const {
    data,
    error: gqlError,
    loading,
  } = useSubscription<TData>(query, { variables, skip, onData });
  const [error, setError] = useState<ErrorType>(null);
  useEffect(() => {
    if (gqlError) {
      console.log(gqlError);
      setError(null);
    }
  }, [gqlError]);

  return [data, error, loading] as const;
};

export default useCallSubscription;
