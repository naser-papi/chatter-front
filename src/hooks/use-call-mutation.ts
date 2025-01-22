import { DocumentNode } from "graphql/language";
import { useNavigate } from "react-router-dom";
import { MutationHookOptions, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import type { ErrorType } from "@/types/base";
import { getApolloErrorList, getApolloErrorStatusCode } from "@/helpers/utils";
import { apolloClient } from "@/constants";

const useCallMutation = <TData, TVar>(
  query: DocumentNode,
  options?: MutationHookOptions<TData, TVar>,
) => {
  const [callMutation, { data, error: gqlError, loading }] = useMutation<
    TData,
    TVar
  >(query, options);
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

  return [callMutation, data, error, loading] as const;
};

export default useCallMutation;
