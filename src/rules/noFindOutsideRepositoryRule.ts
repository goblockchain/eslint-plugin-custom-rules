/*
 * goAssets - API
 * Copyright (C) 2024 goBlockchain
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of goBlockchain.
 * You shall not disclose such confidential information and shall use it only in
 * accordance with the terms of the license agreement you entered into with goBlockchain.
 *
 * Unauthorized copying of this file, via any medium, is strictly prohibited.
 * Licensed under the goBlockchain license agreement.
 */

import { TSESLint, TSESTree } from "@typescript-eslint/utils";

type MessageIds = "noFindOutsideRepository";

const noFindOutsideRepositoryRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "problem",
    docs: {
      description: "Disallow find functions outside repository layer",
      recommended: "recommended",
    },
    messages: {
      noFindOutsideRepository:
        'Functions starting with "find" are only allowed in repository layer',
    },
    schema: [],
  },
  create(context) {
    const checkFindFunction = (
      node:
        | TSESTree.FunctionDeclaration
        | TSESTree.FunctionExpression
        | TSESTree.ArrowFunctionExpression
    ): void => {
      const filePath = context.filename;
      const functionName = extractFunctionName(node);

      if (!functionName?.startsWith("find")) {
        return;
      }

      if (
        !filePath.includes("repository") &&
        (filePath.includes("service") || filePath.includes("controller"))
      ) {
        context.report({
          node,
          messageId: "noFindOutsideRepository",
        });
      }
    };

    return {
      FunctionDeclaration: (node: TSESTree.FunctionDeclaration): void => {
        checkFindFunction(node);
      },
      ArrowFunctionExpression: (
        node: TSESTree.ArrowFunctionExpression
      ): void => {
        checkFindFunction(node);
      },
      FunctionExpression: (node: TSESTree.FunctionExpression): void => {
        checkFindFunction(node);
      },
    };
  },
};

const extractFunctionName = (
  node:
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression
    | TSESTree.ArrowFunctionExpression
): string | undefined => {
  if (node.type === "FunctionDeclaration") {
    return node.id?.name;
  }

  if (!node.parent) {
    return undefined;
  }

  if (node.parent.type === "VariableDeclarator") {
    return (node.parent.id as TSESTree.Identifier)?.name;
  }

  if (node.parent.type === "MethodDefinition") {
    return (node.parent.key as TSESTree.Identifier)?.name;
  }

  return undefined;
};

export default noFindOutsideRepositoryRule;
