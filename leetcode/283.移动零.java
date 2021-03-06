/*
 * @lc app=leetcode.cn id=283 lang=java
 *
 * [283] 移动零
 */

// @lc code=start
class Solution {
    public void moveZeroes(int[] nums) {
        if (nums == null) {
            return;
        }
        int j = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0){
               int temp = nums[i];
               nums[i] = nums[j]; 
               nums[j++] = temp;
            }
        }

        // if (nums == null) {
        //     return;
        // }
        // int j = 0;
        // for (int i = 0;i < nums.length; i++) {
        //     if (nums[i] != 0) {
        //         if (i>j){
        //             nums[j] = nums[i];
        //             nums[i] = 0;
        //         }
        //         j++;
        //     }
        // }

    }
}
// @lc code=end

