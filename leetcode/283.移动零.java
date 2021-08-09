/*
 * @lc app=leetcode.cn id=283 lang=java
 *
 * [283] 移动零
 */

// @lc code=start
class Solution {
    public void moveZeroes(int[] nums) {
        int j = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0){
               int temp = nums[i];
               nums[i] = nums[j]; 
               nums[j++] = temp;
            }
        }

    }
}
// @lc code=end

