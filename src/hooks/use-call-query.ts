import { OperationVariables, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DocumentNode } from "graphql/language";
import { useEffect, useState } from "react";
import type { ErrorType } from "@/types/base";
import { getApolloErrorList, getApolloErrorStatusCode } from "@/helpers/utils";
import { apolloClient } from "@/constants";

const useCallQuery = <TData, TVariables extends OperationVariables>(
  query: DocumentNode,
  variables?: TVariables,
  skip = false,
) => {
  const {
    data,
    error: gqlError,
    loading,
  } = useQuery<TData>(query, { variables, skip });
  const [error, setError] = useState<ErrorType>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (gqlError) {
      const statusCode = getApolloErrorStatusCode(gqlError);
      if (statusCode == 401) {
        console.log("unauthorized error");
        apolloClient.resetStore();
        navigate("/login");
      }
      const errors = getApolloErrorList(gqlError);
      setError({ statusCode: 401, message: errors });
    }
  }, [gqlError]);

  return [data, error, loading] as const;
};

export default useCallQuery;
