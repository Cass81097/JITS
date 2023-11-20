/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
  // là các hàm đơn giản được thực thi trước các action trong controllers. Chúng giống như các middleware trong Express.js và thường được sử dụng để xử lý xác thực, phân quyền, và các loại kiểm soát truy cập khác trước khi một action cụ thể được thực thi.
  // By default, require requests to come from a logged-in user
  // (runs the policy in api/policies/isLoggedIn.js)
  // '*': true,

  // Only allow admin users to delete other users
  // (runs the policy in api/policies/isAdmin.js)
  // 'delete': 'isAdmin',

  // Allow anyone to access the login action, even if they're not logged in.
  // 'login': true,
  // '*': 'isAuthenticated',

}
