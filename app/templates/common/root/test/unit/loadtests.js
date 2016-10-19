require('core-js/fn/object/assign');
require('../../src/app.js');
require('angular-mocks');


//加载所有测试文件
requireAll(require.context(".", true, /test\.js/));
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

