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

import noFindOutsideRepositoryRule from './rules/noFindOutsideRepositoryRule';

export const rules = {
  'no-find-outside-repository': noFindOutsideRepositoryRule,
};

export default {
  rules,
};
