import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DocumentNode } from "graphql/language";
import { useEffect, useState } from "react";
import type { ErrorType } from "@/types/base.ts";
import {
  getApolloErrorList,
  getApolloErrorStatusCode,
} from "@/helpers/utils.ts";
import { apolloClient } from "@/constants";

const useCallQuery = <TData>(query: DocumentNode) => {
  const { data, error: gqlError, loading } = useQuery<TData>(query);
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
