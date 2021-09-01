/*
 * @lc app=leetcode.cn id=26 lang=java
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
class Solution {
    public int removeDuplicates(int[] nums) {
        int len = nums.length;
        int slow = 0;
        int fast = 1;
        if (nums == null || len == 0) return 0;
        while (fast < len ) {
            if (nums[slow] != nums[fast]) {
                nums[slow+1] = nums[fast];
                slow++;
            }
            fast++;
        }       
        return slow+1;
    }
}
// @lc code=end

