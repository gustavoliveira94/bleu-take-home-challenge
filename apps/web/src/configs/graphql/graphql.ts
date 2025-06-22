import { GraphQLClient } from 'graphql-request';

import { constants } from '@/core/utils/constants';

export const graphQLClient = new GraphQLClient(constants.GRAPHQL_URL);
